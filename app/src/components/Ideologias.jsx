import { Link } from 'react-router-dom';
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

function TarjetaIdeologia({ perfil, color }) {
  return (
    <li className="tarjeta-ideologia" style={{ '--espectro': color }}>
      <h4><Link className="enlace-perfil" to={`/perfil/${perfil.id}`}>{perfil.nombre}</Link></h4>
      <p>{perfil.descripcion}</p>
      <div className="tarjeta-ideologia-pie">
        <Indicadores vector={perfil.vector} />
        <Link className="ver-perfil" to={`/perfil/${perfil.id}`}>
          Ver perfil <span aria-hidden="true">→</span>
        </Link>
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
