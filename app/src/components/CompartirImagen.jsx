import { useState } from 'react';
import { toBlob } from 'html-to-image';

const NOMBRE = 'uy12ejes-resultado.png';

async function generar(nodo) {
  return toBlob(nodo, { pixelRatio: 2, cacheBust: true });
}

function descargar(blob) {
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = NOMBRE;
  enlace.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function CompartirImagen({ objetivo }) {
  const [estado, setEstado] = useState('');
  const [ocupado, setOcupado] = useState(false);

  async function compartir() {
    setOcupado(true);
    setEstado('');
    try {
      const blob = await generar(objetivo.current);
      const archivo = new File([blob], NOMBRE, { type: 'image/png' });
      if (navigator.canShare?.({ files: [archivo] })) {
        await navigator.share({ files: [archivo], title: 'Mi resultado en uy12ejes', text: `Hacé el test: ${window.location.origin}` });
      } else if (window.ClipboardItem && navigator.clipboard?.write) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setEstado('Imagen copiada: pegala donde quieras compartirla.');
      } else {
        descargar(blob);
        setEstado('Tu navegador no deja copiar imágenes: la descargamos.');
      }
    } catch (error) {
      if (error?.name !== 'AbortError') setEstado('No se pudo generar la imagen. Probá con "Descargar imagen".');
    } finally {
      setOcupado(false);
    }
  }

  async function bajar() {
    setOcupado(true);
    setEstado('');
    try {
      descargar(await generar(objetivo.current));
    } catch {
      setEstado('No se pudo generar la imagen.');
    } finally {
      setOcupado(false);
    }
  }

  return (
    <div className="compartir-imagen">
      <button type="button" className="boton boton-amarillo" onClick={compartir} disabled={ocupado}>
        {ocupado ? 'Generando…' : 'Compartir imagen'}
      </button>
      <button type="button" className="boton boton-secundario" onClick={bajar} disabled={ocupado}>Descargar imagen</button>
      {estado ? <p className="nota" role="status">{estado}</p> : null}
    </div>
  );
}
