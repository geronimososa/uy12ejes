import { RESPUESTAS } from '../logic/calculo.js';

export default function Pregunta({ afirmacion, numero, total, elegida, onResponder, onVolver }) {
  return (
    <section className="tarjeta">
      <Progreso numero={numero} total={total} etiqueta="Afirmación" />
      <h2 className="afirmacion">{afirmacion.texto}</h2>
      {afirmacion.ayuda ? (
        <details className="ayuda" key={afirmacion.id}>
          <summary>¿De qué se trata?</summary>
          <p>{afirmacion.ayuda}</p>
        </details>
      ) : null}
      <div className="respuestas">
        {RESPUESTAS.map((r) => (
          <button
            type="button"
            key={r.texto}
            className={`respuesta${r.valor === null ? ' nose' : ''}${elegida === r.valor ? ' elegida' : ''}`}
            onClick={() => onResponder(r.valor)}
          >
            {r.texto}
          </button>
        ))}
      </div>
      <button type="button" className="volver" onClick={onVolver}>Volver</button>
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
