# uy12ejes (MVP)

Test político de 12 ejes calibrado para Uruguay. Sitio estático: todo se calcula en el navegador, sin backend ni base de datos.

## Uso

```bash
npm install
npm run dev
```

- `npm test`: tests del cálculo, la afinidad, el compás, la ventana de Overton y el enlace.
- `npm run build`: genera `dist/`, que se puede subir tal cual a GitHub Pages, Vercel o Netlify.

## Estructura

| Carpeta | Contenido |
|---|---|
| `src/data/` | `ejes.json`, `afirmaciones.json` (120), `dilemas.json` (8), `perfiles.json` (6 partidos, 59 referentes, 22 ideologías), `fotos.json` (créditos de imágenes) |
| `src/logic/` | `calculo.js` (posiciones, intensidad, afinidad), `compas.js` (compás, regiones, etiqueta, centro uruguayo), `overton.js` (ventana por eje), `enlace.js` (resultado en la URL) |
| `src/components/` | Pantallas: `Inicio`, `Pregunta`, `Dilema`, `Resultado`, `Creditos`, los gráficos `BarraEje` y `Compas`, y `TarjetaResultado` y `Foto` |

## Datos

Las reglas y la justificación de cada dato están en los documentos de diseño de la carpeta de arriba (`DISENO.md`, `EJES-Y-PREGUNTAS.md`, `OVERTON-Y-REFERENTES.md`).

Todos los vectores de `perfiles.json` tienen `"estado": "estimado"`. Para auditar uno, se responden las 120 afirmaciones como lo haría ese perfil (con fuentes), se calcula su vector con la misma lógica que la de un usuario y se cambia el estado a `"auditado"`.

Para cambiar el Parlamento: editar los vectores y `bancas` de los partidos. La ventana de Overton y el centro uruguayo se recalculan solos.

## Auditoría

- `node scripts/auditar.mjs auditoria/partidos.json`: valida las respuestas de una auditoría y muestra el vector anterior y el nuevo de cada perfil.
- Con `--guardar` escribe los vectores en `src/data/perfiles.json` con estado `auditado-borrador`.
- `node scripts/resumen.mjs`: muestra dónde cae cada partido en el compás, el centro uruguayo y la ventana de Overton de cada eje.
- `node scripts/preguntas.mjs ../EJES-Y-PREGUNTAS.md src/data/afirmaciones.json`: regenera las afirmaciones desde el documento (incluye escalones y pesos de la columna Contexto).
