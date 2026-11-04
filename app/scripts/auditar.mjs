import fs from 'node:fs';
import { ORDEN_EJES, calcularPosiciones } from '../src/logic/calculo.js';

const [, , archivoAuditoria, modo] = process.argv;
if (!archivoAuditoria) {
  console.error('Uso: node scripts/auditar.mjs auditoria/partidos.json [--guardar]');
  process.exit(1);
}

const leer = (ruta) => JSON.parse(fs.readFileSync(new URL(ruta, import.meta.url), 'utf8'));
const afirmaciones = leer('../src/data/afirmaciones.json');
const dilemas = leer('../src/data/dilemas.json');
const rutaPerfiles = new URL('../src/data/perfiles.json', import.meta.url);
const perfiles = JSON.parse(fs.readFileSync(rutaPerfiles, 'utf8'));
const auditoria = JSON.parse(fs.readFileSync(archivoAuditoria, 'utf8'));

const VALOR = { A: 1, a: 0.75, 0: 0.5, d: 0.25, D: 0, '?': null };
const SUFIJOS = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'u1', 'u2', 'u3', 'u4'];
const PREFIJO = Object.fromEntries(afirmaciones.map((a) => [a.eje, a.id.slice(0, 3)]));

const errores = [];
const resultados = Object.entries(auditoria.perfiles).map(([id, datos]) => {
  const respuestas = {};
  ORDEN_EJES.forEach((eje) => {
    const codigos = datos.respuestas[eje] ?? '';
    if (codigos.length !== 10 || [...codigos].some((c) => !(c in VALOR))) {
      errores.push(`${id} · ${eje}: "${codigos}" debe tener 10 códigos válidos`);
      return;
    }
    [...codigos].forEach((c, i) => { respuestas[`${PREFIJO[eje]}_${SUFIJOS[i]}`] = VALOR[c]; });
  });
  const elecciones = {};
  dilemas.forEach((d) => {
    const elegida = datos.dilemas?.[d.id] ?? '?';
    if (elegida === '?') return;
    if (!d.opciones.some((o) => o.id === elegida)) errores.push(`${id} · dilema ${d.id}: opción inválida`);
    elecciones[d.id] = elegida;
  });
  const vector = calcularPosiciones(afirmaciones, respuestas, dilemas, elecciones, { vacioComoNulo: true });
  return { id, vector: Object.fromEntries(ORDEN_EJES.map((e) => [e, vector[e] === null ? null : Math.round(vector[e])])) };
});

if (errores.length) {
  console.error(errores.join('\n'));
  process.exit(1);
}

const abrev = (e) => e.slice(0, 4);
console.log(['perfil'.padEnd(24), ...ORDEN_EJES.map(abrev)].join(' '));
resultados.forEach(({ id, vector }) => {
  const anterior = perfiles.find((p) => p.id === id)?.vector ?? {};
  console.log([`${id} (antes)`.padEnd(24), ...ORDEN_EJES.map((e) => String(anterior[e] ?? '-').padStart(4))].join(' '));
  console.log([`${id} (ahora)`.padEnd(24), ...ORDEN_EJES.map((e) => String(vector[e] ?? '-').padStart(4))].join(' '));
});

if (modo === '--guardar') {
  resultados.forEach(({ id, vector }) => {
    const perfil = perfiles.find((p) => p.id === id);
    if (!perfil) return;
    perfil.vector = vector;
    perfil.estado = 'auditado-borrador';
  });
  fs.writeFileSync(rutaPerfiles, JSON.stringify(perfiles, null, 2) + '\n');
  console.log(`\nGuardado en src/data/perfiles.json (${resultados.length} perfiles, estado auditado-borrador).`);
}
