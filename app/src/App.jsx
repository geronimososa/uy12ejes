import { useState } from 'react';
import afirmaciones from './data/afirmaciones.json';
import dilemas from './data/dilemas.json';
import { calcularPosiciones } from './logic/calculo.js';
import { codificar, decodificar } from './logic/enlace.js';
import Encabezado from './components/Encabezado.jsx';
import Inicio from './components/Inicio.jsx';
import Formato from './components/Formato.jsx';
import Pregunta from './components/Pregunta.jsx';
import Dilema from './components/Dilema.jsx';
import Resultado from './components/Resultado.jsx';

function leerEnlace() {
  try {
    return decodificar(new URLSearchParams(window.location.search).get('v'));
  } catch {
    return null;
  }
}

function mezclar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function ponerEnlace(posiciones) {
  const url = posiciones ? `?v=${codificar(posiciones)}` : window.location.pathname;
  window.history.replaceState(null, '', url);
}

function irA(id) {
  if (id === 'arriba') {
    window.scrollTo(0, 0);
    return;
  }
  document.getElementById(id)?.scrollIntoView();
}

export default function App() {
  const [compartido] = useState(leerEnlace);
  const [pantalla, setPantalla] = useState(compartido ? 'resultado' : 'inicio');
  const [orden, setOrden] = useState([]);
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [elecciones, setElecciones] = useState({});
  const [indiceDilema, setIndiceDilema] = useState(0);
  const [posiciones, setPosiciones] = useState(compartido);

  function navegar(id) {
    if (pantalla === 'inicio') {
      irA(id);
      return;
    }
    setPantalla('inicio');
    setTimeout(() => irA(id), 0);
  }

  function comenzar() {
    setPantalla('formato');
    window.scrollTo(0, 0);
  }

  function empezar(rapido) {
    const elegidas = rapido ? afirmaciones.filter((a) => a.rapido) : afirmaciones;
    setOrden(mezclar(elegidas));
    setIndice(0);
    setRespuestas({});
    setElecciones({});
    setIndiceDilema(0);
    setPantalla('pregunta');
    window.scrollTo(0, 0);
  }

  function responder(valor) {
    const actual = orden[indice];
    setRespuestas((prev) => ({ ...prev, [actual.id]: valor }));
    if (indice + 1 < orden.length) {
      setIndice(indice + 1);
    } else {
      setPantalla('dilema');
    }
  }

  function volverPregunta() {
    if (indice === 0) {
      setPantalla('formato');
    } else {
      setIndice(indice - 1);
    }
  }

  function elegir(opcionId) {
    const dilema = dilemas[indiceDilema];
    const nuevas = { ...elecciones, [dilema.id]: opcionId };
    setElecciones(nuevas);
    if (indiceDilema + 1 < dilemas.length) {
      setIndiceDilema(indiceDilema + 1);
      return;
    }
    const resultado = calcularPosiciones(orden, respuestas, dilemas, nuevas);
    setPosiciones(resultado);
    ponerEnlace(resultado);
    setPantalla('resultado');
    window.scrollTo(0, 0);
  }

  function volverDilema() {
    if (indiceDilema === 0) {
      setPantalla('pregunta');
    } else {
      setIndiceDilema(indiceDilema - 1);
    }
  }

  function reiniciar() {
    ponerEnlace(null);
    setPosiciones(null);
    setPantalla('formato');
    window.scrollTo(0, 0);
  }

  return (
    <>
      <Encabezado onNavegar={navegar} onComenzar={comenzar} />
      {pantalla === 'inicio' ? <Inicio onComenzar={comenzar} onNavegar={navegar} /> : null}
      <main className="contenedor">
        {pantalla === 'formato' ? <Formato onEmpezar={empezar} onVolver={() => navegar('arriba')} /> : null}
        {pantalla === 'pregunta' ? (
          <Pregunta
            afirmacion={orden[indice]}
            numero={indice + 1}
            total={orden.length}
            elegida={respuestas[orden[indice].id]}
            onResponder={responder}
            onVolver={volverPregunta}
          />
        ) : null}
        {pantalla === 'dilema' ? (
          <Dilema
            dilema={dilemas[indiceDilema]}
            numero={indiceDilema + 1}
            total={dilemas.length}
            elegida={elecciones[dilemas[indiceDilema].id]}
            onElegir={elegir}
            onVolver={volverDilema}
          />
        ) : null}
        {pantalla === 'resultado' && posiciones ? (
          <Resultado posiciones={posiciones} onReiniciar={reiniciar} />
        ) : null}
      </main>
    </>
  );
}
