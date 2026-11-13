import { Link } from 'react-router-dom';

export const REPOSITORIO = 'https://github.com/geronimososa/uy12ejes';

export default function Privacidad() {
  return (
    <section className="legal">
      <p className="sobretitulo">Legal</p>
      <h1>Política de privacidad</h1>
      <p className="bajada">Vigente desde el 12 de noviembre de 2026.</p>

      <p className="legal-resumen">
        <strong>En resumen:</strong> uy12ejes no recopila, almacena ni comparte datos personales. No pide registro, no usa cookies y tus respuestas nunca salen de tu dispositivo.
      </p>

      <h2>1. Quién es responsable</h2>
      <p>
        uy12ejes es un proyecto personal, gratuito y sin fines de lucro, de código abierto. No tiene publicidad ni vende servicios. Las consultas sobre esta política pueden hacerse a través del <a href={`${REPOSITORIO}/issues`} target="_blank" rel="noreferrer">repositorio público del proyecto</a>.
      </p>

      <h2>2. Qué datos no recopilamos</h2>
      <ul>
        <li><strong>No hay cuentas ni formularios.</strong> No pedimos nombre, correo electrónico, cédula, teléfono ni ningún otro dato de identificación.</li>
        <li><strong>Tus respuestas se procesan solo en tu navegador.</strong> El cálculo del resultado se hace en tu dispositivo. Ninguna respuesta se envía a un servidor ni queda guardada por el proyecto.</li>
        <li><strong>No usamos cookies</strong> ni tecnologías de rastreo publicitario, y no compartimos información con terceros con fines comerciales.</li>
      </ul>

      <h2>3. Qué queda en tu dispositivo</h2>
      <p>
        Para que puedas retomar el test si salís de la página, el progreso se guarda temporalmente en el almacenamiento de sesión de tu navegador (<em>sessionStorage</em>). Esa información permanece solo en tu dispositivo, no es accesible para el proyecto y se borra automáticamente al cerrar la pestaña.
      </p>

      <h2>4. El enlace para compartir</h2>
      <p>
        El enlace de resultado contiene únicamente tus doce posiciones (números del 0 al 100), codificadas. No incluye tus respuestas, tu nombre ni ningún dato que te identifique. Solo se comparte si vos decidís enviarlo. La imagen de la tarjeta de resultado también se genera en tu dispositivo.
      </p>

      <h2>5. Medición de audiencia</h2>
      <p>
        Usamos Vercel Web Analytics para conocer cuántas personas visitan el sitio. Esta herramienta no usa cookies ni identifica a las personas: registra estadísticas agregadas y anónimas, como las páginas visitadas, el país, el tipo de dispositivo y el sitio desde el que se llegó. Esa información no se vincula con tus respuestas ni con tu resultado.
      </p>

      <h2>6. Alojamiento del sitio</h2>
      <p>
        El sitio está alojado en Vercel Inc. Como cualquier servicio de alojamiento web, Vercel puede procesar datos técnicos de la conexión, como la dirección IP y la fecha y hora de acceso, con el único fin de entregar las páginas y proteger el servicio, según su propia <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">política de privacidad</a>. El proyecto uy12ejes no accede a esos registros ni los utiliza. Todas las imágenes del sitio se sirven desde el mismo dominio, sin recursos de terceros.
      </p>

      <h2>7. Marco legal</h2>
      <p>
        Esta política se rige por la Ley N.º 18.331 de Protección de Datos Personales y Acción de Habeas Data de la República Oriental del Uruguay y su Decreto reglamentario N.º 414/009. Como uy12ejes no recopila ni conserva datos personales, no mantiene bases de datos sobre sus usuarios. Si tenés una consulta sobre tus derechos de acceso, rectificación, actualización o supresión, podés escribirnos por el canal indicado en el punto 1.
      </p>

      <h2>8. Cambios en esta política</h2>
      <p>
        Si el funcionamiento del sitio cambia de manera que afecte el tratamiento de datos, actualizaremos esta página y su fecha de vigencia antes de que el cambio entre en efecto.
      </p>

      <p className="legal-volver"><Link to="/">Volver al inicio</Link></p>
    </section>
  );
}
