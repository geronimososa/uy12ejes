# uy12ejes: ventana de Overton y referentes

Complemento de [DISENO.md](DISENO.md) y [EJES-Y-PREGUNTAS.md](EJES-Y-PREGUNTAS.md). Escala de cada eje: **0 = polo A, 100 = polo B**.

> **Todos los números de este archivo son estimaciones iniciales**, hechas a partir de votos, leyes, programas y declaraciones públicas. Sirven para arrancar y para probar la app. Antes de publicar, cada partido y referente tiene que pasar por el método de [DISENO.md §6](DISENO.md#6-cómo-se-ubica-a-cada-partido-y-referente) (responder las 120 afirmaciones con fuentes, dos personas por separado).

---

## 1. La ventana de Overton en esta app

La ventana de Overton es el rango de ideas que en un momento dado se pueden defender en público sin quedar afuera del debate. Se adaptan sus seis niveles clásicos así:

| Nivel clásico | En la app | Cómo se calcula |
|---|---|---|
| Política vigente | **Política vigente** | Un punto por eje: lo que hoy rige en Uruguay |
| Popular | **Mayoritario** | Rango entre FA, PN y PC (más del 90 % de las bancas) |
| Sensato / Aceptable | **Aceptable** | Rango entre todos los partidos con bancas y los legisladores de 2020–2030 marcados en el catálogo (Dastugue, Manini Ríos, Lust, Zubía, Salle, da Silva, Bianchi, Ojeda, Andrade, Civila, Sánchez): el promedio de un partido esconde a sus legisladores más alejados. |
| Radical | **Radical** | 15 puntos más allá de "Aceptable" a cada lado |
| Impensable | **Impensable hoy** | El resto de la barra |

"Radical" no es un insulto: describe ideas que existen en el debate pero no tienen representación parlamentaria.

**Sin márgenes.** Mientras los vectores de los partidos eran estimaciones a mano, hizo falta sumarles márgenes porque los votantes reales quedaban más extremos que su propio partido. Con los partidos auditados (sección 7), partidos y votantes se miden con la misma regla y los márgenes se quitaron. Los polos Democracia (Representación) y Laicidad estricta (Religión) nunca cuentan como radicales: son tradición constitucional uruguaya.

**Corrección por voto popular.** Si una propuesta sacó más del 30 % en un plebiscito o referéndum nacional, su zona se considera al menos *Aceptable*, aunque ningún partido grande la haya defendido. Ejemplos: eliminar las AFAP (plebiscito 2024, cerca del 40 %), allanamientos nocturnos (2019 y 2024), bajar la edad de imputabilidad (2014, cerca del 47 %).

Lo que ve el usuario en cada barra:

```
 Seguridad                                                     Libertad
 |··········|░░░░░░░░░▒▒▒▒▒▒▓▓▓▓▓▓▓▓▲▓▓▒▒▒▒▒▒▒░░░░░░░░░|··········|
 0                         Mayoritario                           100
           Radical   Aceptable          ● vos        Aceptable  Radical
                                ▲ política vigente
   Larrañaga ▾                          Mujica ▾          J. Batlle ▾
```

Y un mensaje: *"En Poder estás dentro de la zona mayoritaria"*, o *"En Religión estás en la zona radical: hoy ningún partido con bancas propone esto"*.

---

## 2. Perfiles estimados de los partidos (legislatura 2025–2030)

Bancas en Diputados: FA 48 · PN 29 · PC 17 · CA 2 · IS 2 · PI 1 (total 99).

| Eje (0 = A · 100 = B) | FA | PN | PC | CA | PI | IS | **Vigente** |
|---|---:|---:|---:|---:|---:|---:|---:|
| Territorio (Descentr. · Central.) | 55 | 60 | 65 | 70 | 55 | 40 | **65** |
| Representación (Democr. · Autocr.) | 10 | 15 | 15 | 20 | 10 | 20 | **12** |
| Poder (Seguridad · Libertad) | 55 | 40 | 45 | 25 | 50 | 70 | **50** |
| Inmigración (Asimil. · Pluralismo) | 72 | 55 | 58 | 40 | 62 | 40 | **65** |
| Diplomacia (Defensa · Pacifismo) | 72 | 50 | 52 | 25 | 60 | 55 | **70** |
| Intervención (Neutral. · Afirmación) | 30 | 50 | 45 | 70 | 40 | 75 | **35** |
| Economía (Público · Privado) | 28 | 60 | 62 | 45 | 50 | 35 | **38** |
| Control (Planif. · Mercado) | 32 | 62 | 65 | 45 | 52 | 40 | **45** |
| Comercio (Protección · Apertura) | 50 | 72 | 75 | 45 | 65 | 15 | **60** |
| Religión (Laicidad · Religiosidad) | 15 | 35 | 22 | 45 | 25 | 40 | **15** |
| Moral (Progresismo · Tradición) | 22 | 55 | 42 | 75 | 40 | 60 | **25** |
| Tecnología (Tecnología · Naturaleza) | 50 | 40 | 35 | 40 | 45 | 75 | **45** |

FA: Frente Amplio · PN: Partido Nacional · PC: Partido Colorado · CA: Cabildo Abierto · PI: Partido Independiente · IS: Identidad Soberana.

Notas de calibración:
- **El FA es una coalición amplia** (del PCU al socialismo moderado): su vector es el promedio. Si hace falta más detalle, en fase 2 se pueden agregar sectores (MPP, PCU, PS, Seregnistas) como perfiles aparte.
- **Cabildo Abierto** queda en 45 en Economía y Control: un estatismo moderado. Su discurso pide un "Estado presente" (endeudamiento, usura, producción nacional), pero en la coalición votó la LUC y la regla fiscal, pero es el más marcado en Moral, Diplomacia y Poder hacia la seguridad. **Se define artiguista**: la ficha lo dice y la app muestra su afinidad con el perfil Artiguismo (§6), en vez de ponerle la etiqueta a mano. Su valor de Territorio (70) es la estimación más floja de la tabla y la que más pesa en esa afinidad: auditarla primero.
- **Identidad Soberana**: económicamente cae a la izquierda del centro (Economía 35, Control 40: crítica a bancos, multinacionales y al contrato con UPM), y su rasgo más fuerte es el soberanismo (Comercio 15, Intervención 75). Lo combina con un discurso constitucionalista, el rechazo a los mandatos sanitarios (Poder 70), a la "Agenda 2030" (Moral 60) y a la celulosa (Tecnología 75). Por eso hay quienes lo llaman "ultraderecha" y quienes lo ven como izquierda nacional: el vector muestra las dos cosas a la vez, que es justo para lo que sirven 12 ejes.

---

## 3. La ventana por eje

Rangos calculados solo con la tabla de partidos (más la corrección por voto popular). La app además suma a los legisladores de 2020–2030, así que en varios ejes la zona aceptable es más ancha que acá; por ejemplo, en Religión llega de 5 a 72.

| Eje | Vigente | Mayoritario | Aceptable | Radical hacia A (ejemplos) | Radical hacia B (ejemplos) | Impensable hoy |
|---|---:|---|---|---|---|---|
| **Territorio** | 65 | 55–65 | 40–70 | 25–40: recaudar el IRPF por departamento, policías departamentales | 70–85: fusionar departamentos, eliminar las juntas departamentales | <25: autonomía legislativa o secesión · >85: intendentes designados por el gobierno nacional, como en la dictadura |
| **Representación** | 12 | 10–15 | 10–20 | 0–10: sorteo de cargos, revocatoria de mandatos, asambleas vinculantes | 20–35: gobernar con medidas de excepción prolongadas | >35: golpe de Estado, partido único, vía armada |
| **Poder** | 50 | 40–55 | 25–70 | 10–25: cadena perpetua sin revisión, prisión preventiva sin plazo | 70–85: legalizar todas las drogas | <10: pena de muerte (abolida en 1907) · >85: abolir la policía |
| **Inmigración** | 65 | 55–72 | 40–72 | 25–40: cupos anuales de inmigrantes | 72–87: residencia automática para cualquier persona que llegue | <25: cerrar fronteras, deportaciones masivas · >87: fronteras sin ningún registro |
| **Diplomacia** | 70 | 50–72 | 25–72 | 10–25: servicio militar obligatorio | 72–87: abolir las Fuerzas Armadas (modelo Costa Rica) | <10: armas nucleares, guerras ofensivas |
| **Intervención** | 35 | 30–50 | 30–75 | 15–30: salir de los organismos regionales para no tomar partido | 75–90: romper relaciones y apoyar sanciones fuertes contra gobiernos de la región | >90: enviar tropas para cambiar un gobierno |
| **Economía** | 38 | 28–62 | 20–62 (*) | 5–20: estatizar la banca privada | 62–77: privatizar UTE, ANCAP u OSE (rechazado en 1992 y 2003) | <5: estatizar toda la economía · >77: privatizar la salud y la educación públicas |
| **Control** | 45 | 32–65 | 32–65 | 17–32: control general de precios y del comercio exterior | 65–80: eliminar los Consejos de Salarios, dolarizar | <17: planificación central total · >80: eliminar el salario mínimo y casi todos los impuestos |
| **Comercio** | 60 | 50–75 | 15–75 | 0–15: prohibir importaciones que compitan con lo nacional | 75–90: salir del Mercosur para abrirse solo al mundo | >90: arancel cero unilateral para todo |
| **Religión** | 15 | 15–35 | 15–45 | 0–15: prohibir toda expresión religiosa en el espacio público | 45–60: enseñanza religiosa en escuelas públicas | >60: religión oficial del Estado |
| **Moral** | 25 | 22–55 | 22–75 | 7–22: eliminar el sexo registral de los documentos | 75–90: derogar el matrimonio igualitario | <7: abolir la familia como institución legal · >90: penalizar la homosexualidad |
| **Tecnología** | 45 | 35–50 | 35–75 | 20–35: energía nuclear, edición genética humana | 75–90: prohibir la forestación y los transgénicos | <20: tecnología sin ningún control ambiental · >90: volver a una economía rural sin industria |

(*) En Economía, "Aceptable" llega a 20 por la corrección de voto popular: el plebiscito de 2024 para eliminar las AFAP sacó cerca del 40 %.

### Lo que muestra la tabla

- **Ventanas angostas**: Representación (10–20) y Religión (15–45). El consenso democrático y laico es muy fuerte. Ahí quien se sale de la ventana lo nota enseguida.
- **Ventanas anchas**: Moral, Comercio y Poder. Ahí está el debate real.
- **Lo vigente no está en el medio**: en Moral y Religión la política vigente está pegada al borde progresista y laico de la ventana; en Territorio, en el borde centralista.
- **El centro uruguayo no es el centro "global"**: en Economía lo vigente (38) está del lado público. Alguien que en Estados Unidos sería de centroizquierda acá puede quedar en el centro.

### Cómo se movió la ventana (para la fase 3)

| Tema | Antes | Después |
|---|---|---|
| Aborto | Despenalizado en el Código Penal de 1934, vuelto a penalizar en 1938; ley vetada en 2008 | Ley de 2012 |
| Parejas del mismo sexo | Impensable en los 90 | Unión concubinaria (2007), matrimonio igualitario (2013) |
| Marihuana | Impensable en los 90 | Regulación legal (2013) |
| Eutanasia | Radical hasta los 2010 | Ley de 2025 |
| Pena de muerte | — | Abolida en 1907; impensable desde entonces |
| Seguridad | Ley de seguridad ciudadana (1995) | Baja de imputabilidad (2014, ~47 %), "Vivir sin miedo" (2019, ~47 %), LUC (2020), allanamientos (2024, ~40 %): la ventana se corrió hacia la seguridad |

---

## 4. Referentes por eje

Para cada eje, quién ocupa cada punto. Criterios: hechos verificables, figuras actuales e históricas, los dos lados representados cuando existen. Las históricas se ubican **por su época**.

### 1. Territorio · Descentralización ↔ Centralismo

| Posición | Referente | Por qué |
|---|---|---|
| Muy hacia A | José Artigas | Las Instrucciones del Año XIII proponían una confederación de provincias autónomas |
| Hacia A | Aparicio Saravia · Congreso de Intendentes | Saravia encabezó las revoluciones blancas de 1897 y 1904 contra el centralismo colorado; el Congreso de Intendentes reclama más recursos y competencias para los departamentos |
| Vigente | Reforma constitucional de 1996 y ley de descentralización de 2009 | Separó las elecciones departamentales y creó el tercer nivel de gobierno, dentro de un Estado unitario |
| Hacia B | José Batlle y Ordóñez | Construyó un Estado moderno desde Montevideo; tras la guerra de 1904 terminó el reparto de departamentos con el Partido Nacional |
| Muy hacia B | Dictadura (1973–1985) | Disolvió las juntas departamentales y designó a los intendentes |

### 2. Representación · Democracia ↔ Autocracia

| Posición | Referente | Por qué |
|---|---|---|
| Muy hacia A | Promotores de plebiscitos de los dos lados | Comisión Pro Referéndum contra la LUC (2022) y campaña "Vivir sin miedo" (2019): democracia directa desde la izquierda y desde la derecha |
| Hacia A | Wilson Ferreira Aldunate y Líber Seregni | Opositores a la dictadura; los dos estuvieron presos por ella |
| Vigente | Todo el sistema de partidos actual | Democracia representativa con democracia directa |
| Hacia B | Jorge Pacheco Areco (1967–1972) | Gobernó con medidas prontas de seguridad casi permanentes y clausuró diarios |
| Muy hacia B | Juan María Bordaberry y Gregorio Álvarez · MLN-Tupamaros (años 60–70) | Bordaberry dio el golpe de 1973 y en 1976 propuso eliminar los partidos; Álvarez gobernó de facto entre 1981 y 1985. Del otro lado, la vía armada del MLN contra gobiernos electos |

### 3. Poder · Seguridad ↔ Libertad

| Posición | Referente | Por qué |
|---|---|---|
| Muy hacia A | Jorge Larrañaga · Pedro Bordaberry | "Vivir sin miedo" (2019): allanamientos nocturnos, Guardia Nacional militar, cadena perpetua revisable. Bordaberry impulsó bajar la edad de imputabilidad (2014) |
| Hacia A | LUC (2020, gobierno de Lacalle Pou) | Aumentó penas y amplió la legítima defensa policial |
| Vigente | — | Conviven la LUC con la regulación de la marihuana y la eutanasia |
| Hacia B | José Mujica · Luis Lacalle Pou | Mujica impulsó la regulación legal de la marihuana (2013); Lacalle Pou eligió la "libertad responsable" en la pandemia, sin cuarentena obligatoria |
| Muy hacia B | Jorge Batlle | En 2000, siendo presidente, propuso debatir la legalización de las drogas |

### 4. Inmigración · Asimilación ↔ Pluralismo

| Posición | Referente | Por qué |
|---|---|---|
| Muy hacia A | Gabriel Terra (años 30) | Leyes migratorias restrictivas, como la llamada "ley de indeseables" de 1932 |
| Hacia A | Sin referente partidario claro | El tema casi no divide al sistema político actual |
| Vigente | Ley de Migración (2008) y residencia Mercosur (2014) | Reconoce la migración como derecho; trámites simplificados para la región |
| Hacia B | Ley de Refugiados (2006) | Marco amplio de protección y asilo |
| Muy hacia B | José Mujica | Recibió familias sirias refugiadas y a seis presos liberados de Guantánamo (2014) |

### 5. Diplomacia · Defensa fuerte ↔ Pacifismo

| Posición | Referente | Por qué |
|---|---|---|
| Muy hacia A | Doctrina de la Seguridad Nacional (dictadura) | Las Fuerzas Armadas como actor central del Estado |
| Hacia A | Guido Manini Ríos · Javier García | Manini, excomandante en jefe del Ejército, reivindica el papel de las Fuerzas Armadas; García, ministro de Defensa (2020–2025), impulsó la compra de patrulleros oceánicos |
| Vigente | Misiones de paz de la ONU | Uruguay es de los mayores aportantes por habitante (Congo, Haití) |
| Hacia B | Baltasar Brum | En 1920 propuso una Liga Americana para resolver conflictos por arbitraje |
| Muy hacia B | Propuestas de abolir el Ejército | Existen en el debate, sin representación parlamentaria |

### 6. Intervención · Neutralidad ↔ Afirmación nacional

| Posición | Referente | Por qué |
|---|---|---|
| Muy hacia A | Luis Alberto de Herrera · Carlos Quijano | Herrera defendió la neutralidad y rechazó las bases de EE. UU. (1940); Quijano, desde *Marcha*, el "tercerismo": ni EE. UU. ni la URSS |
| Hacia A | Tabaré Vázquez (2019) | Mecanismo de Montevideo junto a México: diálogo sin intervención ante la crisis de Venezuela |
| Vigente | Tradición de la Cancillería | Derecho internacional y multilateralismo |
| Hacia B | Luis Lacalle Pou | Críticas abiertas a Venezuela, Cuba y Nicaragua en cumbres regionales y presión para flexibilizar el Mercosur |
| Muy hacia B | Tabaré Vázquez (2006–2010) | Durante el conflicto por la planta de celulosa con Argentina; en 2011 contó que llegó a considerar la hipótesis de un conflicto armado |

Vázquez aparece en los dos lados a propósito: muestra que el eje mide posiciones, no personas fijas.

### 7. Economía · Público ↔ Privado

| Posición | Referente | Por qué |
|---|---|---|
| Muy hacia A | Unidad Popular · PIT-CNT (2024) | Programa de nacionalización de la banca y el comercio exterior; el PIT-CNT promovió el plebiscito para eliminar las AFAP |
| Hacia A | José Batlle y Ordóñez · Carolina Cosse | Batlle estatizó o creó el BROU, el BSE y las usinas eléctricas; Cosse defendió a ANTEL como empresa pública cuando la presidió |
| Vigente | Yamandú Orsi · Danilo Astori | Empresas públicas fuertes junto con grandes inversiones privadas |
| Hacia B | Luis Lacalle Pou | El borrador de la LUC proponía desmonopolizar los combustibles (se retiró) |
| Muy hacia B | Luis Alberto Lacalle Herrera | Impulsó la Ley de Empresas Públicas (1991), derogada en parte por referéndum en 1992 |

### 8. Control · Planificación ↔ Mercado

| Posición | Referente | Por qué |
|---|---|---|
| Muy hacia A | Unidad Popular | Control estatal de precios y del comercio exterior |
| Hacia A | Marcelo Abdala (PIT-CNT) · Óscar Andrade (PCU) | Impuesto al 1 % más rico (2025), defensa de los Consejos de Salarios |
| Vigente | Danilo Astori · Gabriel Oddone | Consejos de Salarios, metas de inflación y reforma tributaria con IRPF (2007) |
| Hacia B | Ernesto Talvi · Luis Lacalle Pou | Talvi, economista liberal; Lacalle Pou incorporó la regla fiscal (2020) |
| Muy hacia B | Jorge Batlle · Gabriel Gurméndez | Batlle, el presidente más liberal en lo económico desde 1985; Gurméndez, heredero de esa línea en la Lista 15 |

### 9. Comercio · Protección ↔ Apertura

| Posición | Referente | Por qué |
|---|---|---|
| Muy hacia A | Luis Batlle Berres · Gustavo Salle | Batlle Berres, industrialización protegida (1947–1951); Salle, rechazo a las multinacionales y a la "agenda globalista" |
| Hacia A | PIT-CNT | Se opuso al TLC con EE. UU. (2006) y a un TLC con China |
| Vigente | Gobierno de Orsi | Inserción a través del Mercosur, incluido el acuerdo con la Unión Europea |
| Hacia B | Danilo Astori | Impulsó un TLC con EE. UU. en 2006, que no prosperó |
| Muy hacia B | Jorge Batlle · Luis Lacalle Pou | Batlle buscó un TLC con EE. UU.; Lacalle Pou, TLC con China y pedido de ingreso al CPTPP (2022) |

### 10. Religión · Laicidad ↔ Religiosidad

| Posición | Referente | Por qué |
|---|---|---|
| Muy hacia A | José Batlle y Ordóñez | Retiró los crucifijos de los hospitales (1906); el batllismo impulsó la separación Iglesia-Estado (1918) y la secularización de los feriados (1919) |
| Vigente | Constitución de 1918 | Estado sin religión oficial; hoy, consenso laico de la mayoría de los partidos |
| Hacia B | Partido Demócrata Cristiano · cardenal Daniel Sturla | El PDC (dentro del FA) es una tradición de fe al servicio de la justicia social; Sturla defendió más presencia pública de la fe (por ejemplo, la estatua de la Virgen en 2017) |
| Muy hacia B | Legisladores evangélicos (Álvaro Dastugue, Gerardo Amarilla) | Diputados del Partido Nacional que fundamentan su acción política en su fe |

(El lado "Hacia A" no tiene una figura propia porque la política vigente ya está ahí.)

### 11. Moral · Progresismo ↔ Tradicionalismo

| Posición | Referente | Por qué |
|---|---|---|
| Muy hacia A | Colectivo Ovejas Negras | Impulsó el matrimonio igualitario (2013) y la ley integral trans (2018) |
| Hacia A | José Mujica · José Batlle y Ordóñez | Mujica promulgó la ley de aborto (2012) y el matrimonio igualitario (2013); Batlle, el divorcio por sola voluntad de la mujer (1913), en su época |
| Vigente | Agenda de derechos 2012–2025 | Leyes vigentes |
| Hacia B | Tabaré Vázquez · Luis Lacalle Pou | Vázquez vetó la despenalización del aborto (2008); Lacalle Pou votó en contra de la ley de aborto pero no promovió derogarla |
| Muy hacia B | Carlos Iafigliola · Guido Manini Ríos | Iafigliola encabezó el pre-referéndum contra la ley trans (2019); Manini critica la "ideología de género" |

### 12. Tecnología · Tecnología ↔ Naturaleza

| Posición | Referente | Por qué |
|---|---|---|
| Muy hacia A | José Mujica | Impulsó la megaminería de hierro (Aratirí) y la ley de minería de gran porte (2013) |
| Hacia A | Tabaré Vázquez | Plan Ceibal (2007) y el acuerdo por la segunda planta de UPM (2017) |
| Vigente | Ramón Méndez | Director Nacional de Energía (2008–2015): transición a una electricidad casi totalmente renovable |
| Hacia B | PERI (César Vega) · Eduardo Lust | El PERI tuvo un diputado en 2020–2025; Lust fundó el Partido Constitucional Ambientalista (2023) |
| Muy hacia B | Gustavo Salle · movimiento contra la megaminería | Rechazo a la celulosa y a la vacunación obligatoria contra el covid; movilización contra Aratirí |

---

## 5. El compás uruguayo

### Fórmula y regiones

```
X = promedio(Economía, Control)                    0 = izquierda, 100 = derecha
Y = promedio(Representación, 100 − Poder)          0 = libertario, 100 = autoritario
```

| Región | Y (autoritarismo) | X |
|---|---|---|
| Izquierda autoritaria | 60 o más | menos de 40 |
| Autoritarismo de centro | 60 o más | 40 a 60 |
| Derecha autoritaria | 60 o más | más de 60 |
| Izquierda socialista | 10 a 60 | menos de 12 |
| Izquierda | 10 a 60 | 12 a 30 |
| Centroizquierda | 10 a 60 | 30 a 42 |
| Centro | 10 a 60 | 42 a 58 |
| Centroderecha | 10 a 60 | 58 a 70 |
| Derecha | 10 a 60 | 70 a 88 |
| Derecha liberal | 10 a 60 | 88 o más |
| Izquierda libertaria / anarquismo | menos de 10 | menos de 40 |
| Liberalismo de centro | menos de 10 | 40 a 60 |
| Libertarismo | menos de 10 | más de 60 |

La etiqueta final suma un adjetivo:

1. Si Moral es menor a 35 → "progresista"; si es mayor a 65 → "conservador".
2. Si no, el eje más alejado del centro, siempre que esté a 30 puntos o más: "laico", "proteccionista", "pacifista", etc. No cuentan Representación (en Uruguay casi siempre está cerca de 0) ni Economía, Control y Poder (ya definen la región en el compás).
3. Si ninguno cumple, solo la región.

Ejemplos: "Izquierda progresista", "Centro conservador", "Centroizquierda proteccionista", "Centroderecha".

### Dónde caen los partidos (con los vectores estimados)

| Partido | X | Y | Región | Etiqueta |
|---|---:|---:|---|---|
| Frente Amplio | 30 | 28 | Izquierda | Izquierda progresista |
| Identidad Soberana | 38 | 25 | Centroizquierda | Centroizquierda proteccionista |
| Partido Independiente | 51 | 30 | Centro | Centro |
| Cabildo Abierto | 45 | 48 | Centro (al borde de la centroizquierda) | Centro conservador |
| Partido Nacional | 61 | 38 | Centroderecha | Centroderecha |
| Partido Colorado | 64 | 35 | Centroderecha | Centroderecha |
| **Centro uruguayo** (ponderado por bancas) | **45** | **32** | Centro | — |

En el compás se sombrea la **ventana de Overton** como el polígono que encierra a los seis partidos (con 5 puntos de margen) y, más oscuro, el triángulo FA–PN–PC (zona mayoritaria).

### Referentes por región del compás

| Región | Referentes (ubicación estimada) |
|---|---|
| Izquierda autoritaria | MLN-Tupamaros en su etapa armada (años 60–70), Raúl Sendic |
| Izquierda socialista | Unidad Popular (Gonzalo Abella, Eduardo Rubio), Rodney Arismendi |
| Izquierda | José Mujica, Lucía Topolansky, Carolina Cosse, Óscar Andrade, Marcelo Abdala, Constanza Moreira, Gonzalo Civila, Fernando Pereira, Emilio Frugoni, Zelmar Michelini, Eduardo Galeano |
| Centroizquierda | Yamandú Orsi, Danilo Astori, Mario Bergara, Daniel Martínez, Alejandro Sánchez, Líber Seregni, Tabaré Vázquez, José Batlle y Ordóñez (en su época), Gustavo Salle (Identidad Soberana: "Centroizquierda proteccionista") |
| Centro | Partido Independiente (Pablo Mieres), Álvaro Delgado, Beatriz Argimón, Nicolás Olivera |
| Centro conservador | Guido Manini Ríos (Cabildo Abierto) |
| Centroderecha | Luis Lacalle Pou, Julio María Sanguinetti, Andrés Ojeda, Javier García, Laura Raffo, Azucena Arbeleche |
| Derecha | Luis Alberto Lacalle Herrera, Pedro Bordaberry, Jorge Larrañaga, Ernesto Talvi, Sebastián da Silva, Graciela Bianchi, Gustavo Zubía |
| Libertarismo / liberalismo económico | Jorge Batlle, Gabriel Gurméndez |
| Derecha autoritaria | Gabriel Terra (1933–1938), Juan María Bordaberry (1973–1976), Gregorio Álvarez (1981–1985) |
| Izquierda libertaria / anarquismo | Federación Anarquista Uruguaya (FAU) |
| Corriente transversal: soberanismo constitucionalista | Gustavo Salle y Eduardo Lust. No es una región del compás: es un rasgo que cruza ejes (Intervención y Comercio soberanistas, apelación a la Constitución frente a contratos y tratados). Salle cae en la centroizquierda económica; Lust, ex Cabildo Abierto, apoyó a la coalición en el balotaje de 2024, así que probablemente caiga más a la derecha. Ubicarlo con la auditoría |

---

## 6. Catálogo inicial de perfiles

### Referentes (59)

**Históricos (20)**: José Artigas, Aparicio Saravia, José Batlle y Ordóñez, Emilio Frugoni, Luis Alberto de Herrera, Baltasar Brum, Gabriel Terra, Luis Batlle Berres, Carlos Quijano, Rodney Arismendi, Raúl Sendic (fundador del MLN), Zelmar Michelini, Eduardo Galeano, Jorge Pacheco Areco, Juan María Bordaberry, Gregorio Álvarez, Wilson Ferreira Aldunate, Líber Seregni, MLN-Tupamaros (años 60–70), Federación Anarquista Uruguaya.

**Contemporáneos (39)**:

- Izquierda y centroizquierda (17): Tabaré Vázquez, José Mujica, Lucía Topolansky, Danilo Astori, Yamandú Orsi, Carolina Cosse, Gabriel Oddone, Mario Bergara, Daniel Martínez, Alejandro Sánchez, Fernando Pereira, Gonzalo Abella, Óscar Andrade (Partido Comunista), Marcelo Abdala (PIT-CNT), Constanza Moreira, Gonzalo Civila (Partido Socialista), Gustavo Salle.
- Centro, centroderecha y derecha (22): Julio María Sanguinetti, Luis Alberto Lacalle Herrera, Jorge Batlle, Jorge Larrañaga, Pedro Bordaberry, Luis Lacalle Pou, Beatriz Argimón, Álvaro Delgado, Nicolás Olivera, Laura Raffo, Azucena Arbeleche, Andrés Ojeda, Ernesto Talvi, Gabriel Gurméndez, Javier García, Sebastián da Silva, Graciela Bianchi, Gustavo Zubía, Pablo Mieres, Guido Manini Ríos, Eduardo Lust, Álvaro Dastugue.

Quedan 17 contemporáneos de izquierda contra 22 del centro a la derecha; la izquierda se compensa con los históricos (Frugoni, Arismendi, Sendic, Michelini, Galeano, Quijano, Seregni).

Notas sobre los agregados:
- **Beatriz Argimón**: vicepresidenta (2020–2025), la primera mujer en el cargo; referente de la agenda de género dentro del Partido Nacional. Centro, como Delgado.
- **Nicolás Olivera**: intendente de Paysandú por el Partido Nacional (2020–2025), con posiciones que a veces coinciden con las del FA. Centro.
- **Laura Raffo**: economista, candidata de la coalición a la Intendencia de Montevideo (2020) y precandidata blanca (2024). Centroderecha.
- **Azucena Arbeleche**: ministra de Economía (2020–2025). Se reconoce en Keynes: al pedirle que se definiera, respondió con una cita suya. Su gestión, en cambio, fue más ortodoxa: regla fiscal, baja del déficit y gasto acotado en la pandemia (Fondo Coronavirus). El vector promedia las dos cosas (Control 50) y la deja en el límite entre Centro y Centroderecha. En la auditoría, anotar por separado discurso y gestión.

Gabriel Gurméndez reemplaza a Ramón Díaz: es más conocido hoy y representa la línea liberal de Jorge Batlle en la Lista 15 (presidió ANTEL bajo Batlle en 2002 y fue precandidato presidencial colorado en 2024). Con el cambio, el polo "Mercado" pierde su referente más extremo; si en la auditoría Gurméndez queda en la centroderecha, el extremo libertario lo cubre solo Jorge Batlle.

Eduardo Lust: diputado por Cabildo Abierto (2020–2025), dejó el partido en 2023 y fundó el Partido Constitucional Ambientalista, con el que fue candidato presidencial en 2024 (unos 14.000 votos, sin bancas). Va como referente y no como partido, porque la tabla de partidos solo incluye a los que tienen bancas.

El MVP incluye a los 59.

### Ideologías (22)

Se escriben las definiciones propias, cortas, y se ubican con el mismo método.

- **Tradiciones uruguayas (8)**: Artiguismo, Batllismo, Neobatllismo, Herrerismo, Wilsonismo, Tercerismo, Tupamarismo (etapa armada), Seregnismo.
- **Universales (14)**: Comunismo, Socialismo democrático, Socialdemocracia, Progresismo, Ecologismo, Democracia cristiana, Liberalismo social, Liberalismo clásico, Libertarismo, Conservadurismo liberal, Conservadurismo social, Soberanismo constitucionalista, Anarquismo, Autoritarismo militar.

### Perfil "Artiguismo" (estimado)

Ideario de la Liga Federal (1813–1820), leído por su época: Instrucciones del Año XIII (confederación, soberanía de los pueblos, "libertad civil y religiosa en toda su extensión imaginable"), Reglamento de tierras de 1815 ("los más infelices serán los más privilegiados") y aranceles de 1815 para proteger la producción local.

| Estr. | Repr. | Poder | Inm. | Dipl. | Interv. | Econ. | Control | Comer. | Relig. | Moral | Tecn. |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 10 | 15 | 45 | 40 | 30 | 70 | 30 | 35 | 30 | 30 | 50 | 60 |

En el compás cae en X 33, Y 35: **izquierda**, por el reparto de tierras.

Afinidad de cada partido con el Artiguismo (fórmula de [DISENO.md §4.5](DISENO.md#45-afinidad-con-un-perfil), vectores estimados):

| Partido | Afinidad | Dónde se aleja más |
|---|---:|---|
| Identidad Soberana | ~75 % | Territorio, Poder |
| Cabildo Abierto | ~66 % (~73 % si su Territorio bajara a 45) | Territorio, Moral, Poder |
| Partido Independiente | ~60 % | Territorio, Comercio |
| Partido Nacional | ~58 % | Comercio, Territorio |
| Frente Amplio | ~55 % | Diplomacia, Intervención, Territorio |
| Partido Colorado | ~53 % | Comercio, Territorio |

Que todos estén entre 53 % y 75 % confirma lo esperable: casi todo el sistema reivindica alguna parte de Artigas. En la página del perfil conviene mostrar **qué partes toma cada uno**, no un ganador.

---

## 7. Auditoría de los partidos (borrador, noviembre 2026)

Los 6 partidos se auditaron respondiendo las 120 afirmaciones y los 5 dilemas como lo haría la posición mayoritaria de cada uno, con una nota por eje sobre programa, votos y acción de gobierno. Las respuestas y las notas están en `app/auditoria/partidos.json`; el vector se calcula con `node scripts/auditar.mjs auditoria/partidos.json --guardar`, el mismo cálculo que el de un usuario. **Estos valores reemplazan a la tabla de la sección 2**, que queda como estimación inicial. Falta la revisión de una segunda persona.

| Eje | FA | PN | PC | CA | IS | PI |
|---|---:|---:|---:|---:|---:|---:|
| Territorio | 63 | 45 | 69 | 68 | 31 | 55 |
| Representación | 3 | 15 | 18 | 30 | 9 | 9 |
| Poder | 79 | 42 | 53 | 25 | 61 | 53 |
| Inmigración | 75 | 48 | 58 | 28 | 30 | 68 |
| Diplomacia | 70 | 40 | 40 | 18 | 45 | 60 |
| Intervención | 28 | 65 | 68 | 60 | 43 | 62 |
| Economía | 25 | 68 | 70 | 45 | 30 | 50 |
| Control | 37 | 68 | 69 | 45 | 33 | 55 |
| Comercio | 46 | 73 | 79 | 22 | 4 | 69 |
| Religión | 17 | 48 | 20 | 66 | 57 | 38 |
| Moral | 17 | 63 | 44 | 90 | 81 | 33 |
| Tecnología | 52 | 27 | 18 | 42 | 95 | 41 |

En el compás, con la calibración final (escalones unipolares, peso 0,5 en golpe y juicios, franjas parejas): FA (X 29 · Y 14,5) **Izquierda**; IS (31,5 · 24,5) **Centroizquierda**; CA (43 · 52) **Centro**; PI (48 · 30) **Centro**; PN (63 · 37) **Centroderecha**; PC (65 · 32,5) **Centroderecha**. Centro uruguayo: X 46, Y 25.

**Franjas parejas.** El centro va de 42 a 58 y cada franja siguiente mide 12 puntos (centroizquierda y centroderecha) o 18 (izquierda y derecha). Las franjas anteriores eran angostas en el medio (10 puntos de centro) y mandaban a la "derecha" a partidos que en Uruguay se leen como centroderecha. La franja libertaria arranca en Y < 10, porque en Uruguay casi todos los demócratas tienen Representación cerca de 0 y el eje vertical depende casi solo de Poder.

**Segunda pasada.** En la primera usé respuestas extremas (A o D) en temas donde los partidos uruguayos tienen sectores diversos, y eso los polarizó: PN y PC quedaban en X ≈ 79 y el FA muy a la izquierda. Ahora A o D se reservan para las posiciones que definen a cada partido.

Cambios grandes respecto a la estimación inicial:
- **PN y PC quedan más a la derecha en economía** (X ≈ 79, antes 61–64): rechazan con fuerza las afirmaciones de planificación y apoyan las de mercado (regla fiscal, BCU independiente, bajar impuestos). Pasan de "Centroderecha" a "Derecha".
- **El FA queda más liberal en Poder** (83, antes 55): rechazo a la LUC, a los allanamientos y a los militares en seguridad, y apoyo a la marihuana y la eutanasia.
- **Cabildo sube en Representación** (39, antes 20) por las afirmaciones sobre la dictadura (golpe "comprensible", rechazo a los juicios); en el compás queda cerca de la zona autoritaria (Y 57).
- **Identidad Soberana** queda más a la izquierda en economía (X 31,5) y muy alta en Moral (81) y Tecnología (95).

---

## 8. Auditoría de los referentes (borrador, noviembre 2026)

Los 59 referentes se auditaron con el mismo método que los partidos: los 11 legisladores en `app/auditoria/legisladores.json` y los otros 48 en `app/auditoria/referentes.json`, cada uno con una nota sobre sus votos, cargos u obra. Las figuras históricas se responden por su época: las afirmaciones sobre temas que no existían (AFAP, UPM, CPTPP, marihuana) van con "?" y no cuentan, igual que los dilemas que no aplican. Por eso sus vectores se apoyan en menos afirmaciones y son menos precisos.

Dónde quedan en el compás (con la calibración final):

| Región | Referentes |
|---|---|
| Izquierda socialista | Frugoni, Quijano, Arismendi, Sendic, MLN, Fernando Pereira, Abella, Andrade, Abdala |
| Izquierda libertaria | Michelini, Galeano, FAU, Constanza Moreira, Civila |
| Izquierda | Artigas, Batlle y Ordóñez, Brum, Batlle Berres, Wilson Ferreira, Seregni, Vázquez, Mujica, Topolansky, Cosse, Daniel Martínez, Alejandro Sánchez |
| Centroizquierda | Orsi, Bergara, Salle |
| Centro | Astori, Oddone, Argimón, Delgado, Olivera, Mieres, Manini Ríos, Lust |
| Centroderecha | Sanguinetti, Larrañaga, Lacalle Pou, Arbeleche |
| Derecha | Saravia, Herrera, Lacalle Herrera, Jorge Batlle, Pedro Bordaberry, Raffo, Ojeda, Talvi, Gurméndez, García, Bianchi, Zubía, Dastugue |
| Derecha liberal | da Silva |
| Autoritarismo de centro | Pacheco Areco, Gregorio Álvarez |
| Derecha autoritaria | Terra, Juan María Bordaberry |

Puntos a revisar en la segunda lectura:
- **Delgado** pasó de la centroderecha (X 60) al centro (X 50,5) en la segunda lectura. Se corrigieron siete respuestas de Economía y Control hacia posiciones moderadas: sindicatos, venta de empresas públicas, impuesto a la herencia, precios máximos, impuestos progresivos, el efecto de bajar impuestos sobre el empleo y el precio del dólar. Mantiene la regla fiscal, la independencia del Banco Central y la defensa de las AFAP.
- **Izquierda libertaria** agrupa a quienes combinan izquierda económica con rechazo fuerte al punitivismo (Civila, Moreira, Galeano, Michelini). Es una lectura técnica del compás; puede sonar rara para el uso uruguayo de "libertario".
- Las **22 ideologías** siguen con vectores estimados a mano. Son la próxima auditoría.

---

## 9. Auditoría de las ideologías (borrador, noviembre 2026)

Las 22 ideologías se auditaron con el mismo método (`app/auditoria/ideologias.json`). Las universales se responden como un adherente típico aplicado a Uruguay hoy; las tradiciones uruguayas, como su doctrina, con "?" en lo que la doctrina no resuelve. Con esto **no queda ningún perfil estimado a mano**: partidos, referentes e ideologías salen del mismo cálculo que el de un usuario.

| Región | Ideologías |
|---|---|
| Izquierda socialista | Comunismo, Tercerismo, Tupamarismo (etapa armada) |
| Izquierda libertaria | Socialismo democrático, Progresismo, Anarquismo |
| Izquierda | Artiguismo, Batllismo, Neobatllismo, Wilsonismo, Seregnismo, Ecologismo |
| Centroizquierda | Socialdemocracia |
| Centro | Democracia cristiana, Conservadurismo social, Soberanismo constitucionalista |
| Centroderecha | Liberalismo social |
| Derecha | Herrerismo, Liberalismo clásico, Conservadurismo liberal |
| Libertarismo | Libertarismo |
| Autoritarismo de centro | Autoritarismo militar |

Para revisar: el batllismo y el wilsonismo caen en la izquierda porque sus programas históricos (estatizaciones, reforma agraria, control de la banca) eran de izquierda económica para su época; el herrerismo queda en el límite de la zona autoritaria por su apoyo al golpe de Terra (1933).
