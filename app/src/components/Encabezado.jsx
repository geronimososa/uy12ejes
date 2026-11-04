const SECCIONES = [
  { id: 'como-funciona', texto: 'Cómo funciona' },
  { id: 'ejes', texto: 'Los 12 ejes' },
  { id: 'ideologias', texto: 'Ideologías' },
  { id: 'personalidades', texto: 'Personalidades' },
  { id: 'partidos', texto: 'Partidos' },
];

export default function Encabezado({ onNavegar, onComenzar }) {
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
        <button type="button" className="boton boton-amarillo" onClick={onComenzar}>
          Comenzar <span aria-hidden="true">→</span>
        </button>
      </div>
    </header>
  );
}
