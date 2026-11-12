import fotos from '../data/fotos.json';

const COLORES = {
  'frente-amplio': '#1f4e9c',
  'partido-nacional': '#3d8fd1',
  'partido-colorado': '#c0392b',
  'cabildo-abierto': '#b8860b',
  'identidad-soberana': '#2e7d6b',
  'partido-independiente': '#6a2c91',
};
const NEUTRO = '#5a6474';
const MENORES = new Set(['de', 'del', 'la', 'las', 'los', 'y', 'e']);

export function iniciales(nombre) {
  const palabras = nombre.replace(/\(.*?\)/g, '').split(/[\s-]+/).filter((p) => p && !MENORES.has(p.toLowerCase()));
  if (palabras.length === 0) return '?';
  const primera = palabras[0][0];
  const ultima = palabras.length > 1 ? palabras[palabras.length - 1][0] : '';
  return (primera + ultima).toUpperCase();
}

function colorDe(perfil) {
  return COLORES[perfil.tipo === 'partido' ? perfil.id : perfil.grupo] ?? NEUTRO;
}

export default function Foto({ perfil, tamano = 48, diferida = true }) {
  const foto = fotos[perfil.id];
  const logo = perfil.tipo === 'partido' || perfil.id === 'mln' || perfil.id === 'fau';
  const clase = `foto${logo ? ' foto-logo' : ''}`;
  if (foto) {
    return (
      <img
        className={clase}
        src={foto.archivo}
        alt=""
        width={tamano}
        height={tamano}
        loading={diferida ? 'lazy' : 'eager'}
        decoding="async"
      />
    );
  }
  return (
    <span
      className={`${clase} foto-iniciales`}
      style={{ width: tamano, height: tamano, fontSize: Math.round(tamano * 0.38), background: colorDe(perfil) }}
      aria-hidden="true"
    >
      {iniciales(perfil.nombre)}
    </span>
  );
}
