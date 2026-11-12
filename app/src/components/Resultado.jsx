import { useRef, useState } from 'react';
import ejes from '../data/ejes.json';
import perfiles from '../data/perfiles.json';
import { AFINIDAD_HISTORICA_MINIMA, figuraHistorica, rankear } from '../logic/calculo.js';
import { centroUruguayo, etiqueta, lecturaUruguaya, posicionCompas } from '../logic/compas.js';
import { codificar } from '../logic/enlace.js';
import { ventana } from '../logic/overton.js';
import BarraEje from './BarraEje.jsx';
import Compas from './Compas.jsx';
import TarjetaResultado from './TarjetaResultado.jsx';
import CompartirImagen from './CompartirImagen.jsx';
import Foto from './Foto.jsx';

const partidos = perfiles.filter((p) => p.tipo === 'partido');
const referentes = perfiles.filter((p) => p.tipo === 'referente');
const ideologias = perfiles.filter((p) => p.tipo === 'ideologia');
const legisladores = perfiles.filter((p) => p.legislador);
const porId = Object.fromEntries(perfiles.map((p) => [p.id, p]));
const nombreEje = Object.fromEntries(ejes.map((e) => [e.id, e.nombre]));

function Afinidad({ fila }) {
  return (
    <li className="afinidad">
      <div className="afinidad-cabeza">
        {fila.perfil.tipo !== 'ideologia' ? <Foto perfil={fila.perfil} tamano={40} /> : null}
        <strong>{fila.perfil.nombre}</strong>
        <span>{fila.porcentaje} %</span>
      </div>
      <div className="afinidad-barra"><div style={{ width: `${fila.porcentaje}%` }} /></div>
      <p>{fila.perfil.descripcion}</p>
      <p className="detalle">
        Coinciden en {fila.coinciden.map((e) => nombreEje[e]).join(' y ')}; difieren en {fila.difieren.map((e) => nombreEje[e]).join(' y ')}.
        {fila.ejesComparados < 12 ? ` Perfil histórico: comparado en ${fila.ejesComparados} de 12 ejes.` : ''}
      </p>
    </li>
  );
}

export default function Resultado({ posiciones, onReiniciar, compartido = false }) {
  const [copiado, setCopiado] = useState('');
  const tarjetaRef = useRef(null);
  const yo = posicionCompas(posiciones);
  const centro = centroUruguayo(partidos);
  const rankingPartidos = rankear(posiciones, partidos);
  const rankingReferentes = rankear(posiciones, referentes);
  const rankingIdeologias = rankear(posiciones, ideologias);
  const menosAfin = rankingReferentes[rankingReferentes.length - 1];
  const historica = figuraHistorica(rankingReferentes);

  async function copiar() {
    const enlace = `${window.location.origin}/r/${codificar(posiciones)}`;
    try {
      await navigator.clipboard.writeText(enlace);
      setCopiado('Enlace copiado.');
    } catch {
      setCopiado(enlace);
    }
  }

  return (
    <section className="resultado">
      <p className="sobretitulo">{compartido ? "Resultado compartido" : "Tu resultado"}</p>
      <h1>{etiqueta(posiciones, ejes)}</h1>
      <p className="bajada">
        Respecto al centro político uruguayo, estás <strong>{lecturaUruguaya(yo, centro)}</strong>.
      </p>

      <div className="resultado-destacado">
        <div className="destacado-tarjeta">
          <div ref={tarjetaRef} className="tarjeta-captura">
            <TarjetaResultado
              etiqueta={etiqueta(posiciones, ejes)}
              referentes={rankingReferentes.slice(0, 4)}
              partidos={rankingPartidos.slice(0, 3)}
              ideologia={rankingIdeologias[0]}
              historica={historica}
              posiciones={posiciones}
            />
          </div>
          <CompartirImagen objetivo={tarjetaRef} />
        </div>
        <div className="destacado-compas">
          <h2>Compás</h2>
          <Compas usuario={yo} partidos={partidos} centro={centro} />
        </div>
      </div>

      <h2>Tus 12 ejes</h2>
      <div className="leyenda">
        <span><i className="l-mayoritario" /> Mayoritario</span>
        <span><i className="l-aceptable" /> Aceptable</span>
        <span><i className="l-radical" /> Radical</span>
        <span><i className="l-impensable" /> Impensable hoy</span>
        <span><i className="l-vigente" /> Política vigente</span>
        <span><i className="l-usuario" /> Vos</span>
      </div>
      {ejes.map((eje) => (
        <BarraEje
          key={eje.id}
          eje={eje}
          posicion={posiciones[eje.id]}
          ventana={ventana(eje, partidos, legisladores)}
          referentes={eje.referentes.map((id) => ({ id, nombre: porId[id].nombre, valor: porId[id].vector[eje.id] })).filter((r) => r.valor !== null)}
        />
      ))}

      <h2>Partidos</h2>
      <ol className="lista">{rankingPartidos.map((fila) => <Afinidad key={fila.perfil.id} fila={fila} />)}</ol>

      <h2>Referentes más afines</h2>
      <ol className="lista">{rankingReferentes.slice(0, 5).map((fila) => <Afinidad key={fila.perfil.id} fila={fila} />)}</ol>
      <h3>Figura histórica más afín</h3>
      {historica ? (
        <ol className="lista"><Afinidad fila={historica} /></ol>
      ) : (
        <p className="nota">Ninguna figura histórica llega al {AFINIDAD_HISTORICA_MINIMA} % de afinidad con tus respuestas.</p>
      )}
      <h3>El menos afín</h3>
      <ol className="lista"><Afinidad fila={menosAfin} /></ol>

      <h2>Ideologías más afines</h2>
      <ol className="lista">{rankingIdeologias.slice(0, 3).map((fila) => <Afinidad key={fila.perfil.id} fila={fila} />)}</ol>

      <div className="acciones">
        <button type="button" className="principal" onClick={copiar}>Copiar enlace al resultado</button>
        <button type="button" onClick={onReiniciar}>{compartido ? "Hacer mi propio test" : "Hacer el test de nuevo"}</button>
      </div>
      {copiado ? <p className="nota copiado">{copiado}</p> : null}

      <h2>Nota metodológica</h2>
      <p className="nota">
        uy12ejes es una herramienta para explorar ideas, no un instrumento científico. Un porcentaje alto de afinidad significa que tus respuestas se parecen a un perfil, no que pertenezcas a un partido o debas votarlo. Las ubicaciones de partidos y referentes son <strong>estimaciones</strong> basadas en votos, leyes y declaraciones públicas, todavía en revisión.
      </p>
    </section>
  );
}
