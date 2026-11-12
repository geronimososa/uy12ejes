import ejes from '../data/ejes.json';
import { poloDominante } from '../logic/espectros.js';

export default function TarjetaResultado({ etiqueta, referentes, partidos, ideologia, historica, posiciones, encabezado = 'Mi resultado' }) {
  const [principal, ...otros] = referentes;
  return (
    <article className="tarjeta-resultado" aria-label="Resumen del resultado">
      <div className="tr-cabeza">
        <span className="tr-marca"><span className="marca-uy">uy</span><span className="marca-12">12</span>ejes</span>
        <span className="tr-linea" />
        <span className="tr-mini">{encabezado}</span>
      </div>
      <p className="tr-mini tr-ideologia">Ideología más afín: {ideologia.perfil.nombre} · {ideologia.porcentaje} %</p>
      <h2 className="tr-etiqueta">{etiqueta}</h2>

      <div className="tr-cuerpo">
        <div className="tr-bloque tr-afin">
          <p className="tr-porcentaje">{principal.porcentaje}%</p>
          <p className="tr-mini">Referente más afín</p>
          <strong>{principal.perfil.nombre}</strong>
          <p className="tr-descripcion">{principal.perfil.descripcion}</p>
          <div className="tr-historica">
            <p className="tr-mini">Figura histórica</p>
            <p><span>{historica.perfil.nombre}</span><strong>{historica.porcentaje}%</strong></p>
          </div>
        </div>
        <div className="tr-bloque">
          <p className="tr-mini">Tus 12 ejes</p>
          <ul className="tr-ejes">
            {ejes.map((eje) => {
              const polo = poloDominante(eje, posiciones[eje.id]);
              return (
                <li key={eje.id} className={`lado-${polo.lado.toLowerCase()}`}>
                  <span className="tr-eje-nombre">{polo.nombre}</span>
                  <span className="tr-eje-barra"><span style={{ width: `${polo.porcentaje}%` }} /></span>
                  <span className="tr-eje-valor">{polo.porcentaje}%</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="tr-cuerpo">
        <div className="tr-bloque">
          <p className="tr-mini">Otros referentes</p>
          <ol className="tr-lista">
            {otros.map((fila) => <li key={fila.perfil.id}><span>{fila.perfil.nombre}</span><strong>{fila.porcentaje}%</strong></li>)}
          </ol>
        </div>
        <div className="tr-bloque">
          <p className="tr-mini">Partidos más afines</p>
          <ol className="tr-lista">
            {partidos.map((fila) => <li key={fila.perfil.id}><span>{fila.perfil.nombre}</span><strong>{fila.porcentaje}%</strong></li>)}
          </ol>
        </div>
      </div>

      <p className="tr-firma"><span className="tr-mini">Descubrí tu perfil</span> <span>{window.location.host}</span></p>
    </article>
  );
}
