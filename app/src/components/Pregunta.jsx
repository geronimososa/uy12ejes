import { RESPUESTAS } from '../logic/calculo.js';

const ESCALA = RESPUESTAS.filter((r) => r.valor !== null);
const NO_SE = RESPUESTAS.find((r) => r.valor === null);
const TONO = { 1: 'tono-1', 0.75: 'tono-2', 0.5: 'tono-3', 0.25: 'tono-4', 0: 'tono-5' };

export default function Pregunta({ afirmacion, numero, total, elegida, onResponder, onVolver }) {
  return (
    <section className="tarjeta tarjeta-pregunta">
      <Progreso numero={numero} total={total} etiqueta="Afirmación" />
      {afirmacion.tipo === 'uruguaya' ? <span className="chip-tema">Tema uruguayo</span> : null}
      <h2 className="afirmacion">{afirmacion.texto}</h2>
      {afirmacion.ayuda ? (
        <details className="ayuda" key={afirmacion.id}>
          <summary>¿De qué se trata?</summary>
          <p>{afirmacion.ayuda}</p>
        </details>
      ) : null}
      <div className="respuestas">
        {ESCALA.map((r) => (
          <button
            type="button"
            key={r.texto}
            className={`respuesta ${TONO[r.valor]}${elegida === r.valor ? ' elegida' : ''}`}
            onClick={() => onResponder(r.valor)}
          >
            <span className="respuesta-marca" aria-hidden="true" />
            {r.texto}
          </button>
        ))}
      </div>
      <div className="pie-tarjeta">
        <button type="button" className="volver" onClick={onVolver}>← Volver</button>
        <button
          type="button"
          className={`nose${elegida === null ? ' elegida' : ''}`}
          onClick={() => onResponder(NO_SE.valor)}
        >
          {NO_SE.texto}
        </button>
      </div>
    </section>
  );
}

export function Progreso({ numero, total, etiqueta }) {
  return (
    <div className="progreso">
      <div className="progreso-texto">{etiqueta} {numero} de {total}</div>
      <div className="progreso-barra">
        <div style={{ width: `${(100 * (numero - 1)) / total}%` }} />
      </div>
    </div>
  );
}
