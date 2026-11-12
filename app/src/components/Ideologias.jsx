import { useState } from 'react';
import ejes from '../data/ejes.json';
import { agruparPorEspectro, poloDominante } from '../logic/espectros.js';

function Indicadores({ vector }) {
  return (
    <ul className="indicadores" aria-label="Posición en los 12 ejes">
      {ejes.map((eje) => {
        const polo = poloDominante(eje, vector[eje.id]);
        const neutro = polo && Math.abs(vector[eje.id] - 50) < 10;
        const clase = !polo ? 'sin-dato' : neutro ? 'neutro' : `lado-${polo.lado.toLowerCase()}`;
        const texto = !polo ? `${eje.nombre}: sin posición` : neutro ? `${eje.nombre}: centro` : `${eje.nombre}: ${polo.nombre}`;
        return <li key={eje.id} className={`indicador ${clase}`} title={texto}><span className="visualmente-oculto">{texto}</span></li>;
      })}
    </ul>
  );
}

function Perfil12({ vector }) {
  return (
    <ul className="perfil-12">
      {ejes.map((eje) => {
        const valor = vector[eje.id];
        const polo = poloDominante(eje, valor);
        return (
          <li key={eje.id}>
            <span className="perfil-12-nombre">{eje.nombre}</span>
            <span className="perfil-12-barra">
              {polo ? <span className={`perfil-12-punto lado-${polo.lado.toLowerCase()}`} style={{ left: `${valor}%` }} /> : null}
            </span>
            <span className="perfil-12-polo">{polo ? (Math.abs(valor - 50) < 10 ? 'Centro' : polo.nombre) : 'Sin posición'}</span>
          </li>
        );
      })}
    </ul>
  );
}

function TarjetaIdeologia({ perfil, color }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <li className="tarjeta-ideologia" style={{ '--espectro': color }}>
      <h4>{perfil.nombre}</h4>
      <p>{perfil.descripcion}</p>
      {abierta ? <Perfil12 vector={perfil.vector} /> : null}
      <div className="tarjeta-ideologia-pie">
        <Indicadores vector={perfil.vector} />
        <button type="button" className="ver-perfil" aria-expanded={abierta} onClick={() => setAbierta((prev) => !prev)}>
          {abierta ? 'Cerrar' : 'Ver perfil'} <span aria-hidden="true">{abierta ? '↑' : '→'}</span>
        </button>
      </div>
    </li>
  );
}

export default function Ideologias({ ideologias }) {
  const grupos = agruparPorEspectro(ideologias);
  return (
    <>
      <dl className="cifras">
        <div><dt>{ideologias.length}</dt><dd>ideologías</dd></div>
        <div><dt>{grupos.length}</dt><dd>espectros</dd></div>
        <div><dt>12</dt><dd>ejes por perfil</dd></div>
      </dl>
      <p className="sobretitulo-chico">Distribución por espectro</p>
      <ol className="distribucion">
        {grupos.map((g) => (
          <li key={g.id} style={{ flexGrow: g.miembros.length, '--espectro': g.color }}>
            <a href={`#espectro-${g.id.replace(/\s+/g, '-')}`}>
              <span className="distribucion-barra" />
              <strong>{g.id}</strong>
              <span>{g.miembros.length}</span>
            </a>
          </li>
        ))}
      </ol>
      <p className="nota">
        Cada punto de una tarjeta es un eje: <span className="punto-leyenda lado-a" /> polo izquierdo de la tabla de ejes, <span className="punto-leyenda lado-b" /> polo derecho y <span className="punto-leyenda neutro" /> centro.
      </p>
      {grupos.map((g) => (
        <div key={g.id} className="espectro" id={`espectro-${g.id.replace(/\s+/g, '-')}`} style={{ '--espectro': g.color }}>
          <div className="espectro-cabeza">
            <div>
              <h3>{g.id}</h3>
              <p>{g.descripcion}</p>
            </div>
            <span className="espectro-cantidad"><strong>{g.miembros.length}</strong> {g.miembros.length === 1 ? 'ideología' : 'ideologías'}</span>
          </div>
          <ul className="grilla-ideologias">
            {g.miembros.map((p) => <TarjetaIdeologia key={p.id} perfil={p} color={g.color} />)}
          </ul>
        </div>
      ))}
    </>
  );
}
