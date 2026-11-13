import { ORDEN_EJES } from './calculo.js';

export const VERSION_ENLACE = 1;

const CLAVE = [23, 91, 44, 7, 68, 12, 85, 39, 51, 3, 77, 29];
const CLAVE_VERSION = 90;

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
  const ejes = ORDEN_EJES.map((eje, i) => Math.round(posiciones[eje]) ^ CLAVE[i]);
  const bytes = [VERSION_ENLACE ^ CLAVE_VERSION, ...ejes];
  return aBase64Url([...bytes, sumaDeControl(bytes)]);
}

function aPosiciones(ejes) {
  const valores = ejes.map((b, i) => b ^ CLAVE[i]);
  if (valores.some((v) => v < 0 || v > 100)) return null;
  return Object.fromEntries(ORDEN_EJES.map((eje, i) => [eje, valores[i]]));
}

export function leerEnlace(texto) {
  const invalido = { estado: 'invalido', posiciones: null };
  if (!texto || !/^[A-Za-z0-9_-]+$/.test(texto)) return invalido;
  let bytes;
  try {
    bytes = deBase64Url(texto);
  } catch {
    return invalido;
  }
  if (aBase64Url(bytes) !== texto) return invalido;
  const datos = bytes.slice(0, -1);
  if (sumaDeControl(datos) !== bytes[bytes.length - 1]) return invalido;

  let version;
  let ejes;
  if (bytes.length === ORDEN_EJES.length + 1) {
    version = 1;
    ejes = datos;
  } else if (bytes.length === ORDEN_EJES.length + 2) {
    version = datos[0] ^ CLAVE_VERSION;
    ejes = datos.slice(1);
  } else {
    return invalido;
  }
  if (version !== VERSION_ENLACE) return { estado: 'version', posiciones: null, version };
  const posiciones = aPosiciones(ejes);
  return posiciones ? { estado: 'ok', posiciones, version } : invalido;
}

export function decodificar(texto) {
  return leerEnlace(texto).posiciones;
}
