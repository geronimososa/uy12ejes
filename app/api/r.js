import { leerEnlace } from '../src/logic/enlace.js';
import { resumenCompartido } from '../src/logic/compartir.js';

export const config = { runtime: 'edge' };

function escapar(texto) {
  return texto.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function cambiarMeta(html, clave, valor) {
  return html.replace(new RegExp(`(<meta (?:property|name)="${clave}" content=")[^"]*(")`), `$1${escapar(valor)}$2`);
}

export function conMetaDelResultado(html, codigo, origen) {
  const { estado, posiciones } = leerEnlace(codigo);
  if (estado !== 'ok') return html;
  const { etiqueta, referente, porcentaje } = resumenCompartido(posiciones);
  const titulo = `Me salió ${etiqueta} en uy12ejes`;
  const descripcion = `Me parezco ${porcentaje} % a ${referente}. ¿Y vos? Hacé el test político uruguayo de 12 ejes.`;
  const cambios = {
    'og:url': `${origen}/r/${codigo}`,
    'og:title': titulo,
    'og:description': descripcion,
    'og:image': `${origen}/api/og?c=${codigo}`,
    'og:image:alt': `${titulo}. ${descripcion}`,
  };
  const conMeta = Object.entries(cambios).reduce((texto, [clave, valor]) => cambiarMeta(texto, clave, valor), html);
  return conMeta.replace(/<title>[^<]*<\/title>/, `<title>${escapar(titulo)}</title>`);
}

export default async function handler(request) {
  const url = new URL(request.url);
  const codigo = url.searchParams.get('codigo') ?? url.pathname.split('/').pop();
  const base = await fetch(new URL('/index.html', url.origin)).then((respuesta) => respuesta.text());
  return new Response(conMetaDelResultado(base, codigo, url.origin), {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=0, s-maxage=3600' },
  });
}
