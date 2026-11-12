import { posicionCompas } from '../logic/compas.js';
import { ACTUALIZACION } from '../data/actualizacion.js';

const SIGLAS = {
  'frente-amplio': 'FA',
  'partido-nacional': 'PN',
  'partido-colorado': 'PC',
  'cabildo-abierto': 'CA',
  'identidad-soberana': 'IS',
  'partido-independiente': 'PI',
};
const MAYORITARIOS = ['frente-amplio', 'partido-nacional', 'partido-colorado'];

function envolvente(puntos) {
  const p = [...puntos].sort((a, b) => a.x - b.x || a.y - b.y);
  const cruz = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const abajo = [];
  p.forEach((punto) => {
    while (abajo.length >= 2 && cruz(abajo[abajo.length - 2], abajo[abajo.length - 1], punto) <= 0) abajo.pop();
    abajo.push(punto);
  });
  const arriba = [];
  [...p].reverse().forEach((punto) => {
    while (arriba.length >= 2 && cruz(arriba[arriba.length - 2], arriba[arriba.length - 1], punto) <= 0) arriba.pop();
    arriba.push(punto);
  });
  return [...abajo.slice(0, -1), ...arriba.slice(0, -1)];
}

const aSvg = ({ x, y }) => ({ x, y: 100 - y });
const trazo = (puntos) => puntos.map((pt) => `${pt.x},${pt.y}`).join(' ');

export default function Compas({ usuario, partidos, centro }) {
  const puntos = partidos.map((p) => ({ id: p.id, ...aSvg(posicionCompas(p.vector)) }));
  const ventana = envolvente(puntos);
  const mayoritario = puntos.filter((pt) => MAYORITARIOS.includes(pt.id));
  const yo = aSvg(usuario);
  const c = aSvg(centro);

  return (
    <div className="compas">
      <div className="compas-explicacion">
        <p><strong>Cómo leerlo.</strong> De izquierda a derecha, la economía: más Estado o más mercado. De abajo hacia arriba, el poder: más libertades y garantías, o más autoridad y orden.</p>
        <p><strong>La zona sombreada es lo que hoy se discute en serio en Uruguay.</strong> Es el espacio que ocupan los partidos con bancas en el Parlamento. Lo más oscuro es donde se mueven el FA, el PN y el PC. Si tu punto cae afuera, tus ideas existen, pero hoy ningún partido con bancas las defiende así. Datos ajustados a {ACTUALIZACION}.</p>
        <ul className="compas-leyenda">
          <li><i className="cl-usuario" /> Vos</li>
          <li><i className="cl-partido" /> Partidos</li>
          <li><span className="cl-cruz">+</span> Centro uruguayo (promedio de los partidos según sus bancas)</li>
        </ul>
      </div>
      <svg viewBox="-12 -8 124 120" className="compas-svg" role="img" aria-label="Compás político uruguayo">
        <rect className="c-cuadro" x={0} y={0} width={100} height={100} />
        <rect className="c-aut-izq" x={0} y={0} width={50} height={50} />
        <rect className="c-aut-der" x={50} y={0} width={50} height={50} />
        <rect className="c-lib-izq" x={0} y={50} width={50} height={50} />
        <rect className="c-lib-der" x={50} y={50} width={50} height={50} />
        <line className="c-eje" x1={50} y1={0} x2={50} y2={100} />
        <line className="c-eje" x1={0} y1={50} x2={100} y2={50} />
        <text className="c-rotulo" x={50} y={-2} textAnchor="middle">Autoritario</text>
        <text className="c-rotulo" x={50} y={107} textAnchor="middle">Libertario</text>
        <text className="c-rotulo" x={-2} y={52} textAnchor="end">Izq.</text>
        <text className="c-rotulo" x={102} y={52} textAnchor="start">Der.</text>
        <polygon className="c-ventana" points={trazo(ventana)} />
        <polygon className="c-mayoritario" points={trazo(mayoritario)} />
        {puntos.map((pt) => (
          <g key={pt.id}>
            <circle className="c-partido" cx={pt.x} cy={pt.y} r={1.6} />
            <text className="c-sigla" x={pt.x + 2.2} y={pt.y + 1.2}>{SIGLAS[pt.id]}</text>
          </g>
        ))}
        <path className="c-centro" d={`M ${c.x - 2} ${c.y} h 4 M ${c.x} ${c.y - 2} v 4`} />
        <circle className="c-usuario" cx={yo.x} cy={yo.y} r={2.6} />
      </svg>
    </div>
  );
}
