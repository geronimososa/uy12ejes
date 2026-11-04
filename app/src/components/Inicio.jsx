import ejes from '../data/ejes.json';
import perfiles from '../data/perfiles.json';
import { rankear } from '../logic/calculo.js';
import { etiqueta } from '../logic/compas.js';

const partidos = perfiles.filter((p) => p.tipo === 'partido');
const referentes = perfiles.filter((p) => p.tipo === 'referente');
const ideologias = perfiles.filter((p) => p.tipo === 'ideologia');

const GRUPOS = [
  ...partidos.map((p) => ({ id: p.id, nombre: p.nombre })),
  { id: 'otros-partidos', nombre: 'Otros partidos' },
  { id: 'independientes', nombre: 'Independientes, organizaciones y figuras sin partido' },
];

const EJEMPLO = {
  estructura: 60, representacion: 10, poder: 55, inmigracion: 65, diplomacia: 60, intervencion: 45,
  economia: 45, control: 48, comercio: 62, religion: 25, moral: 35, tecnologia: 45,
};

function Ejemplo() {
  const partido = rankear(EJEMPLO, partidos)[0];
  const referente = rankear(EJEMPLO, referentes)[0];
  return (
    <aside className="ejemplo" aria-label="Ejemplo de resultado">
      <p className="sobretitulo">Ejemplo de resultado</p>
      <p className="ejemplo-etiqueta">{etiqueta(EJEMPLO, ejes)}</p>
      <p className="ejemplo-afin">
        Partido más afín: <strong>{partido.perfil.nombre}</strong> ({partido.porcentaje} %)<br />
        Referente más afín: <strong>{referente.perfil.nombre}</strong> ({referente.porcentaje} %)
      </p>
      <ul className="ejemplo-ejes">
        {ejes.map((e) => (
          <li key={e.id}>
            <span className="ejemplo-nombre">{e.nombre}</span>
            <span className="ejemplo-barra"><span style={{ left: `${EJEMPLO[e.id]}%` }} /></span>
          </li>
        ))}
      </ul>
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

export default function Inicio({ onComenzar, onNavegar }) {
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
        </div>
        <Ejemplo />
      </section>

      <section className="seccion" id="como-funciona">
        <p className="sobretitulo">Cómo funciona</p>
        <h2>Cuatro pasos, sin registro</h2>
        <ol className="pasos">
          <li><strong>Elegís el formato.</strong> Rápido (48 afirmaciones, unos 6 minutos) o completo (120, unos 15 minutos).</li>
          <li><strong>Respondés afirmaciones.</strong> Sobre principios y sobre debates uruguayos concretos: la dictadura, la LUC, las AFAP, la laicidad, el Mercosur. Podés decir "No sé" y no cuenta.</li>
          <li><strong>Resolvés 5 dilemas.</strong> Escenarios uruguayos de opción múltiple que tocan varios ejes a la vez.</li>
          <li><strong>Ves tu resultado.</strong> Tu posición en los 12 ejes, en el compás uruguayo y frente a la ventana de Overton, y los partidos, referentes e ideologías más afines. Podés compartirlo con un link.</li>
        </ol>
        <p className="nota">Tus respuestas no salen de tu navegador. Las ubicaciones de partidos, referentes e ideologías salen de responder el mismo test, a partir de sus votos, programas y declaraciones públicas.</p>
      </section>

      <section className="seccion" id="ejes">
        <p className="sobretitulo">Los 12 ejes</p>
        <h2>Doce preguntas de fondo, medidas por separado</h2>
        <p className="bajada">Cada eje va de un polo al otro. Podés estar en un extremo en uno y en el centro en otro: el test muestra esa combinación en vez de promediarla.</p>
        <ol className="lista-ejes">
          {ejes.map((e, i) => (
            <li key={e.id} className="eje-tarjeta">
              <p className="eje-numero">{String(i + 1).padStart(2, '0')}</p>
              <h3>{e.nombre}</h3>
              <p className="eje-polos-titulo"><span className="polo-a">{e.poloA}</span> ↔ <span className="polo-b">{e.poloB}</span></p>
              <p>{e.descripcion}</p>
              <dl>
                <dt className="polo-a">{e.poloA}</dt>
                <dd>{e.explicacionA}</dd>
                <dt className="polo-b">{e.poloB}</dt>
                <dd>{e.explicacionB}</dd>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="seccion" id="ideologias">
        <p className="sobretitulo">Ideologías</p>
        <h2>{ideologias.length} ideologías para comparar</h2>
        <h3 className="subtitulo-grupo">Tradiciones uruguayas</h3>
        <ul className="grilla">
          {ideologias.filter((i) => i.grupo === 'uruguaya').map((i) => <Tarjeta key={i.id} perfil={i} />)}
        </ul>
        <h3 className="subtitulo-grupo">Ideologías universales</h3>
        <ul className="grilla">
          {ideologias.filter((i) => i.grupo === 'universal').map((i) => <Tarjeta key={i.id} perfil={i} />)}
        </ul>
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
