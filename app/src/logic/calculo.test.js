import { describe, expect, it } from 'vitest';
import afirmaciones from '../data/afirmaciones.json';
import dilemas from '../data/dilemas.json';
import ejes from '../data/ejes.json';
import perfiles from '../data/perfiles.json';
import { ORDEN_EJES, afinidad, calcularPosiciones, intensidad, rankear } from './calculo.js';
import { centroUruguayo, etiqueta, posicionCompas, region } from './compas.js';
import { VERSION_ENLACE, codificar, decodificar, leerEnlace } from './enlace.js';
import { ventana, zona } from './overton.js';

const partidos = perfiles.filter((p) => p.tipo === 'partido');

describe('datos', () => {
  it('tiene 120 afirmaciones, 10 por eje y 5 hacia cada polo', () => {
    expect(afirmaciones).toHaveLength(120);
    ORDEN_EJES.forEach((eje) => {
      const delEje = afirmaciones.filter((a) => a.eje === eje);
      expect(delEje).toHaveLength(10);
      expect(delEje.filter((a) => a.polo === 'A')).toHaveLength(5);
      expect(delEje.filter((a) => a.rapido)).toHaveLength(4);
    });
  });

  it('cada perfil tiene sus ejes entre 0 y 100, o vacíos si no tenía posición', () => {
    perfiles.forEach((p) => {
      ORDEN_EJES.forEach((eje) => {
        const v = p.vector[eje];
        if (v === null) return;
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(100);
      });
      expect(ORDEN_EJES.filter((eje) => p.vector[eje] !== null).length).toBeGreaterThanOrEqual(10);
    });
  });

  it('los partidos y los referentes actuales tienen datos en los 12 ejes', () => {
    perfiles.filter((p) => p.tipo === 'partido' || p.legislador).forEach((p) => {
      ORDEN_EJES.forEach((eje) => expect(p.vector[eje]).not.toBeNull());
    });
  });

  it('los referentes de cada eje existen y los dilemas usan ejes válidos', () => {
    const ids = new Set(perfiles.map((p) => p.id));
    ejes.forEach((eje) => eje.referentes.forEach((id) => expect(ids.has(id)).toBe(true)));
    dilemas.forEach((d) => d.opciones.forEach((o) => Object.keys(o.efectos).forEach((eje) => expect(ORDEN_EJES).toContain(eje))));
  });
});

describe('cálculo', () => {
  it('estar muy de acuerdo con todo deja cada eje en el centro', () => {
    const respuestas = Object.fromEntries(afirmaciones.map((a) => [a.id, 1]));
    const posiciones = calcularPosiciones(afirmaciones, respuestas, dilemas, {});
    ORDEN_EJES.forEach((eje) => expect(posiciones[eje]).toBe(50));
  });

  it('acordar solo con el polo B lleva al polo B (las extremas rechazadas cuentan como neutral)', () => {
    const respuestas = Object.fromEntries(afirmaciones.map((a) => [a.id, a.polo === 'B' ? 1 : 0]));
    const posiciones = calcularPosiciones(afirmaciones, respuestas, dilemas, {});
    ORDEN_EJES.forEach((eje) => expect(posiciones[eje]).toBeGreaterThanOrEqual(90));
  });

  it('un dilema cuenta como una respuesta más', () => {
    const una = afirmaciones.find((a) => a.eje === 'representacion' && a.polo === 'B');
    const posiciones = calcularPosiciones([una], { [una.id]: 1 }, dilemas, { memoria: 'A' });
    expect(posiciones.representacion).toBe((100 + 5) / 2);
  });

  it('la intensidad sigue los umbrales del diseño', () => {
    expect(intensidad(55)).toBe('Centro');
    expect(intensidad(70)).toBe('Inclinado');
    expect(intensidad(20)).toBe('Marcado');
    expect(intensidad(5)).toBe('Muy marcado');
  });

  it('la afinidad es 100 con uno mismo y 0 con el opuesto total', () => {
    const fa = partidos[0].vector;
    expect(afinidad(fa, fa).porcentaje).toBe(100);
    const ceros = Object.fromEntries(ORDEN_EJES.map((e) => [e, 0]));
    const cienes = Object.fromEntries(ORDEN_EJES.map((e) => [e, 100]));
    expect(afinidad(ceros, cienes).porcentaje).toBe(0);
  });

  it('rankear pone primero al propio perfil', () => {
    const pc = partidos.find((p) => p.id === 'partido-colorado');
    expect(rankear(pc.vector, partidos)[0].perfil.id).toBe('partido-colorado');
  });
});

describe('compás y Overton', () => {
  it('los partidos auditados quedan ordenados de izquierda a derecha en la economía', () => {
    const x = (id) => posicionCompas(partidos.find((p) => p.id === id).vector).x;
    expect(x('frente-amplio')).toBeLessThan(x('identidad-soberana'));
    expect(x('identidad-soberana')).toBeLessThan(x('cabildo-abierto'));
    expect(x('cabildo-abierto')).toBeLessThan(x('partido-independiente'));
    expect(x('partido-independiente')).toBeLessThan(x('partido-colorado'));
    expect(region(posicionCompas(partidos.find((p) => p.id === 'partido-independiente').vector))).toBe('Centro');
    expect(region(posicionCompas(partidos.find((p) => p.id === 'cabildo-abierto').vector))).toBe('Centro');
  });

  it('las etiquetas suman el rasgo más marcado', () => {
    const etiquetaDe = (id) => etiqueta(perfiles.find((p) => p.id === id).vector, ejes);
    expect(etiquetaDe('cabildo-abierto')).toBe('Centro conservador');
    expect(etiquetaDe('dastugue')).toBe('Derecha conservadora');
    expect(etiquetaDe('lacalle-herrera')).toBe('Derecha conservadora');
    expect(etiquetaDe('partido-colorado')).toBe('Centroderecha aperturista');
  });

  it('las zonas extremas de la economía tienen nombres descriptivos', () => {
    expect(region({ x: 88, y: 40 })).toBe('Derecha liberal');
    expect(region({ x: 82, y: 40 })).toBe('Derecha');
    expect(region({ x: 18, y: 40 })).toBe('Izquierda');
    expect(region({ x: 10, y: 40 })).toBe('Izquierda socialista');
  });

  it('el centro uruguayo se calcula ponderando por bancas', () => {
    const centro = centroUruguayo(partidos);
    expect(Math.round(centro.x)).toBe(46);
    expect(Math.round(centro.y)).toBe(25);
  });

  it('las zonas se ordenan de mayoritario a impensable', () => {
    const economia = ejes.find((e) => e.id === 'economia');
    const v = ventana(economia, partidos);
    expect(v.mayoritario[0]).toBeGreaterThanOrEqual(v.aceptable[0]);
    expect(v.aceptable[0]).toBeGreaterThanOrEqual(v.radical[0]);
    expect(zona(45, v)).toBe('mayoritario');
  });

  it('un legislador fuera del rango de los partidos amplía la zona aceptable', () => {
    const religion = ejes.find((e) => e.id === 'religion');
    const sinLegisladores = ventana(religion, partidos);
    const extremo = { vector: { religion: sinLegisladores.aceptable[1] + 5 } };
    expect(ventana(religion, partidos, [extremo]).aceptable[1]).toBe(sinLegisladores.aceptable[1] + 5);
  });
});

describe('eje Religión con escalones', () => {
  const delEje = afirmaciones.filter((a) => a.eje === 'religion');
  const puntuar = (elegir) => calcularPosiciones(delEje, Object.fromEntries(delEje.map((a) => [a.id, elegir(a)])), [], {}).religion;

  it('laicidad abierta (acuerdo con lo moderado, rechazo a lo extremo) queda entre 60 y 75', () => {
    const posicion = puntuar((a) => {
      if (a.polo === 'B') return a.escalon === 'extremo' ? 0 : 1;
      return a.escalon === 'moderado' ? 0.5 : 0.25;
    });
    expect(posicion).toBeGreaterThanOrEqual(60);
    expect(posicion).toBeLessThanOrEqual(75);
  });

  it('aceptar las afirmaciones extremas sube el puntaje; rechazarlas no lo baja', () => {
    const base = (a) => (a.polo === 'B' ? (a.escalon === 'extremo' ? 0.5 : 1) : 0.25);
    const conExtremas = puntuar((a) => (a.escalon === 'extremo' ? 1 : base(a)));
    const rechazandoExtremas = puntuar((a) => (a.escalon === 'extremo' ? 0 : base(a)));
    expect(conExtremas).toBeGreaterThan(puntuar(base));
    expect(rechazandoExtremas).toBe(puntuar(base));
  });
});

describe('enlace', () => {
  it('codifica y decodifica los 12 números', () => {
    const vector = partidos[1].vector;
    expect(decodificar(codificar(vector))).toEqual(vector);
    expect(decodificar('1-2-3')).toBeNull();
    expect(decodificar('a-b')).toBeNull();
  });
});

describe('ajustes de calibración', () => {
  it('"No sé" no cuenta para el puntaje', () => {
    const delEje = afirmaciones.filter((a) => a.eje === 'representacion');
    const todasNoSe = Object.fromEntries(delEje.map((a) => [a.id, null]));
    expect(calcularPosiciones(delEje, todasNoSe, [], {}).representacion).toBe(50);
    const unaSola = { ...todasNoSe, [delEje[0].id]: delEje[0].polo === 'A' ? 1 : 0 };
    expect(calcularPosiciones(delEje, unaSola, [], {}).representacion).toBe(0);
  });

  it('el adjetivo no repite lo que ya dice la región', () => {
    const libertario = perfiles.find((p) => p.id === 'libertarismo').vector;
    expect(etiqueta(libertario, ejes)).not.toMatch(/libertari[oa] libertari/i);
  });

  it('los ejes con riesgo de saturación tienen una afirmación extrema de cada lado que la necesita', () => {
    const extremas = afirmaciones.filter((a) => a.escalon === 'extremo').map((a) => `${a.eje}:${a.polo}`);
    ['diplomacia:B', 'control:A', 'economia:A', 'comercio:B', 'moral:A', 'moral:B', 'inmigracion:B', 'tecnologia:B', 'religion:B', 'poder:A']
      .forEach((par) => expect(extremas).toContain(par));
    expect(afirmaciones.filter((a) => a.escalon === 'extremo' && a.rapido)).toHaveLength(0);
  });
});

describe('calibración uruguaya del compás', () => {
  it('las franjas son simétricas alrededor de 50', () => {
    expect(region({ x: 43, y: 30 })).toBe('Centro');
    expect(region({ x: 57, y: 30 })).toBe('Centro');
    expect(region({ x: 41, y: 30 })).toBe('Centroizquierda');
    expect(region({ x: 59, y: 30 })).toBe('Centroderecha');
    expect(region({ x: 29, y: 30 })).toBe('Izquierda');
    expect(region({ x: 71, y: 30 })).toBe('Derecha');
  });

  it('PN y PC quedan en la centroderecha, el FA en la izquierda y el PI y Cabildo en el centro', () => {
    const regionDe = (id) => region(posicionCompas(partidos.find((p) => p.id === id).vector));
    expect(regionDe('partido-nacional')).toBe('Centroderecha');
    expect(regionDe('partido-colorado')).toBe('Centroderecha');
    expect(regionDe('frente-amplio')).toBe('Izquierda');
    expect(regionDe('partido-independiente')).toBe('Centro');
    expect(regionDe('cabildo-abierto')).toBe('Centro');
  });

  it('las afirmaciones sobre el golpe y los juicios pesan la mitad', () => {
    const pesadas = afirmaciones.filter((a) => a.peso === 0.5).map((a) => a.id).sort();
    expect(pesadas).toEqual(['rep_u1', 'rep_u2']);
  });
});

describe('auditoría', () => {
  it('todos los perfiles (partidos, referentes e ideologías) están auditados', () => {
    perfiles.forEach((p) => expect(p.estado).toBe('auditado-borrador'));
  });
});

describe('ejes sin datos', () => {
  const lleno = Object.fromEntries(ORDEN_EJES.map((e) => [e, 50]));

  it('un eje vacío no cuenta para la afinidad', () => {
    const usuario = { ...lleno, moral: 0 };
    const conVacio = { ...lleno, moral: null };
    const resultado = afinidad(usuario, conVacio);
    expect(resultado.ejesComparados).toBe(11);
    expect(resultado.porcentaje).toBe(100);
    expect(resultado.difieren).not.toContain('moral');
  });

  it('con menos de 8 ejes comparados la afinidad se reduce en proporción', () => {
    const pocos = Object.fromEntries(ORDEN_EJES.map((e, i) => [e, i < 4 ? 50 : null]));
    expect(afinidad(lleno, pocos).porcentaje).toBe(50);
  });

  it('el votante del PCU ya no tiene al wilsonismo como ideología más afín', () => {
    const pcu = { estructura: 61, representacion: 10, poder: 56, inmigracion: 68, diplomacia: 68, intervencion: 35, economia: 8, control: 15, comercio: 30, religion: 8, moral: 12, tecnologia: 42 };
    const primera = rankear(pcu, perfiles.filter((p) => p.tipo === 'ideologia'))[0];
    expect(primera.perfil.id).not.toBe('wilsonismo');
  });

  it('el compás y la etiqueta funcionan con ejes vacíos', () => {
    const artigas = perfiles.find((p) => p.id === 'artigas').vector;
    expect(Number.isFinite(posicionCompas(artigas).x)).toBe(true);
    expect(etiqueta(artigas, ejes)).not.toMatch(/undefined|null|NaN/);
  });
});

describe('enlace opaco', () => {
  it('no muestra los números y detecta un código modificado', () => {
    const vector = { estructura: 64, representacion: 59, poder: 47, inmigracion: 50, diplomacia: 50, intervencion: 59, economia: 38, control: 42, comercio: 63, religion: 48, moral: 37, tecnologia: 60 };
    const codigo = codificar(vector);
    expect(codigo).not.toMatch(/64|59|47/);
    expect(decodificar(codigo)).toEqual(vector);
    const alterado = (codigo[0] === 'A' ? 'B' : 'A') + codigo.slice(1);
    expect(decodificar(alterado)).toBeNull();
  });

  it('el enlace lleva la versión y los enlaces viejos sin versión se siguen leyendo', () => {
    const vector = { estructura: 50, representacion: 10, poder: 60, inmigracion: 40, diplomacia: 70, intervencion: 30, economia: 20, control: 80, comercio: 55, religion: 15, moral: 35, tecnologia: 65 };
    const nuevo = leerEnlace(codificar(vector));
    expect(nuevo.estado).toBe('ok');
    expect(nuevo.version).toBe(VERSION_ENLACE);
    expect(leerEnlace('JXM3IXZPDRx4NWc1fA').estado).toBe('ok');
    expect(leerEnlace('no-es-un-enlace').estado).toBe('invalido');
  });
});
