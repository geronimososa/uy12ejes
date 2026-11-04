import { useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import afirmaciones from './data/afirmaciones.json';
import dilemas from './data/dilemas.json';
import { calcularPosiciones } from './logic/calculo.js';
import { decodificar } from './logic/enlace.js';
import Encabezado from './components/Encabezado.jsx';
import Inicio from './components/Inicio.jsx';
import Formato from './components/Formato.jsx';
import Pregunta from './components/Pregunta.jsx';
import Dilema from './components/Dilema.jsx';
import Resultado from './components/Resultado.jsx';

const CLAVE_TEST = 'uy12ejes-test';
const CLAVE_RESULTADO = 'uy12ejes-resultado';
const PORID = Object.fromEntries(afirmaciones.map((a) => [a.id, a]));

function leer(clave) {
  try {
    const texto = window.sessionStorage.getItem(clave);
    return texto ? JSON.parse(texto) : null;
  } catch {
    return null;
  }
}

function guardar(clave, valor) {
  try {
    if (valor === null) window.sessionStorage.removeItem(clave);
    else window.sessionStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    return;
  }
}

function testGuardado() {
  const g = leer(CLAVE_TEST);
  if (!g || !Array.isArray(g.ordenIds)) return null;
  const orden = g.ordenIds.map((id) => PORID[id]).filter(Boolean);
  if (orden.length === 0 || orden.length !== g.ordenIds.length) return null;
  return { orden, indice: g.indice ?? 0, respuestas: g.respuestas ?? {}, elecciones: g.elecciones ?? {}, indiceDilema: g.indiceDilema ?? 0, etapa: g.etapa ?? 'preguntas' };
}

function mezclar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function irA(id) {
  if (id === 'arriba') {
    window.scrollTo(0, 0);
    return;
  }
  document.getElementById(id)?.scrollIntoView();
}

function ResultadoCompartido() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const posiciones = decodificar(codigo);
  if (!posiciones) {
    return (
      <section className="tarjeta">
        <h2 className="afirmacion">Este enlace no es válido</h2>
        <p className="nota">Puede estar incompleto o haber sido modificado.</p>
        <button type="button" className="boton boton-amarillo" onClick={() => navigate('/test')}>Hacer el test</button>
      </section>
    );
  }
  return <Resultado posiciones={posiciones} compartido onReiniciar={() => navigate('/test')} />;
}

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [test, setTest] = useState(testGuardado);
  const [posiciones, setPosiciones] = useState(() => leer(CLAVE_RESULTADO));

  function actualizarTest(nuevo) {
    setTest(nuevo);
    guardar(CLAVE_TEST, nuevo ? { ...nuevo, orden: undefined, ordenIds: nuevo.orden.map((a) => a.id) } : null);
  }

  function ir(ruta) {
    navigate(ruta);
    window.scrollTo(0, 0);
  }

  function navegar(id) {
    if (pathname === '/') {
      irA(id);
      return;
    }
    navigate('/');
    setTimeout(() => irA(id), 50);
  }

  function empezar(rapido) {
    const elegidas = rapido ? afirmaciones.filter((a) => a.rapido) : afirmaciones;
    actualizarTest({ orden: mezclar(elegidas), indice: 0, respuestas: {}, elecciones: {}, indiceDilema: 0, etapa: 'preguntas' });
    ir('/test/preguntas');
  }

  function responder(valor) {
    const actual = test.orden[test.indice];
    const respuestas = { ...test.respuestas, [actual.id]: valor };
    const ultima = test.indice + 1 >= test.orden.length;
    actualizarTest({ ...test, respuestas, indice: ultima ? test.indice : test.indice + 1, etapa: ultima ? 'dilemas' : 'preguntas' });
  }

  function volverPregunta() {
    if (test.indice === 0) {
      ir('/test');
      return;
    }
    actualizarTest({ ...test, indice: test.indice - 1 });
  }

  function elegir(opcionId) {
    const dilema = dilemas[test.indiceDilema];
    const elecciones = { ...test.elecciones, [dilema.id]: opcionId };
    if (test.indiceDilema + 1 < dilemas.length) {
      actualizarTest({ ...test, elecciones, indiceDilema: test.indiceDilema + 1 });
      return;
    }
    const resultado = calcularPosiciones(test.orden, test.respuestas, dilemas, elecciones);
    setPosiciones(resultado);
    guardar(CLAVE_RESULTADO, resultado);
    actualizarTest(null);
    navigate('/resultado', { replace: true });
    window.scrollTo(0, 0);
  }

  function volverDilema() {
    if (test.indiceDilema === 0) {
      actualizarTest({ ...test, etapa: 'preguntas' });
      return;
    }
    actualizarTest({ ...test, indiceDilema: test.indiceDilema - 1 });
  }

  function reiniciar() {
    setPosiciones(null);
    guardar(CLAVE_RESULTADO, null);
    ir('/test');
  }

  const enCurso = test ? {
    actual: test.etapa === 'dilemas' ? test.orden.length + test.indiceDilema + 1 : test.indice + 1,
    total: test.orden.length + dilemas.length,
  } : null;

  return (
    <>
      <Encabezado onNavegar={navegar} onComenzar={() => ir(test ? '/test/preguntas' : '/test')} />
      <Routes>
        <Route
          path="/"
          element={<Inicio onComenzar={() => ir('/test')} onNavegar={navegar} enCurso={enCurso} onContinuar={() => ir('/test/preguntas')} />}
        />
        <Route
          path="/test"
          element={<main className="contenedor"><Formato onEmpezar={empezar} onVolver={() => ir('/')} enCurso={enCurso} onContinuar={() => ir('/test/preguntas')} /></main>}
        />
        <Route
          path="/test/preguntas"
          element={!test ? <Navigate to="/test" replace /> : (
            <main className="contenedor">
              {test.etapa === 'preguntas' ? (
                <Pregunta
                  afirmacion={test.orden[test.indice]}
                  numero={test.indice + 1}
                  total={test.orden.length}
                  elegida={test.respuestas[test.orden[test.indice].id]}
                  onResponder={responder}
                  onVolver={volverPregunta}
                />
              ) : (
                <Dilema
                  dilema={dilemas[test.indiceDilema]}
                  numero={test.indiceDilema + 1}
                  total={dilemas.length}
                  elegida={test.elecciones[dilemas[test.indiceDilema].id]}
                  onElegir={elegir}
                  onVolver={volverDilema}
                />
              )}
            </main>
          )}
        />
        <Route
          path="/resultado"
          element={posiciones ? <main className="contenedor"><Resultado posiciones={posiciones} onReiniciar={reiniciar} /></main> : <Navigate to="/" replace />}
        />
        <Route path="/r/:codigo" element={<main className="contenedor"><ResultadoCompartido /></main>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
