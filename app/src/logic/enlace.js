import { ORDEN_EJES } from './calculo.js';

const CLAVE = [23, 91, 44, 7, 68, 12, 85, 39, 51, 3, 77, 29];

function sumaDeControl(bytes) {
  return bytes.reduce((suma, b, i) => (suma + b * (i + 7)) % 251, 0);
}

function aBase64Url(bytes) {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function deBase64Url(texto) {
  const normal = texto.replace(/-/g, '+').replace(/_/g, '/');
  return [...atob(normal)].map((c) => c.charCodeAt(0));
}

export function codificar(posiciones) {
  const bytes = ORDEN_EJES.map((eje, i) => Math.round(posiciones[eje]) ^ CLAVE[i]);
  return aBase64Url([...bytes, sumaDeControl(bytes)]);
}

export function decodificar(texto) {
  if (!texto || !/^[A-Za-z0-9_-]+$/.test(texto)) return null;
  let bytes;
  try {
    bytes = deBase64Url(texto);
  } catch {
    return null;
  }
  if (bytes.length !== ORDEN_EJES.length + 1 || aBase64Url(bytes) !== texto) return null;
  const datos = bytes.slice(0, -1);
  if (sumaDeControl(datos) !== bytes[bytes.length - 1]) return null;
  const valores = datos.map((b, i) => b ^ CLAVE[i]);
  if (valores.some((v) => v < 0 || v > 100)) return null;
  return Object.fromEntries(ORDEN_EJES.map((eje, i) => [eje, valores[i]]));
}
