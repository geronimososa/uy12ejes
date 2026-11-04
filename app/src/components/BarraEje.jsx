import { intensidad } from '../logic/calculo.js';
import { TEXTO_ZONA, zona } from '../logic/overton.js';

const ANCHO = 600;
const X = (valor) => 10 + (valor / 100) * (ANCHO - 20);

export default function BarraEje({ eje, posicion, ventana, referentes }) {
  const z = zona(posicion, ventana);
  const nivel = intensidad(posicion);
  const polo = posicion < 50 ? eje.poloA : eje.poloB;
  const media = eje.lecturaMedia;
  const enMedia = media && posicion >= media.desde && posicion <= media.hasta;
  const lecturaBase = nivel === 'Centro' ? 'Centro' : `${nivel} hacia ${polo}`;
  const lectura = enMedia ? media.texto : lecturaBase;
  const ordenados = [...referentes].sort((a, b) => a.valor - b.valor);
  const rect = ([desde, hasta], clase) => (
    <rect className={clase} x={X(desde)} y={22} width={Math.max(2, X(hasta) - X(desde))} height={16} rx={3} />
  );

  return (
    <article className="eje">
      <header className="eje-cabeza">
        <h3>{eje.nombre}</h3>
        <span className="eje-lectura">{lectura} · {Math.round(posicion)}</span>
      </header>
      <div className="eje-polos">
        <span>{eje.poloA}</span>
        <span>{eje.poloB}</span>
      </div>
      <svg viewBox={`0 0 ${ANCHO} 70`} className="eje-svg" role="img" aria-label={`${eje.nombre}: ${lectura}`}>
        <rect className="z-impensable" x={X(0)} y={22} width={X(100) - X(0)} height={16} rx={3} />
        {rect(ventana.radical, 'z-radical')}
        {rect(ventana.aceptable, 'z-aceptable')}
        {rect(ventana.mayoritario, 'z-mayoritario')}
        {ordenados.map((r) => (
          <line key={r.id} className="ref-marca" x1={X(r.valor)} x2={X(r.valor)} y1={14} y2={46} />
        ))}
        <path className="vigente" d={`M ${X(ventana.vigente)} 46 l -6 10 h 12 z`} />
        <circle className="usuario" cx={X(posicion)} cy={30} r={9} />
      </svg>
      <p className="eje-zona">{TEXTO_ZONA[z]}</p>
      <p className="eje-referentes">
        {ordenados.map((r) => `${r.nombre} (${Math.round(r.valor)})`).join(' · ')}
      </p>
    </article>
  );
}
