export default function Formato({ onEmpezar, onVolver, enCurso, onContinuar }) {
  return (
    <section className="tarjeta formato-pantalla">
      <p className="sobretitulo">Elegí el formato</p>
      <h2 className="afirmacion">¿Cuánto tiempo tenés?</h2>
      {enCurso ? (
        <button type="button" className="continuar" onClick={onContinuar}>
          <strong>Continuar el test que empezaste</strong>
          <span>Vas por la pregunta {enCurso.actual} de {enCurso.total}</span>
        </button>
      ) : null}
      <div className="formatos">
        <button type="button" className="formato" onClick={() => onEmpezar(true)}>
          <strong>Rápido</strong>
          <span>48 afirmaciones · unos 6 minutos</span>
        </button>
        <button type="button" className="formato" onClick={() => onEmpezar(false)}>
          <strong>Completo</strong>
          <span>120 afirmaciones · unos 15 minutos · más preciso</span>
        </button>
      </div>
      <p className="nota">
        Al final hay 8 dilemas de opción múltiple.{enCurso ? ' Si elegís un formato, el test que empezaste se descarta.' : ''}
      </p>
      <button type="button" className="volver" onClick={onVolver}>Volver al inicio</button>
    </section>
  );
}
