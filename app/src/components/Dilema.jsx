import { Progreso } from './Pregunta.jsx';

export default function Dilema({ dilema, numero, total, elegida, onElegir, onVolver }) {
  return (
    <section className="tarjeta tarjeta-pregunta">
      <Progreso numero={numero} total={total} etiqueta={`Dilema: ${dilema.titulo} ·`} />
      <h2 className="afirmacion">{dilema.texto}</h2>
      <div className="respuestas">
        {dilema.opciones.map((o) => (
          <button
            type="button"
            key={o.id}
            className={`respuesta opcion${elegida === o.id ? ' elegida' : ''}`}
            onClick={() => onElegir(o.id)}
          >
            <span className="respuesta-letra" aria-hidden="true">{o.id}</span>
            {o.texto}
          </button>
        ))}
      </div>
      <div className="pie-tarjeta">
        <button type="button" className="volver" onClick={onVolver}>← Volver</button>
      </div>
    </section>
  );
}
