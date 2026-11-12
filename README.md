# uy12ejes

**Test político de 12 ejes pensado para Uruguay.** Respondés afirmaciones sobre principios y sobre debates uruguayos concretos, y el test te ubica en 12 ejes, en un compás político y frente a la ventana de Overton del país. Además te dice qué partidos, referentes e ideologías piensan más parecido a vos.

Es anónimo, gratis y no pide registro. Todo se calcula en tu navegador: tus respuestas no se mandan a ningún servidor.

## Qué hace

- **Dos formatos.** Rápido (48 afirmaciones, unos 6 minutos) o completo (120, unos 15 minutos), más 8 dilemas de opción múltiple con escenarios uruguayos.
- **12 ejes medidos por separado.** No promedia: podés estar en un extremo en un eje y en el centro en otro.
- **Compás uruguayo.** Tu posición junto a los partidos con bancas y el centro político del país, calculado con el peso de cada partido en Diputados.
- **Ventana de Overton por eje.** Muestra qué posiciones son mayoritarias, aceptables, radicales o impensables hoy en Uruguay.
- **Afinidades.** Ranking de 6 partidos, 59 referentes (actuales e históricos) y 22 ideologías, con los ejes en los que coincidís y en los que no.
- **Para compartir.** Un enlace con tu resultado y una tarjeta en imagen lista para redes.

## Los 12 ejes

| Eje | Polos |
|---|---|
| Territorio | Descentralización / Centralismo |
| Representación | Democracia / Autocracia |
| Poder | Seguridad / Libertad |
| Inmigración | Asimilación / Pluralismo |
| Diplomacia | Defensa fuerte / Pacifismo |
| Intervención | Neutralidad / Afirmación nacional |
| Economía | Público / Privado |
| Control | Planificación / Mercado |
| Comercio | Protección / Apertura |
| Religión | Laicidad estricta / Estado confesional |
| Moral | Progresismo / Tradicionalismo |
| Tecnología | Tecnología / Naturaleza |

## Cómo se ubica a partidos y referentes

Cada partido, referente e ideología "responde" el mismo test, a partir de sus votos, programas y declaraciones públicas, y su posición se calcula con la misma lógica que la de cualquier usuario. Las figuras históricas se ubican por las posiciones de su época y solo en los ejes donde tenían una postura. Las respuestas de cada perfil, con sus fuentes, están en `app/auditoria/`.

Las ubicaciones son un **borrador en revisión**. Si ves un error, abrí un issue.

## Tecnología

- React 18, Vite y React Router.
- Sin backend ni base de datos: es un sitio estático, desplegado en Vercel.
- `html-to-image` para generar la tarjeta del resultado.
- Vitest para los tests de la lógica de cálculo.

## Desarrollo

```bash
cd app
npm install
npm run dev
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm test` | Tests del cálculo, la afinidad, el compás, la ventana de Overton y el enlace |
| `npm run build` | Genera `app/dist/` para publicar |

Más detalle sobre la estructura del código y los scripts de auditoría en [app/README.md](app/README.md).

## Documentación

- [DISENO.md](DISENO.md): qué hace la app, cómo calcula y por qué.
- [EJES-Y-PREGUNTAS.md](EJES-Y-PREGUNTAS.md): los 12 ejes, las 120 afirmaciones y los 8 dilemas.
- [OVERTON-Y-REFERENTES.md](OVERTON-Y-REFERENTES.md): la ventana de Overton uruguaya, los partidos, los referentes y la auditoría de cada perfil.

## Créditos

Las fotos y logos se listan con su autor y licencia en la página `/creditos` del sitio. Inspirado en tests multieje como 12 Axes y Political Compass; no usa su código, sus preguntas ni sus datos.

uy12ejes es una herramienta para explorar ideas, no un instrumento científico. Una afinidad alta significa que tus respuestas se parecen a un perfil, no que pertenezcas a un partido o debas votarlo.
