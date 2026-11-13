import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ejes from '../data/ejes.json';
import perfiles from '../data/perfiles.json';
import afirmaciones from '../data/afirmaciones.json';
import { AFINIDAD_HISTORICA_MINIMA, RESPUESTAS, figuraHistorica, rankear, valorHaciaB } from '../logic/calculo.js';
import { centroUruguayo, etiqueta, lecturaUruguaya, posicionCompas } from '../logic/compas.js';
import { codificar } from '../logic/enlace.js';
import { ventana } from '../logic/overton.js';
import BarraEje from './BarraEje.jsx';
import Compas from './Compas.jsx';
import TarjetaResultado from './TarjetaResultado.jsx';
import { AVISO_ACTUALIZACION } from '../data/actualizacion.js';
import CompartirImagen from './CompartirImagen.jsx';
import Foto from './Foto.jsx';

const partidos = perfiles.filter((p) => p.tipo === 'partido');
const referentes = perfiles.filter((p) => p.tipo === 'referente');
const ideologias = perfiles.filter((p) => p.tipo === 'ideologia');
const legisladores = perfiles.filter((p) => p.legislador);
const porId = Object.fromEntries(perfiles.map((p) => [p.id, p]));
const nombreEje = Object.fromEntries(ejes.map((e) => [e.id, e.nombre]));
const textoRespuesta = Object.fromEntries(RESPUESTAS.filter((r) => r.valor !== null).map((r) => [r.valor, r.texto]));

function motivosDe(eje, posicion, respuestas) {
  const lado = posicion < 50 ? -1 : 1;
  return afirmaciones
    .filter((a) => a.eje === eje && respuestas[a.id] !== undefined && respuestas[a.id] !== null)
    .map((a) => ({
      id: a.id,
      texto: a.texto,
      respuesta: textoRespuesta[respuestas[a.id]],
      empuje: lado * (a.peso ?? 1) * (valorHaciaB(a, respuestas[a.id]) - 50),
    }))
    .filter((m) => m.empuje > 0)
    .sort((a, b) => b.empuje - a.empuje)
    .slice(0, 3);
}

function Afinidad({ fila }) {
  return (
    <li className="afinidad">
      <div className="afinidad-cabeza">
        {fila.perfil.tipo !== 'ideologia' ? <Foto perfil={fila.perfil} tamano={40} /> : null}
        <Link className="enlace-perfil" to={`/perfil/${fila.perfil.id}`}>{fila.perfil.nombre}</Link>
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

export default function Resultado({ posiciones, respuestas = null, faltantes = 0, onContinuar, onReiniciar, compartido = false }) {
  const [copiado, setCopiado] = useState('');
  const tarjetaRef = useRef(null);
  const yo = posicionCompas(posiciones);
  const centro = centroUruguayo(partidos);
  const rankingPartidos = rankear(posiciones, partidos);
  const rankingReferentes = rankear(posiciones, referentes);
  const rankingIdeologias = rankear(posiciones, ideologias);
  const menosAfin = rankingReferentes[rankingReferentes.length - 1];
  const historica = figuraHistorica(rankingReferentes);

  const enlace = `${window.location.origin}/r/${codificar(posiciones)}`;
  const mejor = rankingReferentes[0];
  const textoCompartir = `Me salió ${etiqueta(posiciones, ejes)} en uy12ejes y me parezco ${mejor.porcentaje} % a ${mejor.perfil.nombre}. ¿Y vos? ${enlace}`;
  const textoCodificado = encodeURIComponent(textoCompartir);

  async function copiar() {
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
      {!compartido && faltantes > 0 ? (
        <div className="aviso-rapido">
          <p>Hiciste la versión rápida: tu resultado puede moverse algunos puntos. Para más precisión, respondé las {faltantes} afirmaciones que faltan; las que ya contestaste se mantienen.</p>
          <button type="button" className="boton boton-amarillo" onClick={onContinuar}>Seguir con las {faltantes} que faltan</button>
        </div>
      ) : null}

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
          <div className="compartir-imagen compartir-enlaces">
            <button type="button" className="boton boton-secundario" onClick={copiar}>Copiar enlace</button>
            {!compartido ? (
              <>
                <a className="boton boton-secundario" href={`https://wa.me/?text=${textoCodificado}`} target="_blank" rel="noopener noreferrer">Enviar por WhatsApp</a>
                <a className="boton boton-secundario" href={`https://twitter.com/intent/tweet?text=${textoCodificado}`} target="_blank" rel="noopener noreferrer">Publicar en X</a>
              </>
            ) : null}
            {copiado ? <p className="nota copiado" role="status">{copiado}</p> : null}
          </div>
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
          motivos={respuestas && !compartido ? motivosDe(eje.id, posiciones[eje.id], respuestas) : null}
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
        <button type="button" className="principal" onClick={onReiniciar}>{compartido ? "Hacer mi propio test" : "Hacer el test de nuevo"}</button>
      </div>

      <h2>Nota metodológica</h2>
      <p className="nota">
        uy12ejes es una herramienta para explorar ideas, no un instrumento científico. Un porcentaje alto de afinidad significa que tus respuestas se parecen a un perfil, no que pertenezcas a un partido o debas votarlo. Las ubicaciones de partidos y referentes son <strong>estimaciones</strong> basadas en votos, leyes y declaraciones públicas, todavía en revisión. {AVISO_ACTUALIZACION}
      </p>
    </section>
  );
}
