import fs from 'node:fs';

const [, , origen, destino] = process.argv;
if (!origen || !destino) {
  console.error('Uso: node scripts/preguntas.mjs ../EJES-Y-PREGUNTAS.md src/data/afirmaciones.json');
  process.exit(1);
}

const EJES = { est: 'estructura', rep: 'representacion', pod: 'poder', inm: 'inmigracion', dip: 'diplomacia', int: 'intervencion', eco: 'economia', con: 'control', com: 'comercio', rel: 'religion', mor: 'moral', tec: 'tecnologia' };

function leerContexto(item, contexto) {
  let resto = contexto;
  const peso = resto.match(/^Peso (\d+(?:,\d+)?)\.\s*/);
  if (peso) {
    item.peso = Number(peso[1].replace(',', '.'));
    resto = resto.slice(peso[0].length);
  }
  const escalon = resto.match(/^Escalón (\w+)\.\s*/);
  if (escalon) {
    item.escalon = escalon[1];
    resto = resto.slice(escalon[0].length);
  }
  if (resto && !resto.startsWith('Candidata')) item.ayuda = resto;
}

const filas = fs.readFileSync(origen, 'utf8').split('\n').filter((l) => /^\| [a-z]{3}_[fu]\d /.test(l));
const lista = filas.map((linea) => {
  const [id, tipo, polo, rapido, texto, contexto = ''] = linea.split('|').slice(1, -1).map((x) => x.trim());
  const item = { id, eje: EJES[id.slice(0, 3)], polo, tipo: tipo === 'F' ? 'fundamental' : 'uruguaya', rapido: rapido === 'R', texto };
  leerContexto(item, contexto);
  return item;
});

fs.writeFileSync(destino, JSON.stringify(lista, null, 2) + '\n');
console.log(`${lista.length} afirmaciones (${lista.filter((x) => x.rapido).length} en formato rápido) escritas en ${destino}`);
