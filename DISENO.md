# uy12ejes: diseño del test político uruguayo

Versión 0.1 · 4 de noviembre de 2026

Documento de diseño de un test político de 12 ejes calibrado para Uruguay, inspirado en la experiencia de 12 Axes. Este archivo define qué se hace y cómo. El contenido político está en otros dos archivos:

- [EJES-Y-PREGUNTAS.md](EJES-Y-PREGUNTAS.md): los 12 ejes redefinidos para Uruguay, las 120 afirmaciones y los 5 dilemas.
- [OVERTON-Y-REFERENTES.md](OVERTON-Y-REFERENTES.md): la ventana de Overton uruguaya por eje y en el compás, los perfiles estimados de los partidos y los referentes de cada punto.

---

## 0. Antes de empezar: la licencia del repo original

El repo `RomanCypherpunk/12axes` **no es open source**. Su `LICENSE` dice "All rights reserved" y prohíbe, sin permiso escrito del autor:

- copiar o redistribuir cualquier parte (código, preguntas, perfiles, vectores, diseño, imágenes);
- hacer obras derivadas, **incluidas traducciones de las preguntas**;
- usar la API pública.

Consecuencias para este proyecto:

1. **Se toma la idea, no el material.** Todo se escribe desde cero: preguntas, definiciones de los ejes, fórmula de afinidad, perfiles, textos y diseño visual. Las preguntas de este diseño son originales y están pensadas para Uruguay; no son traducciones.
2. **No se copia código** del repo (ni el `ScoringService` ni el `ProfileMatchScorer`). La lógica de este documento es propia y más simple.
3. **Nombre propio.** No usar "12 Axes" ni su logo. Nombre elegido: **uy12ejes** (antes se propuso *Ejes Orientales*). Al ser parecido a "12 Axes", conviene no imitar su logo ni su tipografía.
4. Citar la inspiración en la página "Acerca de" ("inspirado en tests multieje como 12 Axes y Political Compass"). Si en algún momento querés reutilizar algo literal, hay que escribirle al autor (el mail está en el `LICENSE`).

Esto no es asesoramiento legal; es la lectura directa del archivo.

---

## 1. Qué es

Un test anónimo, gratis y sin registro. Respondés afirmaciones en una escala de 5 puntos y obtenés:

- tu posición en 12 ejes independientes;
- tu lugar en un compás de 2 dimensiones, junto a los partidos uruguayos, y tu distancia al centro político uruguayo;
- si cada posición tuya está dentro o fuera de la **ventana de Overton uruguaya**;
- los partidos, referentes e ideologías (universales y tradiciones uruguayas) más afines.

Sin suscripciones, sin pagos, sin cuentas, sin base de datos. Las respuestas no salen del navegador.

---

## 2. Qué se mantiene y qué se descarta

### Se mantiene (la experiencia)

| Elemento de 12 Axes | Cómo queda en Ejes Orientales |
|---|---|
| 12 ejes independientes, cada uno entre dos polos | Igual, con polos y definiciones adaptados a Uruguay |
| Escala de 5 puntos (muy de acuerdo → muy en desacuerdo) | Igual |
| Mitad de las afirmaciones apuntan a cada polo | Igual: 5 y 5 por eje, para que "estar de acuerdo con todo" no sesgue |
| Formatos de distinto largo | Dos: **Rápido** (48) y **Completo** (120) |
| Preguntas de opción múltiple al final que tocan varios ejes | 5 **dilemas uruguayos** (escenarios concretos, no copias de los arquetipos) |
| Avance automático y botón "Volver" | Igual |
| Resultado por eje con intensidad | Igual, con etiquetas propias |
| Compás 2D a partir de los ejes | Igual, con fórmula propia y lectura uruguaya (partidos, ventana y centro uruguayo) |
| Afinidad con perfiles (ideologías, personas) | Partidos uruguayos, referentes uruguayos e ideologías |
| El más afín y el menos afín | Igual |
| Resultado compartible por link | Igual: los 12 números van en la URL |
| Tarjeta para compartir | Igual (imagen PNG), en fase 2 |
| Nota metodológica | Igual, más corta |

### Se descarta (lo que sobra para la idea básica)

| Elemento | Por qué |
|---|---|
| Premium, paywall, pagos (AbacatePay, MercadoPago, Paddle), mails de acceso | Fuera de alcance: nada de pagos |
| Backend Java/Spring, rate limiting, Docker, Render | Innecesario: el cálculo se hace en el navegador |
| Formato "Extremo" de 240 preguntas | Con 120 alcanza para 12 ejes |
| Catálogo de +170 países y regímenes | Fase 3 como mucho, y reducido |
| +230 ideologías y +390 personalidades | Se reemplaza por 6 partidos, 59 referentes y ~22 ideologías |
| Filtro de religión | En Uruguay no aporta; el eje Religión ya lo cubre |
| Recomendación de libros, glosario, "tensiones", "valores políticos", comparador | Fase 3 o nunca |
| Traducciones (PT/EN) | Solo español rioplatense |
| Páginas estáticas para SEO de cada perfil | No |

### Se agrega (la calibración uruguaya)

1. **Preguntas locales**: 4 de las 10 afirmaciones de cada eje son sobre Uruguay (dictadura, Ley de Caducidad, LUC, AFAP, ANCAP, laicidad, UPM, Mercosur, etc.).
2. **Ventana de Overton** por eje y en el compás: muestra si tu posición está en el debate normal, en el borde o fuera de lo que se discute en Uruguay.
3. **Lectura uruguaya** del compás: tu posición relativa al centro político uruguayo, que no coincide con el centro "global".
4. **Referentes** en cada punto de cada eje y en cada región del compás.

---

## 3. Flujo de pantallas

```
Inicio ──► Elegir formato ──► Afirmaciones (48 o 120) ──► Dilemas (5) ──► Resultado
                                   ▲    │ Volver
                                   └────┘
```

1. **Inicio**: título, una frase ("¿Dónde estás parado en la política uruguaya?"), botón "Empezar", link a "Cómo funciona".
2. **Formato**: Rápido (48 afirmaciones, ~6 min) o Completo (120, ~15 min).
3. **Afirmación**: una por pantalla, barra de progreso, cinco botones: *Muy de acuerdo · De acuerdo · Neutral · En desacuerdo · Muy en desacuerdo*, y aparte "No sé / Prefiero no responder", que no cuenta para el puntaje. Avanza solo al elegir. Botón "Volver". Las afirmaciones se muestran mezcladas (no agrupadas por eje).
4. **Dilemas**: 5 preguntas de opción múltiple con escenarios uruguayos.
5. **Resultado**, en este orden:
   1. Etiqueta general: región del compás + rasgo más marcado (ej.: "Centroizquierda laica" o "Derecha liberal").
   2. Las 12 barras: tu punto, la ventana de Overton sombreada, la marca de "política vigente" y 2 o 3 referentes ubicados sobre la barra.
   3. Compás 2D con tu punto, los partidos, la ventana y el centro uruguayo.
   4. Partidos más afines (los 6 con representación parlamentaria, ordenados por afinidad).
   5. Referentes más afines (top 5) y el menos afín.
   6. Ideologías más afines (top 3).
   7. Compartir: copiar link (fase 1), descargar tarjeta (fase 2).
   8. Nota metodológica.

---

## 4. Cálculo

### 4.1 Convención de la escala

Cada eje va de **0 a 100**. **0 es el polo A** (izquierda de la barra), **100 es el polo B** (derecha), **50 es el centro**. El número es "qué tan cerca estás del polo B". (12 Axes usa la convención inversa; acá se eligió la más intuitiva para dibujar.)

### 4.2 Afirmaciones

Cada afirmación tiene `eje` y `polo` (A o B: hacia dónde empuja estar de acuerdo).

| Respuesta | Valor si `polo = B` | Valor si `polo = A` |
|---|---:|---:|
| Muy de acuerdo | 100 | 0 |
| De acuerdo | 75 | 25 |
| Neutral | 50 | 50 |
| No sé / Prefiero no responder | no cuenta | no cuenta |
| En desacuerdo | 25 | 75 |
| Muy en desacuerdo | 0 | 100 |

**Posición en el eje** = promedio de los valores de sus afirmaciones respondidas (más las opciones de dilema que toquen ese eje, ver 4.3).

Dos reglas de calibración:
- **Afirmaciones extremas** (marcadas "Escalón extremo"): solo cuentan cuando estás de acuerdo. Si estás en desacuerdo, cuentan como neutral (50). Sirven para distinguir a quien sostiene la posición extrema, sin empujar al polo contrario a todo el que la rechaza.
- **Peso**: las dos afirmaciones sobre el golpe de 1973 y los juicios por la dictadura pesan 0,5, para que la memoria de ese período no defina sola el eje Representación.

### 4.3 Dilemas

Cada opción de un dilema trae un valor fijo para 1 a 4 ejes (ej.: `{ "poder": 20, "diplomacia": 30 }`). Elegirla equivale a sumar **una respuesta más** con ese valor en cada eje que toca. Así un dilema nunca pesa más que una afirmación.

### 4.4 Intensidad

| Distancia al centro (`|pos − 50|`) | Etiqueta |
|---|---|
| menos de 10 | Centro |
| 10 a 25 | Inclinado a {polo} |
| 25 a 40 | Marcado hacia {polo} |
| 40 o más | Muy marcado hacia {polo} |

### 4.5 Afinidad con un perfil

Cada partido, referente o ideología tiene un vector de 12 posiciones (0 a 100).

```
d        = promedio de |tu_pos[eje] − perfil[eje]| en los 12 ejes     (0 a 100)
afinidad = max(0, 100 − 2 × d)                                          (0 a 100 %)
```

- `d = 0` → 100 %; `d = 15` → 70 %; `d = 50` → 0 %.
- Ajuste: en cada eje donde vos y el perfil están **de lados opuestos del 50 y los dos a más de 15 del centro**, la diferencia de ese eje se multiplica por 1,25 (estar en veredas opuestas pesa más que una diferencia de grado).
- Se muestran también los 2 ejes donde más coinciden y los 2 donde más difieren ("Coincidís con el Partido Colorado en Laicidad y Apertura; difieren en Economía").

Es una fórmula propia, simple de explicar y de probar.

**Ejes sin datos.** Si un perfil no tiene posición en un eje (por ejemplo, una figura histórica sobre temas que no existían en su época), ese eje queda vacío y no cuenta para la afinidad ni para el compás. Si un perfil se compara en menos de 8 ejes, su afinidad se multiplica por (ejes comparados / 8), para que coincidir en pocos ejes no alcance para quedar primero. La app lo aclara: "Perfil histórico: comparado en N de 12 ejes". Se puede afinar con el piloto (sección 7).

### 4.6 Compás 2D

```
X (izquierda → derecha)      = promedio(Economía, Control)
Y (libertario → autoritario) = promedio(Representación, 100 − Poder)
```

- Economía: 0 = Público, 100 = Privado. Control: 0 = Planificación, 100 = Mercado.
- Representación: 100 = Autocracia. Poder: 0 = Seguridad, así que `100 − Poder` es "cuánto priorizás la seguridad".
- **No se usa Territorio** (en el original, "Estructura") en el eje Y (12 Axes sí lo usa). En un país unitario como Uruguay casi todos son "centralistas" y eso empujaría a todo el mundo hacia el autoritarismo sin motivo.

La grilla se divide en regiones: Izquierda socialista, Izquierda, Centroizquierda, Centro, Centroderecha, Derecha, Derecha liberal, Derecha autoritaria, Izquierda autoritaria, Libertarismo, Izquierda libertaria. Los nombres son descriptivos: "radical" no se usa como etiqueta de una persona. Los límites exactos están en [OVERTON-Y-REFERENTES.md](OVERTON-Y-REFERENTES.md#5-el-compás-uruguayo).

### 4.7 Lectura uruguaya

El **centro uruguayo** es el promedio de los vectores de los partidos ponderado por sus bancas en Diputados (legislatura 2025–2030). Con los partidos auditados da aproximadamente **X = 46, Y = 25**: un poco a la izquierda del centro del mapa.

En el resultado se muestra tu posición respecto a ese centro:

> Respecto al centro político uruguayo, estás *a la derecha del centro*.

Regla: diferencia en X respecto al centro uruguayo menor a 7 → "en el centro"; 7 a 20 → "a la izquierda/derecha del centro"; más de 20 → "en la izquierda/derecha".

### 4.8 Ventana de Overton

Para cada eje, la ventana **se calcula a partir de los perfiles de los partidos**, no se dibuja a mano:

| Zona | Cómo se calcula | Qué significa |
|---|---|---|
| Política vigente | Un punto fijo por eje (dato editorial, justificado) | Lo que hoy rige en Uruguay |
| Mayoritario | Del mínimo al máximo de FA, PN y PC | Donde está la gran mayoría del sistema |
| Aceptable | Del mínimo al máximo de los partidos con bancas y de los legisladores de 2020–2030 | Se discute en el Parlamento |
| Radical | 15 puntos más allá de "Aceptable" a cada lado | Existe en el debate, sin representación |
| Impensable hoy | El resto | Fuera del debate público actual |

**Corrección por voto popular**: una propuesta que sacó más del 30 % en un plebiscito o referéndum nacional se considera al menos *Aceptable*, aunque ningún partido grande la defienda (ej.: eliminar las AFAP en 2024).

Ventaja: cuando cambie el Parlamento, se actualizan los vectores y la ventana se mueve sola.

### 4.9 Link compartible

`https://.../r?v=62-12-48-70-71-30-35-40-55-14-25-46`

Los 12 números redondeados en el orden de los ejes. Al abrir el link se reconstruye el resultado completo (las afinidades se recalculan). No se guarda nada en ningún servidor.

---

## 5. Datos

Todo en archivos JSON dentro del proyecto. Ejemplos de forma:

```json
// ejes.json
{ "id": "poder", "nombre": "Poder", "poloA": "Seguridad", "poloB": "Libertad",
  "descripcion": "...", "vigente": 50 }

// afirmaciones.json
{ "id": "pod_u2", "eje": "poder", "polo": "A", "tipo": "uruguaya", "rapido": true,
  "texto": "La Policía debería poder hacer allanamientos de noche...",
  "ayuda": "En 2019 y 2024 se plebiscitó habilitar los allanamientos nocturnos; las dos veces no alcanzó la mayoría." }

// dilemas.json
{ "id": "memoria", "texto": "¿Cómo debería recordar el país los años 1968-1985?",
  "opciones": [ { "id": "A", "texto": "...", "efectos": { "representacion": 5, "poder": 55 } } ] }

// perfiles.json  (partidos, referentes e ideologías en un mismo formato)
{ "id": "partido-colorado", "tipo": "partido", "nombre": "Partido Colorado",
  "region": "centroderecha", "bancasDiputados": 17,
  "vector": { "estructura": 65, "representacion": 15, "...": 0 },
  "fuentes": ["https://..."], "estado": "estimado" }
```

`estado` puede ser `estimado` (hipótesis inicial) o `auditado` (pasó por el método de la sección 6). La interfaz muestra "ubicación estimada" mientras no esté auditado.

---

## 6. Cómo se ubica a cada partido y referente

El punto débil de cualquier test así es dónde se pone a cada persona. Método propuesto:

1. **Responder las 120 afirmaciones y los 5 dilemas como lo haría ese perfil**, con base en hechos verificables: votos en el Parlamento, leyes que impulsó o vetó, programas de gobierno, declaraciones públicas. Si no hay evidencia, se responde *Neutral*.
2. Anotar una **fuente por eje** como mínimo.
3. Para figuras históricas, responder **por su época** (Batlle y Ordóñez en 1910, no "qué pensaría hoy").
4. **Dos personas** lo hacen por separado. Si en un eje difieren en más de 20 puntos, se discute y se documenta la decisión.
5. El vector sale del mismo cálculo que el de un usuario. Así un referente "hizo el test", igual que vos.

Reglas de neutralidad:
- Tantos referentes de un lado como del otro en cada eje.
- En los ejes donde hay posiciones fuera de la ventana, mostrar ejemplos de los dos lados cuando existan (ej.: golpe de 1973 y vía armada del MLN en Representación).
- Personas vivas: solo posiciones públicas documentadas, nunca suposiciones. Texto descriptivo, sin adjetivos.

---

## 7. Validación (piloto)

Antes de publicar:

1. Pasar el test a 30–50 personas de distintos partidos y edades.
2. Descartar o reescribir afirmaciones donde **casi todos responden lo mismo** (no discriminan). Candidata conocida: `rel_f3` ("Se puede ser ético sin creer en Dios"), que en Uruguay probablemente tenga acuerdo casi unánime.
3. Revisar que cada afirmación **se correlacione con el resto de su eje**. Las que van "al revés" están mal redactadas o en el eje equivocado.
4. Chequear que votantes del FA, del PN y del PC queden, en promedio, donde se espera en el compás. Si no, el problema suele estar en las preguntas, no en la gente.
5. Leer las afirmaciones en voz alta con alguien de cada lado y preguntar: "¿te parece que esta frase está escrita para que conteste algo en particular?".

---

## 8. Stack propuesto

| Capa | Elección | Por qué |
|---|---|---|
| Frontend | React + Vite (JavaScript) | Es lo que ya usás; sin backend |
| Datos | JSON en el repo | Cambian solo por commit, igual que en el original |
| Estado | `useState` + Context para las respuestas | Alcanza |
| Gráficos | SVG a mano (barras y compás) | Son formas simples; no hace falta librería |
| Tarjeta PNG (fase 2) | `canvas` del navegador | Sin dependencias |
| Deploy | GitHub Pages o Vercel (gratis) | Sitio estático |
| Tests | Vitest para el cálculo | La fórmula es lo único crítico |

Estructura sugerida:

```
src/
  data/        ejes.json, afirmaciones.json, dilemas.json, perfiles.json
  logic/       puntaje.js, afinidad.js, compas.js, overton.js
  pages/       Inicio, Formato, Pregunta, Dilema, Resultado
  components/  BarraEje, Compas, TarjetaPerfil
```

---

## 9. Fases

| Fase | Contenido |
|---|---|
| **1. MVP** | 12 ejes, 120 afirmaciones, 5 dilemas, formatos Rápido y Completo, barras con ventana de Overton y referentes, compás uruguayo, afinidad con los 6 partidos y los 59 referentes, link compartible, nota metodológica |
| **2. Completo** | Revisión humana de la auditoría de partidos y referentes (hecha en borrador), auditoría de las ideologías, ~22 ideologías, tarjeta PNG, explicación ("ayuda") en cada afirmación |
| **3. Extras** | Ventana de Overton histórica (cómo se movió desde 1985), países cercanos, comparar dos resultados |

---

## 10. Nota metodológica (texto para la app)

> Ejes Orientales es una herramienta para explorar ideas, no un instrumento científico. Un porcentaje alto de afinidad significa que tus respuestas se parecen a un perfil, no que pertenezcas a un partido o debas votarlo. Las ubicaciones de partidos y referentes son estimaciones basadas en votos, leyes y declaraciones públicas, con sus fuentes. Las preguntas, inevitablemente, llevan la mirada de quien las escribió: si ves una que te parece sesgada, avisanos.
