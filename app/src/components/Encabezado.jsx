import { useState } from 'react';

const CLAVE_TEMA = 'uy12ejes-tema';

function temaActual() {
  const elegido = document.documentElement.dataset.theme;
  if (elegido === 'light' || elegido === 'dark') return elegido;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const SECCIONES = [
  { id: 'como-funciona', texto: 'Cómo funciona' },
  { id: 'ejes', texto: 'Los 12 ejes' },
  { id: 'ideologias', texto: 'Ideologías' },
  { id: 'personalidades', texto: 'Personalidades' },
  { id: 'partidos', texto: 'Partidos' },
];

export default function Encabezado({ onNavegar, onComenzar }) {
  const [tema, setTema] = useState(temaActual);

  function cambiarTema() {
    const nuevo = tema === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nuevo;
    setTema(nuevo);
    try {
      window.localStorage.setItem(CLAVE_TEMA, nuevo);
    } catch {
      return;
    }
  }

  return (
    <header className="encabezado">
      <div className="encabezado-interior">
        <button type="button" className="marca" onClick={() => onNavegar('arriba')}>
          <span className="marca-uy">uy</span><span className="marca-12">12</span>ejes
        </button>
        <nav className="menu" aria-label="Secciones">
          {SECCIONES.map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={(e) => { e.preventDefault(); onNavegar(s.id); }}>
              {s.texto}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="cambiar-tema"
          onClick={cambiarTema}
          aria-label={tema === 'dark' ? 'Pasar a modo claro' : 'Pasar a modo oscuro'}
          title={tema === 'dark' ? 'Modo claro' : 'Modo oscuro'}
        >
          {tema === 'dark' ? (
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor" /><g stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" /></g></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" fill="currentColor" /></svg>
          )}
        </button>
        <button type="button" className="boton boton-amarillo" onClick={onComenzar}>
          Comenzar <span aria-hidden="true">→</span>
        </button>
      </div>
    </header>
  );
}
