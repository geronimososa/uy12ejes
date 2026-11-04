import { ORDEN_EJES } from './calculo.js';

export function codificar(posiciones) {
  return ORDEN_EJES.map((eje) => Math.round(posiciones[eje])).join('-');
}

export function decodificar(texto) {
  if (!texto) return null;
  const numeros = texto.split('-').map(Number);
  const validos = numeros.length === ORDEN_EJES.length && numeros.every((n) => Number.isFinite(n) && n >= 0 && n <= 100);
  if (!validos) return null;
  return Object.fromEntries(ORDEN_EJES.map((eje, i) => [eje, numeros[i]]));
}
