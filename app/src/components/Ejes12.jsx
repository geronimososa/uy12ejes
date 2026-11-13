import ejes from '../data/ejes.json';
import { tieneDato } from '../logic/calculo.js';
import { poloDominante } from '../logic/espectros.js';

export function textoPolo(eje, valor) {
  const polo = poloDominante(eje, valor);
  if (!polo) return 'Sin posición';
  return Math.abs(valor - 50) < 10 ? 'Centro' : polo.nombre;
}

export default function Ejes12({ vector, otro = null, texto }) {
  return (
    <ul className="perfil-12 perfil-12-pagina">
      {ejes.map((eje) => {
        const valor = vector[eje.id];
        const polo = poloDominante(eje, valor);
        const valorOtro = otro ? otro[eje.id] : null;
        return (
          <li key={eje.id}>
            <span className="perfil-12-nombre">{eje.nombre}</span>
            <span className="perfil-12-barra">
              {tieneDato(valorOtro) ? <span className="perfil-12-punto perfil-12-otro" style={{ left: `${valorOtro}%` }} /> : null}
              {polo ? <span className={`perfil-12-punto lado-${polo.lado.toLowerCase()}`} style={{ left: `${valor}%` }} /> : null}
            </span>
            <span className="perfil-12-polo">{texto ? texto(eje) : textoPolo(eje, valor)}</span>
          </li>
        );
      })}
    </ul>
  );
}
