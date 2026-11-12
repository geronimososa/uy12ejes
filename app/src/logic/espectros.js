import { posicionCompas, region } from './compas.js';

export const ESPECTROS = [
  { id: 'Izquierda socialista', color: '#a3263a', descripcion: 'Propiedad colectiva o estatal de los medios de producción y planificación de la economía.' },
  { id: 'Izquierda libertaria', color: '#d0602a', descripcion: 'Igualdad económica junto con una defensa fuerte de las libertades individuales y el rechazo al punitivismo.' },
  { id: 'Izquierda', color: '#d64545', descripcion: 'Estado fuerte en la economía, empresas públicas, redistribución y ampliación de derechos.' },
  { id: 'Centroizquierda', color: '#e07a7a', descripcion: 'Economía de mercado con Estado social activo, negociación colectiva y políticas redistributivas moderadas.' },
  { id: 'Centro', color: '#8a93a3', descripcion: 'Equilibrio entre mercado y Estado, reformas graduales y acuerdos entre partidos.' },
  { id: 'Centroderecha', color: '#6ea8ea', descripcion: 'Mercado con responsabilidad fiscal, apertura comercial y un Estado acotado pero presente.' },
  { id: 'Derecha', color: '#3570c4', descripcion: 'Mercado libre, menos impuestos y regulaciones, apertura al mundo y, a menudo, valores tradicionales.' },
  { id: 'Derecha liberal', color: '#4a4fc4', descripcion: 'Mínima intervención del Estado en la economía: privatizaciones, desregulación y libre comercio.' },
  { id: 'Libertarismo', color: '#d4a017', descripcion: 'Estado mínimo en la economía y en la vida privada: libertad de mercado y libertad individual a la vez.' },
  { id: 'Liberalismo de centro', color: '#2a9d8f', descripcion: 'Posiciones económicas moderadas con prioridad a la libertad individual y los controles al poder.' },
  { id: 'Izquierda autoritaria', color: '#7a1626', descripcion: 'Izquierda económica radical que acepta tomar o concentrar el poder por fuera de las reglas democráticas.' },
  { id: 'Autoritarismo de centro', color: '#5d6470', descripcion: 'Orden y autoridad por encima de las garantías, sin una orientación económica marcada.' },
  { id: 'Derecha autoritaria', color: '#6b4aa0', descripcion: 'Orden, jerarquía y concentración del poder, con economía de mercado y valores tradicionales.' },
];

export const espectroDe = (vector) => region(posicionCompas(vector));

export function agruparPorEspectro(perfiles) {
  return ESPECTROS
    .map((espectro) => ({ ...espectro, miembros: perfiles.filter((p) => espectroDe(p.vector) === espectro.id) }))
    .filter((grupo) => grupo.miembros.length > 0);
}

export function poloDominante(eje, valor) {
  if (valor === null || valor === undefined) return null;
  return valor < 50
    ? { lado: 'A', nombre: eje.poloA, porcentaje: Math.round(100 - valor) }
    : { lado: 'B', nombre: eje.poloB, porcentaje: Math.round(valor) };
}
