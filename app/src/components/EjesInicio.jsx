import { useState } from 'react';
import ejes from '../data/ejes.json';

function FilaEje({ eje, numero }) {
  const [abierto, setAbierto] = useState(false);
  const idAyuda = `ayuda-${eje.id}`;

  return (
    <li className="fila-eje">
      <div className="fila-eje-cabeza">
        <span className="fila-eje-numero">{String(numero).padStart(2, '0')}</span>
        <h3>{eje.nombre}</h3>
        <button
          type="button"
          className={`ayuda-redonda${abierto ? ' abierta' : ''}`}
          aria-expanded={abierto}
          aria-controls={idAyuda}
          aria-label={`Qué mide ${eje.nombre}`}
          onClick={() => setAbierto((prev) => !prev)}
        >
          ?
        </button>
      </div>
      <div className="fila-eje-cuerpo">
        <div className="polo-caja polo-caja-a">
          <strong>{eje.poloA}</strong>
          <span>{eje.adjA}</span>
        </div>
        <div className="fila-eje-pista" aria-hidden="true">
          <span className="pista-a" />
          <span className="pista-centro" />
          <span className="pista-b" />
        </div>
        <div className="polo-caja polo-caja-b">
          <strong>{eje.poloB}</strong>
          <span>{eje.adjB}</span>
        </div>
      </div>
      {abierto ? (
        <div className="fila-eje-ayuda" id={idAyuda}>
          <p>{eje.descripcion}</p>
          <dl>
            <div>
              <dt className="polo-a">{eje.poloA}</dt>
              <dd>{eje.explicacionA}</dd>
            </div>
            <div>
              <dt className="polo-b">{eje.poloB}</dt>
              <dd>{eje.explicacionB}</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </li>
  );
}

export default function EjesInicio() {
  return (
    <div className="panel-ejes">
      <ol className="filas-ejes">
        {ejes.map((eje, i) => <FilaEje key={eje.id} eje={eje} numero={i + 1} />)}
      </ol>
    </div>
  );
}
