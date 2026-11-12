import { useEffect, useState } from 'react';
import ejes from '../data/ejes.json';
import perfiles from '../data/perfiles.json';
import { rankear } from '../logic/calculo.js';
import { etiqueta } from '../logic/compas.js';
import EjesInicio from './EjesInicio.jsx';
import Ideologias from './Ideologias.jsx';
import TarjetaResultado from './TarjetaResultado.jsx';

const partidos = perfiles.filter((p) => p.tipo === 'partido');
const referentes = perfiles.filter((p) => p.tipo === 'referente');
const ideologias = perfiles.filter((p) => p.tipo === 'ideologia');

const GRUPOS = [
  ...partidos.map((p) => ({ id: p.id, nombre: p.nombre })),
  { id: 'otros-partidos', nombre: 'Otros partidos' },
  { id: 'independientes', nombre: 'Independientes, organizaciones y figuras sin partido' },
];

const EJEMPLOS = ['orsi', 'lacalle-pou'].map((id) => {
  const persona = referentes.find((r) => r.id === id);
  const otros = referentes.filter((r) => r.id !== id);
  const rankingReferentes = rankear(persona.vector, otros);
  return {
    persona,
    referentes: rankingReferentes.slice(0, 4),
    partidos: rankear(persona.vector, partidos).slice(0, 3),
    ideologia: rankear(persona.vector, ideologias)[0],
    historica: rankingReferentes.find((fila) => fila.perfil.epoca === 'historico'),
  };
});

const SEGUNDOS_POR_EJEMPLO = 7;

function Ejemplo() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => setActual((prev) => (prev + 1) % EJEMPLOS.length), SEGUNDOS_POR_EJEMPLO * 1000);
    return () => clearInterval(intervalo);
  }, [actual]);

  return (
    <aside className="ejemplo" aria-label="Ejemplos de resultado">
      <p className="sobretitulo">Ejemplo de resultado</p>
      <div className="ejemplo-carrusel">
        {EJEMPLOS.map((ej, i) => (
          <div key={ej.persona.id} className={`ejemplo-diapositiva${i === actual ? ' visible' : ''}`} aria-hidden={i !== actual}>
            <p className="ejemplo-quien">Si respondieras como <strong>{ej.persona.nombre}</strong></p>
            <TarjetaResultado
              etiqueta={etiqueta(ej.persona.vector, ejes)}
              referentes={ej.referentes}
              partidos={ej.partidos}
              ideologia={ej.ideologia}
              historica={ej.historica}
              posiciones={ej.persona.vector}
              encabezado="Ejemplo"
            />
          </div>
        ))}
      </div>
      <div className="ejemplo-puntos" role="group" aria-label="Elegir ejemplo">
        {EJEMPLOS.map(({ persona }, i) => (
          <button
            key={persona.id}
            type="button"
            className={i === actual ? 'activo' : ''}
            aria-label={`Ver el ejemplo de ${persona.nombre}`}
            onClick={() => setActual(i)}
          />
        ))}
      </div>
    </aside>
  );
}

function Tarjeta({ perfil, extra }) {
  return (
    <li className="tarjeta-perfil">
      <strong>{perfil.nombre}</strong>
      <span className="tarjeta-region">{etiqueta(perfil.vector, ejes)}</span>
      <p>{perfil.descripcion}</p>
      {Object.values(perfil.vector).some((v) => v === null) ? (
        <p className="tarjeta-nota">Ubicado en {Object.values(perfil.vector).filter((v) => v !== null).length} de 12 ejes: en el resto no tenía posición en su época.</p>
      ) : null}
      {extra ? <p className="tarjeta-extra">{extra}</p> : null}
    </li>
  );
}

export default function Inicio({ onComenzar, onNavegar, enCurso, onContinuar }) {
  return (
    <div className="portada">
      <section className="hero" id="arriba">
        <div className="hero-texto">
          <p className="sobretitulo">Test político uruguayo</p>
          <h1>¿Realmente conocés tu <span className="resaltado">ideología política</span>?</h1>
          <p className="bajada">Capaz te estás poniendo la etiqueta equivocada. En pocos minutos descubrí dónde estás en 12 ejes, qué partido piensa más parecido a vos y qué referente uruguayo está más cerca de tus ideas.</p>
          <div className="hero-acciones">
            <button type="button" className="boton boton-amarillo boton-grande" onClick={onComenzar}>
              Descubrir mi perfil <span aria-hidden="true">→</span>
            </button>
            <button type="button" className="boton boton-secundario boton-grande" onClick={() => onNavegar('ejes')}>
              Ver los 12 ejes
            </button>
          </div>
          <ul className="hero-puntos">
            <li>Gratis</li>
            <li>Anónimo</li>
            <li>Rápido</li>
            <li>Resultado al instante</li>
          </ul>
          {enCurso ? (
            <button type="button" className="continuar" onClick={onContinuar}>
              <strong>Continuar el test</strong>
              <span>Vas por la pregunta {enCurso.actual} de {enCurso.total}</span>
            </button>
          ) : null}
        </div>
        <Ejemplo />
      </section>

      <section className="seccion" id="como-funciona">
        <p className="sobretitulo">Cómo funciona</p>
        <h2>Cuatro pasos, sin registro</h2>
        <ol className="pasos">
          <li><strong>Elegís el formato.</strong> Rápido (48 afirmaciones, unos 6 minutos) o completo (120, unos 15 minutos).</li>
          <li><strong>Respondés afirmaciones.</strong> Sobre principios y sobre debates uruguayos concretos: la dictadura, la LUC, las AFAP, la laicidad, el Mercosur. Podés decir "No sé" y no cuenta.</li>
          <li><strong>Resolvés 8 dilemas.</strong> Escenarios uruguayos de opción múltiple que tocan varios ejes a la vez.</li>
          <li><strong>Ves tu resultado.</strong> Tu posición en los 12 ejes, en el compás uruguayo y frente a la ventana de Overton, y los partidos, referentes e ideologías más afines. Podés compartirlo con un link.</li>
        </ol>
        <p className="nota">Tus respuestas no salen de tu navegador. Las ubicaciones de partidos, referentes e ideologías salen de responder el mismo test, a partir de sus votos, programas y declaraciones públicas.</p>
      </section>

      <section className="seccion" id="ejes">
        <p className="sobretitulo">Los 12 ejes</p>
        <h2>Doce preguntas de fondo, medidas por separado</h2>
        <p className="bajada">Cada eje va de un polo al otro. Podés estar en un extremo en uno y en el centro en otro: el test muestra esa combinación en vez de promediarla.</p>
        <p className="nota">Tocá el <span className="ayuda-redonda ayuda-ejemplo" aria-hidden="true">?</span> de cada eje para ver qué mide y qué significa cada polo.</p>
        <EjesInicio />
      </section>

      <section className="seccion" id="ideologias">
        <p className="sobretitulo">Ideologías</p>
        <h2>Ideologías por espectro</h2>
        <p className="bajada">Tradiciones uruguayas y corrientes universales, ubicadas en el compás con las mismas 120 afirmaciones del test.</p>
        <Ideologias ideologias={ideologias} />
      </section>

      <section className="seccion" id="personalidades">
        <p className="sobretitulo">Personalidades</p>
        <h2>{referentes.length} referentes de la política uruguaya</h2>
        <p className="bajada">Agrupados por partido. Las figuras históricas se ubican por las posiciones de su época.</p>
        {GRUPOS.map((g) => {
          const miembros = referentes.filter((r) => r.grupo === g.id);
          if (miembros.length === 0) return null;
          return (
            <div key={g.id} className="grupo">
              <h3 className="subtitulo-grupo">{g.nombre} <span className="cantidad">{miembros.length}</span></h3>
              <ul className="grilla">
                {miembros.map((r) => <Tarjeta key={r.id} perfil={r} />)}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="seccion" id="partidos">
        <p className="sobretitulo">Partidos políticos</p>
        <h2>Los partidos con bancas en Diputados (2025-2030)</h2>
        <ul className="grilla">
          {[...partidos].sort((a, b) => b.bancas - a.bancas).map((p) => (
            <Tarjeta key={p.id} perfil={p} extra={`${p.bancas} ${p.bancas === 1 ? 'banca' : 'bancas'} de 99`} />
          ))}
        </ul>
      </section>

      <section className="cierre">
        <h2>¿Dónde estás parado vos?</h2>
        <button type="button" className="boton boton-amarillo boton-grande" onClick={onComenzar}>
          Descubrir mi perfil <span aria-hidden="true">→</span>
        </button>
      </section>

      <footer className="pie">
        <p><strong>uy12ejes</strong> es una herramienta para explorar ideas, no un instrumento científico. Inspirado en tests multieje como 12 Axes y Political Compass. Ubicaciones en revisión: si ves un error, avisanos.</p>
      </footer>
    </div>
  );
}
