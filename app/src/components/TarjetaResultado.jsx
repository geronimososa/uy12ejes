import ejes from '../data/ejes.json';
import { ESPECTROS, espectroDe, poloDominante } from '../logic/espectros.js';
import Foto from './Foto.jsx';

const FONDO = [42, 52, 66];

function mezclar(hex, peso) {
  const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgb(${rgb.map((v, i) => Math.round(v * peso + FONDO[i] * (1 - peso))).join(', ')})`;
}

export default function TarjetaResultado({ etiqueta, referentes, partidos, ideologia, historica, posiciones, encabezado = 'Mi resultado' }) {
  const [principal, ...otros] = referentes;
  const color = ESPECTROS.find((e) => e.id === espectroDe(posiciones))?.color ?? '#3570c4';
  const estilo = { '--tr-espectro': color, '--tr-espectro-suave': mezclar(color, 0.55) };
  return (
    <article className="tarjeta-resultado" aria-label="Resumen del resultado" style={estilo}>
      <div className="tr-cabeza">
        <span className="tr-marca"><span className="marca-uy">uy</span><span className="marca-12">12</span>ejes</span>
        <span className="tr-linea" />
        <span className="tr-mini">{encabezado}</span>
      </div>
      <p className="tr-mini tr-ideologia">Ideología más afín: {ideologia.perfil.nombre} · {ideologia.porcentaje} %</p>
      <h2 className="tr-etiqueta">{etiqueta}</h2>

      <div className="tr-cuerpo">
        <div className="tr-bloque tr-afin">
          <div className="tr-afin-cabeza">
            <Foto perfil={principal.perfil} tamano={64} diferida={false} />
            <p className="tr-porcentaje">{principal.porcentaje}%</p>
          </div>
          <p className="tr-mini">Referente más afín</p>
          <strong>{principal.perfil.nombre}</strong>
          <p className="tr-descripcion">{principal.perfil.descripcion}</p>
          {historica ? (
            <div className="tr-historica">
              <p className="tr-mini">Figura histórica</p>
              <p><Foto perfil={historica.perfil} tamano={28} diferida={false} /><span>{historica.perfil.nombre}</span><strong>{historica.porcentaje}%</strong></p>
            </div>
          ) : null}
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
            {otros.map((fila) => <li key={fila.perfil.id}><Foto perfil={fila.perfil} tamano={24} diferida={false} /><span>{fila.perfil.nombre}</span><strong>{fila.porcentaje}%</strong></li>)}
          </ol>
        </div>
        <div className="tr-bloque">
          <p className="tr-mini">Partidos más afines</p>
          <ol className="tr-lista">
            {partidos.map((fila) => <li key={fila.perfil.id}><Foto perfil={fila.perfil} tamano={24} diferida={false} /><span>{fila.perfil.nombre}</span><strong>{fila.porcentaje}%</strong></li>)}
          </ol>
        </div>
      </div>

      <p className="tr-firma"><span className="tr-mini">Descubrí tu perfil</span> <span>{window.location.host}</span></p>
    </article>
  );
}
