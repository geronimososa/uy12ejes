import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ejes from '../data/ejes.json';
import perfiles from '../data/perfiles.json';
import auditoriaPartidos from '../../auditoria/partidos.json';
import auditoriaReferentes from '../../auditoria/referentes.json';
import auditoriaIdeologias from '../../auditoria/ideologias.json';
import auditoriaLegisladores from '../../auditoria/legisladores.json';
import { afinidad, rankear, tieneDato } from '../logic/calculo.js';
import { centroUruguayo, etiqueta, posicionCompas } from '../logic/compas.js';
import Compas from './Compas.jsx';
import Ejes12 from './Ejes12.jsx';
import Foto from './Foto.jsx';

const partidos = perfiles.filter((p) => p.tipo === 'partido');
const referentes = perfiles.filter((p) => p.tipo === 'referente');
const centro = centroUruguayo(partidos);
const auditoria = {
  ...auditoriaPartidos.perfiles,
  ...auditoriaReferentes.perfiles,
  ...auditoriaIdeologias.perfiles,
  ...auditoriaLegisladores.perfiles,
};
const nombreEje = Object.fromEntries(ejes.map((e) => [e.id, e.nombre]));
const TIPO = { partido: 'Partido', referente: 'Personalidad', ideologia: 'Ideología' };
const TITULO_BASE = 'uy12ejes · Test político uruguayo de 12 ejes';

function Cercano({ fila }) {
  return (
    <li className="afinidad">
      <div className="afinidad-cabeza">
        <Foto perfil={fila.perfil} tamano={40} />
        <Link className="enlace-perfil" to={`/perfil/${fila.perfil.id}`}>{fila.perfil.nombre}</Link>
        <span>{fila.porcentaje} %</span>
      </div>
      <div className="afinidad-barra"><div style={{ width: `${fila.porcentaje}%` }} /></div>
      <p>{fila.perfil.descripcion}</p>
    </li>
  );
}

export default function Perfil({ usuario = null }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const perfil = perfiles.find((p) => p.id === id);

  useEffect(() => {
    document.title = perfil ? `${perfil.nombre}: posición en 12 ejes · uy12ejes` : `Perfil no encontrado · uy12ejes`;
    window.scrollTo(0, 0);
    return () => {
      document.title = TITULO_BASE;
    };
  }, [perfil]);

  if (!perfil) {
    return (
      <section className="tarjeta">
        <h2 className="afirmacion">Perfil no encontrado</h2>
        <p className="nota">No hay ningún partido, personalidad ni ideología con esa dirección.</p>
        <Link className="boton boton-amarillo" to="/">Volver al inicio</Link>
      </section>
    );
  }

  const ubicados = ejes.filter((eje) => tieneDato(perfil.vector[eje.id])).length;
  const cercanosReferentes = rankear(perfil.vector, referentes.filter((p) => p.id !== perfil.id)).slice(0, 3);
  const partidoCercano = rankear(perfil.vector, partidos.filter((p) => p.id !== perfil.id))[0];
  const nota = auditoria[perfil.id]?.nota;
  const conVos = usuario ? afinidad(usuario, perfil.vector) : null;

  return (
    <section className="resultado perfil">
      <p className="sobretitulo">{TIPO[perfil.tipo]}</p>
      <div className="perfil-cabeza">
        {perfil.tipo !== 'ideologia' ? <Foto perfil={perfil} tamano={88} diferida={false} /> : null}
        <div>
          <h1>{perfil.nombre}</h1>
          <span className="tarjeta-region">{etiqueta(perfil.vector, ejes)}</span>
        </div>
      </div>
      <p className="bajada">{perfil.descripcion}</p>
      {perfil.epoca === 'historico' ? (
        <p className="nota">Figura histórica: se ubica por las posiciones de su época, en {ubicados} de 12 ejes. En el resto no tenía posición porque esos temas no se discutían.</p>
      ) : null}

      {conVos ? (
        <div className="perfil-comparar">
          <h2>Vos y {perfil.nombre}</h2>
          <div className="afinidad-cabeza"><span>Afinidad con tu resultado</span><strong>{conVos.porcentaje} %</strong></div>
          <div className="afinidad-barra"><div style={{ width: `${conVos.porcentaje}%` }} /></div>
          <p className="nota">Coinciden en {conVos.coinciden.map((e) => nombreEje[e]).join(' y ')}; difieren en {conVos.difieren.map((e) => nombreEje[e]).join(' y ')}. Abajo, tu punto aparece como un círculo vacío.</p>
        </div>
      ) : null}

      <h2>Sus 12 ejes</h2>
      {usuario ? (
        <p className="leyenda-puntos"><span><i />{perfil.nombre}</span><span><i className="lp-otro" />Vos</span></p>
      ) : null}
      <Ejes12 vector={perfil.vector} otro={usuario} />

      <h2>Compás</h2>
      <Compas usuario={posicionCompas(perfil.vector)} partidos={partidos} centro={centro} rotulo={perfil.nombre} otro={usuario ? { punto: posicionCompas(usuario), rotulo: 'Vos' } : null} />

      <h2>Personalidades más cercanas</h2>
      <ol className="lista">{cercanosReferentes.map((fila) => <Cercano key={fila.perfil.id} fila={fila} />)}</ol>
      <h3>Partido más cercano</h3>
      <ol className="lista"><Cercano fila={partidoCercano} /></ol>

      {nota ? (
        <>
          <h2>De dónde sale esta ubicación</h2>
          <p className="nota">{nota} La ubicación es una estimación en revisión.</p>
        </>
      ) : null}

      <div className="acciones">
        <button type="button" className="principal" onClick={() => navigate('/test')}>Hacer el test</button>
        <button type="button" onClick={() => navigate(`/comparar/${perfil.id}`)}>Comparar con otro perfil</button>
        <button type="button" onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    </section>
  );
}
