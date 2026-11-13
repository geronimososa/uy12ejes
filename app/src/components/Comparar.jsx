import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ejes from '../data/ejes.json';
import perfiles from '../data/perfiles.json';
import { afinidad, tieneDato } from '../logic/calculo.js';
import { centroUruguayo, etiqueta, posicionCompas } from '../logic/compas.js';
import Compas from './Compas.jsx';
import Ejes12 from './Ejes12.jsx';
import Foto from './Foto.jsx';

const partidos = perfiles.filter((p) => p.tipo === 'partido');
const centro = centroUruguayo(partidos);
const porId = Object.fromEntries(perfiles.map((p) => [p.id, p]));
const nombreEje = Object.fromEntries(ejes.map((e) => [e.id, e.nombre]));
const GRUPOS = [
  { tipo: 'partido', nombre: 'Partidos' },
  { tipo: 'referente', nombre: 'Personalidades' },
  { tipo: 'ideologia', nombre: 'Ideologías' },
];
const TITULO_BASE = 'uy12ejes · Test político uruguayo de 12 ejes';
const ordenados = [...perfiles].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

function Selector({ etiquetaTexto, valor, onCambiar }) {
  return (
    <label>
      {etiquetaTexto}
      <select value={valor ?? ''} onChange={(e) => onCambiar(e.target.value)}>
        <option value="">Elegí un perfil</option>
        {GRUPOS.map((g) => (
          <optgroup key={g.tipo} label={g.nombre}>
            {ordenados.filter((p) => p.tipo === g.tipo).map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </optgroup>
        ))}
      </select>
    </label>
  );
}

function Cabeza({ perfil, clase }) {
  return (
    <div className="comparar-cabeza">
      {perfil.tipo !== 'ideologia' ? <Foto perfil={perfil} tamano={48} diferida={false} /> : null}
      <div>
        <Link className="enlace-perfil" to={`/perfil/${perfil.id}`}><i className={clase} />{perfil.nombre}</Link>
        <span className="tarjeta-region">{etiqueta(perfil.vector, ejes)}</span>
      </div>
    </div>
  );
}

export default function Comparar() {
  const { a, b } = useParams();
  const navigate = useNavigate();
  const perfilA = a ? porId[a] : null;
  const perfilB = b ? porId[b] : null;

  useEffect(() => {
    document.title = perfilA && perfilB ? `${perfilA.nombre} vs. ${perfilB.nombre} · uy12ejes` : 'Comparar perfiles · uy12ejes';
    return () => {
      document.title = TITULO_BASE;
    };
  }, [perfilA, perfilB]);

  function elegir(nuevoA, nuevoB) {
    const partes = [nuevoA, nuevoB].filter(Boolean);
    navigate(`/comparar${partes.length ? `/${partes.join('/')}` : ''}`, { replace: true });
  }

  const comparacion = perfilA && perfilB ? afinidad(perfilA.vector, perfilB.vector) : null;
  const valor = (perfil, eje) => (tieneDato(perfil.vector[eje.id]) ? Math.round(perfil.vector[eje.id]) : '–');

  return (
    <section className="resultado perfil">
      <p className="sobretitulo">Comparar</p>
      <h1>Dos perfiles, eje por eje</h1>
      <p className="bajada">Elegí dos partidos, personalidades o ideologías para ver en qué se parecen y en qué no.</p>
      <div className="selectores">
        <Selector etiquetaTexto="Primer perfil" valor={perfilA?.id} onCambiar={(id) => elegir(id, perfilB?.id)} />
        <Selector etiquetaTexto="Segundo perfil" valor={perfilB?.id} onCambiar={(id) => elegir(perfilA?.id, id)} />
      </div>
      {(a && !perfilA) || (b && !perfilB) ? <p className="nota">Alguno de los perfiles de la dirección no existe. Elegilo de la lista.</p> : null}

      {comparacion ? (
        <>
          <div className="comparar-perfiles">
            <Cabeza perfil={perfilA} clase="lp-principal" />
            <Cabeza perfil={perfilB} clase="lp-otro" />
          </div>
          <div className="perfil-comparar">
            <div className="afinidad-cabeza"><span>Afinidad entre ambos</span><strong>{comparacion.porcentaje} %</strong></div>
            <div className="afinidad-barra"><div style={{ width: `${comparacion.porcentaje}%` }} /></div>
            <p className="nota">
              Coinciden en {comparacion.coinciden.map((e) => nombreEje[e]).join(' y ')}; difieren en {comparacion.difieren.map((e) => nombreEje[e]).join(' y ')}.
              {comparacion.ejesComparados < 12 ? ` Comparados en ${comparacion.ejesComparados} de 12 ejes.` : ''}
            </p>
          </div>

          <h2>Los 12 ejes</h2>
          <p className="leyenda-puntos"><span><i className="lp-principal" />{perfilA.nombre}</span><span><i className="lp-otro" />{perfilB.nombre}</span></p>
          <Ejes12 vector={perfilA.vector} otro={perfilB.vector} texto={(eje) => `${valor(perfilA, eje)} · ${valor(perfilB, eje)}`} />

          <h2>Compás</h2>
          <Compas
            usuario={posicionCompas(perfilA.vector)}
            partidos={partidos}
            centro={centro}
            rotulo={perfilA.nombre}
            otro={{ punto: posicionCompas(perfilB.vector), rotulo: perfilB.nombre }}
          />
        </>
      ) : null}

      <div className="acciones">
        <button type="button" className="principal" onClick={() => navigate('/test')}>Hacer el test</button>
        <button type="button" onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    </section>
  );
}
