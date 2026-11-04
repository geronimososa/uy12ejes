import fs from 'node:fs';
import { centroUruguayo, etiqueta, posicionCompas, region } from '../src/logic/compas.js';
import { ventana } from '../src/logic/overton.js';

const leer = (r) => JSON.parse(fs.readFileSync(new URL(r, import.meta.url), 'utf8'));
const perfiles = leer('../src/data/perfiles.json');
const ejes = leer('../src/data/ejes.json');
const partidos = perfiles.filter((p) => p.tipo === 'partido');
const legisladores = perfiles.filter((p) => p.legislador);

partidos.forEach((p) => {
  const c = posicionCompas(p.vector);
  console.log(`${p.id.padEnd(22)} X ${c.x.toFixed(1).padStart(5)} Y ${c.y.toFixed(1).padStart(5)}  ${region(c).padEnd(22)} ${etiqueta(p.vector, ejes)}`);
});
const centro = centroUruguayo(partidos);
console.log(`centro uruguayo          X ${centro.x.toFixed(1)} Y ${centro.y.toFixed(1)}`);
ejes.forEach((e) => {
  const v = ventana(e, partidos, legisladores);
  console.log(`${e.id.padEnd(15)} vigente ${String(v.vigente).padStart(3)}  mayoritario ${v.mayoritario.join('-').padEnd(7)} aceptable ${v.aceptable.join('-').padEnd(7)} radical ${v.radical.join('-')}`);
});
