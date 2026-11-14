import { ImageResponse } from '@vercel/og';
import { leerEnlace } from '../src/logic/enlace.js';
import { resumenCompartido } from '../src/logic/compartir.js';

export const config = { runtime: 'edge' };

function h(type, style, ...children) {
  return { type, props: { style: { display: 'flex', ...style }, children: children.length === 1 ? children[0] : children } };
}

const fila = { display: 'flex', alignItems: 'center' };
const mini = { fontSize: 24, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: '#a7b1bf' };

function cabeza(texto) {
  return h('div', { ...fila, gap: 24 },
    h('div', { display: 'flex', fontSize: 44, fontWeight: 800 },
      h('span', { color: '#6ea8ea' }, 'uy'),
      h('span', { color: '#f5c518' }, '12'),
      h('span', {}, 'ejes'),
    ),
    h('div', { flex: 1, height: 2, background: '#4a5668' }),
    h('div', mini, texto),
  );
}

function tarjetaResultado({ etiqueta, referente, porcentaje, color }) {
  return [
    cabeza('Mi resultado'),
    h('div', { display: 'flex', flexDirection: 'column', marginTop: 48 },
      h('div', mini, 'Me salió'),
      h('div', { fontSize: etiqueta.length > 28 ? 64 : 76, fontWeight: 800, lineHeight: 1.1, marginTop: 8 }, etiqueta),
    ),
    h('div', { ...fila, gap: 40, marginTop: 'auto', padding: '32px 40px', borderRadius: 32, border: '2px solid #344052', backgroundImage: `linear-gradient(160deg, ${color}, #2a3442 75%)` },
      h('div', { fontSize: 112, fontWeight: 800, lineHeight: 1, color: '#fff' }, `${porcentaje}%`),
      h('div', { display: 'flex', flexDirection: 'column', gap: 8 },
        h('div', mini, 'Referente más afín'),
        h('div', { fontSize: 48, fontWeight: 800, lineHeight: 1.15 }, referente),
      ),
    ),
    h('div', { ...fila, justifyContent: 'space-between', marginTop: 28, fontSize: 28, color: '#a7b1bf' },
      h('span', {}, '¿Y vos? Hacé el test'),
      h('span', { color: '#f5c518', fontWeight: 700 }, 'uy12ejes.vercel.app'),
    ),
  ];
}

function tarjetaGeneral() {
  return [
    cabeza('Test político'),
    h('div', { display: 'flex', flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto', gap: 24 },
      h('div', { fontSize: 72, fontWeight: 800, lineHeight: 1.1 }, 'Test político uruguayo de 12 ejes'),
      h('div', { fontSize: 36, color: '#a7b1bf', lineHeight: 1.3 }, '¿Realmente conocés tu ideología política? Descubrí qué partido y qué referente piensan más parecido a vos.'),
    ),
    h('div', { ...fila, justifyContent: 'flex-end', fontSize: 28, color: '#f5c518', fontWeight: 700 }, 'uy12ejes.vercel.app'),
  ];
}

export default function handler(request) {
  const codigo = new URL(request.url).searchParams.get('c');
  const { estado, posiciones } = leerEnlace(codigo);
  const contenido = estado === 'ok' ? tarjetaResultado(resumenCompartido(posiciones)) : tarjetaGeneral();
  const raiz = h('div', { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 64, background: '#1f2733', color: '#f2f4f7' }, ...contenido);
  return new ImageResponse(raiz, {
    width: 1200,
    height: 630,
    headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
  });
}
