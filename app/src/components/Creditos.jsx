import { Link } from 'react-router-dom';
import fotos from '../data/fotos.json';
import perfiles from '../data/perfiles.json';
import Foto from './Foto.jsx';

const conImagen = perfiles.filter((p) => p.tipo !== 'ideologia');
const sinFoto = conImagen.filter((p) => !fotos[p.id]);

export default function Creditos() {
  return (
    <section className="creditos">
      <p className="sobretitulo">Créditos</p>
      <h1>Imágenes</h1>
      <p className="bajada">
        La mayoría de las fotos y logos vienen de Wikimedia Commons y se usan bajo licencias libres (dominio público, CC0, CC BY o CC BY-SA); algunas fueron aportadas al sitio y se indican como tales. Las recortamos y achicamos para mostrarlas en círculo; los derechos siguen siendo de sus autores según cada licencia.
      </p>
      <ul className="lista-creditos">
        {conImagen.filter((p) => fotos[p.id]).map((p) => {
          const c = fotos[p.id];
          return (
            <li key={p.id}>
              <Foto perfil={p} tamano={40} />
              <div>
                <strong>{p.nombre}</strong>
                <p>
                  {c.origen ? <a href={c.origen} target="_blank" rel="noreferrer">{c.titulo}</a> : c.titulo}
                  {' · '}{c.autor}{' · '}
                  {c.licenciaUrl ? <a href={c.licenciaUrl} target="_blank" rel="noreferrer">{c.licencia}</a> : c.licencia}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      {sinFoto.length > 0 ? (
        <p className="nota">
          Sin imagen libre disponible (se muestran sus iniciales): {sinFoto.map((p) => p.nombre).join(', ')}. Si tenés una foto propia con licencia libre, avisanos.
        </p>
      ) : null}
      <p><Link to="/">Volver al inicio</Link></p>
    </section>
  );
}
