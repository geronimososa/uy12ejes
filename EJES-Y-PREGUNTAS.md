# uy12ejes: ejes y banco de preguntas

Complemento de [DISENO.md](DISENO.md). Escala de cada eje: **0 = polo A, 100 = polo B**.

## Cómo leer las tablas

- **Tipo F** (fundamental): afirmación de principio, válida en cualquier país.
- **Tipo U** (uruguaya): afirmación sobre un debate concreto de Uruguay.
- **Polo**: hacia dónde empuja estar *de acuerdo*.
- **R**: la afirmación entra en el formato Rápido (4 por eje: 1 F hacia A, 1 F hacia B, 1 U hacia A, 1 U hacia B).
- Cada eje tiene 10 afirmaciones: 6 F + 4 U, **5 hacia cada polo**.
- La columna **Contexto** es el texto de ayuda ("¿De qué se trata?") que puede abrir el usuario. Solo las uruguayas lo necesitan.

## Resumen de los 12 ejes

| # | Eje | Polo A (0) | Polo B (100) | Cambio respecto al modelo genérico |
|---|---|---|---|---|
| 1 | Territorio | Descentralización | Centralismo | "Federal/Unitario" no aplica a un país unitario: se mide cuánto poder para departamentos y municipios |
| 2 | Representación | Democracia | Autocracia | Incluye la memoria de 1968–1985 y la democracia directa uruguaya |
| 3 | Poder | Seguridad | Libertad | Incluye LUC, allanamientos, marihuana y eutanasia |
| 4 | Inmigración | Asimilación | Pluralismo | Uruguay como país de inmigración y de baja natalidad |
| 5 | Diplomacia | Defensa fuerte | Pacifismo | Fuerzas Armadas chicas, misiones de paz, control del mar |
| 6 | Intervención | Neutralidad | Afirmación nacional | Se evita "Nacionalista" para no confundir con el Partido Nacional |
| 7 | Economía | Público | Privado | Empresas públicas, AFAP, cooperativas de vivienda |
| 8 | Control | Planificación | Mercado | Consejos de Salarios, regla fiscal, dólar |
| 9 | Comercio | Protección | Apertura | Mercosur, TLC, tierra en manos extranjeras |
| 10 | Religión | Laicidad estricta | Estado confesional | Solo mide lo público, no la fe personal; el debate uruguayo es laicidad estricta frente a laicidad abierta |
| 11 | Moral | Progresismo | Tradicionalismo | Agenda de derechos 2012–2025 |
| 12 | Tecnología | Tecnología | Naturaleza | Celulosa, energía nuclear prohibida, agrotóxicos, petróleo en el mar |

---

## 1. Territorio · Descentralización (A) ↔ Centralismo (B)

(En el original se llama "Estructura". Se renombró porque no mide el tamaño del Estado sino dónde se decide.)

**Qué mide**: si preferís que las decisiones se tomen cerca (intendencias, municipios, comunidades) o que el gobierno nacional fije reglas iguales para todo el país.

**Por qué se adapta**: Uruguay es unitario desde 1830. Nadie serio propone federalismo; el debate real es cuánto poder y plata tienen las 19 intendencias y los municipios creados en 2009–2010, y quién decide los grandes proyectos.

| ID | Tipo | Polo | R | Afirmación | Contexto |
|---|---|---|---|---|---|
| est_f1 | F | A | R | Las decisiones que afectan a una localidad deberían tomarlas sus propios habitantes, no el gobierno nacional. | |
| est_f2 | F | B | R | Es mejor que todo el país tenga las mismas reglas, aunque algunas zonas prefieran otras. | |
| est_f3 | F | A | | La mayor parte de los impuestos debería quedarse en el lugar donde se recaudan. | |
| est_f4 | F | B | | La educación debe tener un programa único para todo el país, definido a nivel nacional. | |
| est_f5 | F | A | | Una región debería poder separarse del país si la mayoría de sus habitantes lo vota. | |
| est_f6 | F | B | | La policía debe depender de un único mando nacional y no de autoridades locales. | |
| est_u1 | U | A | R | Las intendencias deberían tener más poder y más recursos, aunque eso reduzca lo que maneja el gobierno nacional. | Gran parte de lo que gastan las intendencias del interior viene de transferencias del gobierno nacional. |
| est_u2 | U | B | R | Uruguay es demasiado chico para tener 19 gobiernos departamentales: deberían ser menos. | Cada departamento tiene intendencia y junta departamental propias. |
| est_u3 | U | A | | Los municipios deberían tener presupuesto propio y más competencias que hoy. | Los municipios (tercer nivel de gobierno) existen desde la ley de descentralización de 2009 y dependen en buena medida de la intendencia. |
| est_u4 | U | B | | Los grandes proyectos, como puertos, rutas o tomas de agua potable, los debe decidir el gobierno nacional aunque un departamento se oponga. | Ejemplos de conflicto: la planta de UPM en Durazno-Tacuarembó y el proyecto de agua Arazatí en San José. |

---

## 2. Representación · Democracia (A) ↔ Autocracia (B)

**Qué mide**: quién debe gobernar y bajo qué controles; si aceptás atajos no democráticos cuando la causa te parece buena.

**Por qué se adapta**: en Uruguay el compromiso democrático es casi unánime, así que el eje se calibra con dos cosas que sí dividen: **la memoria del período 1968–1985** y el uso intensivo de **plebiscitos y referéndums**. Las preguntas sobre la vía no democrática se plantean **de los dos lados** (golpe de 1973 y lucha armada del MLN) para no medir solo a un sector.

| ID | Tipo | Polo | R | Afirmación | Contexto |
|---|---|---|---|---|---|
| rep_f1 | F | A | R | Los gobernantes siempre deben salir de elecciones libres, aunque eso lleve al poder a gente que considero peligrosa. | |
| rep_f2 | F | B | R | En una crisis grave, un líder fuerte debería poder gobernar un tiempo sin el Parlamento. | |
| rep_f3 | F | A | | Los partidos de oposición deben tener las mismas garantías que el gobierno, incluso los que más detesto. | |
| rep_f4 | F | B | | Un gobierno de expertos que no dependa de elecciones tomaría mejores decisiones que los políticos electos. | |
| rep_f5 | F | A | | Los ciudadanos deberían poder votar directamente las leyes importantes, no solo elegir representantes. | |
| rep_f6 | F | B | | Si un gobierno da buenos resultados, no importa tanto que respete todas las reglas democráticas. | |
| rep_u1 | U | B | R | El golpe de Estado de 1973 fue, en su contexto, una respuesta comprensible al caos y a la guerrilla. | Peso 0,5. El 27 de junio de 1973 el presidente Bordaberry disolvió el Parlamento con apoyo militar. La dictadura duró hasta 1985. |
| rep_u2 | U | A | R | Los crímenes cometidos por el Estado durante la dictadura deben seguir investigándose y juzgándose, sin importar el tiempo que pasó. | Peso 0,5. La Ley de Caducidad (1986) impidió juzgarlos; fue ratificada en 1989 y en 2009. En 2011 una ley restableció la posibilidad de juzgarlos. |
| rep_u3 | U | B | | La lucha armada del MLN-Tupamaros contra los gobiernos de los años 60 estaba justificada. | El MLN actuó como guerrilla urbana desde mediados de los 60, bajo gobiernos electos. |
| rep_u4 | U | A | | Los plebiscitos y referéndums, como los de la Ley de Caducidad o la LUC, son de lo mejor que tiene la democracia uruguaya. | Uruguay es de los países que más usan la democracia directa: empresas públicas (1992), agua (2004), LUC (2022), seguridad social (2024). |

---

## 3. Poder · Seguridad (A) ↔ Libertad (B)

**Qué mide**: hasta dónde puede llegar el Estado sobre la vida de cada uno: vigilancia, penas, prohibiciones, frente a privacidad, autonomía y garantías.

**Por qué se adapta**: Uruguay combina leyes muy liberales (marihuana 2013, eutanasia 2025) con una tasa de presos de las más altas de América Latina y un debate constante sobre "mano dura" (plebiscitos de 2014, 2019 y 2024, LUC de 2020). Este eje separa a quienes son liberales en las dos cosas de quienes lo son solo en una.

| ID | Tipo | Polo | R | Afirmación | Contexto |
|---|---|---|---|---|---|
| pod_f1 | F | A | R | Es aceptable que el Estado vigile las comunicaciones de las personas si eso ayuda a prevenir delitos. | |
| pod_f2 | F | B | R | Cada adulto debería poder consumir las drogas que quiera, mientras no perjudique a otros. | |
| pod_f3 | F | A | | Las penas de cárcel deberían ser más largas y cumplirse completas, sin salidas anticipadas. | |
| pod_f4 | F | B | | Prefiero que un culpable quede libre antes que condenar a un inocente. | |
| pod_f5 | F | A | | Debería existir la pena de muerte para los delitos más graves. | Escalón extremo. |
| pod_f6 | F | B | | La libertad de expresión debe proteger también opiniones ofensivas o chocantes. | |
| pod_u1 | U | B | R | La legalización de la marihuana en 2013 fue un acierto. | Ley 19.172: Uruguay fue el primer país en regular producción, venta y consumo. |
| pod_u2 | U | A | R | La Policía debería poder hacer allanamientos de noche. | Se plebiscitó en 2019 ("Vivir sin miedo") y en 2024; las dos veces no alcanzó la mayoría necesaria. |
| pod_u3 | U | A | | Los militares deberían participar en tareas de seguridad pública, como patrullar fronteras o barrios. | La propuesta de 2019 incluía una Guardia Nacional con efectivos militares. |
| pod_u4 | U | B | | Una persona con una enfermedad incurable debería poder pedir la eutanasia, como permite la ley aprobada en 2025. | Uruguay aprobó la ley de muerte digna en 2025. |

---

## 4. Inmigración · Asimilación (A) ↔ Pluralismo (B)

**Qué mide**: si quien llega debe adaptarse a la cultura local o si la diversidad de culturas es un valor en sí; cuánta apertura migratoria.

**Por qué se adapta**: Uruguay se formó con inmigración y hoy tiene un problema demográfico (baja natalidad, población envejecida). Llegaron venezolanos, cubanos y dominicanos, y la residencia para ciudadanos del Mercosur es sencilla. El tema casi no divide a los partidos: el eje sirve sobre todo para ubicar a la persona, no a los partidos.

| ID | Tipo | Polo | R | Afirmación | Contexto |
|---|---|---|---|---|---|
| inm_f1 | F | A | R | Quien viene a vivir al país debe adaptarse a nuestras costumbres. | |
| inm_f2 | F | B | R | Que convivan muchas culturas distintas enriquece a un país. | |
| inm_f3 | F | A | | El país debería limitar la cantidad de inmigrantes que recibe cada año. | |
| inm_f4 | F | B | | Los refugiados que huyen de guerras o persecuciones deben ser recibidos, aunque eso tenga costos. | |
| inm_f5 | F | A | | Preservar la identidad nacional es más importante que abrirse a otras culturas. | |
| inm_f6 | F | B | | Uruguay debería abrir sus fronteras a cualquier persona que quiera venir a vivir. | Escalón extremo. |
| inm_u1 | U | B | R | Uruguay necesita más inmigrantes para compensar la baja natalidad y el envejecimiento de la población. | La natalidad uruguaya está por debajo del nivel de reemplazo desde hace años. |
| inm_u2 | U | A | R | Los inmigrantes recién llegados no deberían acceder enseguida a los mismos beneficios sociales que los uruguayos. | |
| inm_u3 | U | B | | En la frontera con Brasil, las escuelas deberían enseñar en español y en portugués como lenguas de igual valor. | En la frontera norte se habla portugués y "portuñol"; hay escuelas con programas bilingües. |
| inm_u4 | U | A | | Habría que exigir más requisitos para obtener la residencia, incluso a quienes vienen del Mercosur. | Desde 2014 los ciudadanos del Mercosur y asociados acceden a la residencia con trámites simplificados. |

---

## 5. Diplomacia · Defensa fuerte (A) ↔ Pacifismo (B)

**Qué mide**: tu actitud ante la fuerza armada: gasto militar, servicio militar, disuasión, frente a negociación, desarme y organismos internacionales.

**Por qué se adapta**: Uruguay no tiene conflictos armados y es de los países que más soldados aporta por habitante a misiones de paz de la ONU. El debate local es el tamaño y el papel de unas Fuerzas Armadas chicas, y la vigilancia del mar y el espacio aéreo.

| ID | Tipo | Polo | R | Afirmación | Contexto |
|---|---|---|---|---|---|
| dip_f1 | F | A | R | Un país debe tener Fuerzas Armadas bien equipadas, aunque no tenga enemigos inmediatos. | |
| dip_f2 | F | B | R | Los conflictos entre países deben resolverse siempre negociando, nunca con la fuerza. | |
| dip_f3 | F | A | | El servicio militar debería ser obligatorio por un tiempo para los jóvenes. | |
| dip_f4 | F | B | | La ONU y los tribunales internacionales deberían tener la última palabra en los conflictos entre países. | |
| dip_f5 | F | A | | Atacar primero a un enemigo que se prepara para atacarnos es legítimo. | |
| dip_f6 | F | B | | Uruguay debería abolir sus Fuerzas Armadas, como hizo Costa Rica. | Escalón extremo. |
| dip_u1 | U | B | R | Uruguay debería reducir mucho sus Fuerzas Armadas y usar ese dinero en otras áreas. | |
| dip_u2 | U | A | R | Uruguay necesita invertir en buques, aviones y radares para controlar su mar y su espacio aéreo. | Hubo debates recientes por la compra de patrulleros oceánicos y por la falta de radares. |
| dip_u3 | U | B | | Uruguay debería comprometerse a no participar nunca en ninguna guerra. | |
| dip_u4 | U | A | | Las Fuerzas Armadas merecen más reconocimiento y respaldo de la sociedad uruguaya. | |

---

## 6. Intervención · Neutralidad (A) ↔ Afirmación nacional (B)

**Qué mide**: si el país debe mantenerse al margen de los asuntos de otros, o defender sus intereses con firmeza, presionar y buscar protagonismo.

**Por qué se adapta**: el polo B se llama "Afirmación nacional" en vez de "Nacionalista" para no confundirlo con el Partido Nacional. La tradición uruguaya de no intervención (el herrerismo, el tercerismo) convive con episodios de firmeza (el conflicto por la planta de celulosa con Argentina, 2005–2010) y con debates sobre cómo pararse frente a Venezuela, Cuba o Nicaragua.

| ID | Tipo | Polo | R | Afirmación | Contexto |
|---|---|---|---|---|---|
| int_f1 | F | A | R | Un país nunca debería intentar cambiar el gobierno de otro, aunque sea una dictadura. | |
| int_f2 | F | B | R | El interés nacional debe estar por encima de los tratados internacionales cuando entran en conflicto. | |
| int_f3 | F | A | | Las sanciones económicas contra otros países perjudican más a la población que a sus gobiernos. | |
| int_f4 | F | B | | Un país debe usar su peso económico y diplomático para presionar a otros a favor de sus intereses. | |
| int_f5 | F | A | | Es mejor no formar parte de alianzas militares permanentes con grandes potencias. | |
| int_f6 | F | B | | El Estado debe defender activamente a sus empresas cuando tienen conflictos en el exterior. | |
| int_u1 | U | A | R | Uruguay debe mantener su tradición de no intervenir en los asuntos internos de otros países, incluso cuando sus gobiernos violan derechos humanos. | Es un punto de debate recurrente sobre Venezuela, Cuba y Nicaragua. |
| int_u2 | U | B | R | Uruguay debería ser más firme con Argentina y Brasil cuando sus decisiones perjudican al país. | Ejemplo: el corte del puente Fray Bentos–Gualeguaychú durante el conflicto por la planta de celulosa (2006–2010). |
| int_u3 | U | A | | Uruguay no debería permitir bases ni instalaciones militares de otros países en su territorio. | En 1940 el herrerismo se opuso a instalar bases de Estados Unidos. |
| int_u4 | U | B | | Uruguay debería buscar un rol de liderazgo en la región, en vez de adaptarse a lo que deciden los países grandes. | |

---

## 7. Economía · Público (A) ↔ Privado (B)

**Qué mide**: quién debe ser dueño y prestador de bienes y servicios: el Estado y lo colectivo, o los privados.

**Por qué se adapta**: Uruguay mantiene empresas públicas fuertes (ANCAP, UTE, ANTEL, OSE, BROU, BSE) y los votantes rechazaron privatizarlas en 1992 y 2003. Pero también tiene jubilación mixta con AFAP (el plebiscito de 2024 para eliminarlas no salió), salud mixta (mutualistas + ASSE) y liceos gratuitos privados financiados con donaciones. El centro uruguayo está más hacia lo público que el centro "global".

| ID | Tipo | Polo | R | Afirmación | Contexto |
|---|---|---|---|---|---|
| eco_f1 | F | A | R | Los servicios básicos como el agua, la luz y las telecomunicaciones deben estar en manos del Estado. | |
| eco_f2 | F | B | R | Las empresas privadas suelen gestionar mejor que el Estado. | |
| eco_f3 | F | A | | El Estado debería ser dueño de los bancos y de las grandes empresas. | Escalón extremo. |
| eco_f4 | F | B | | El impuesto a la herencia es injusto, porque grava algo que ya pagó impuestos. | |
| eco_f5 | F | A | | Los sindicatos son necesarios para que los trabajadores tengan un trato justo. | |
| eco_f6 | F | B | | El Estado debería vender las empresas que no son esenciales y dejar esa actividad a los privados. | |
| eco_u1 | U | A | R | Las AFAP deberían eliminarse y todo el sistema jubilatorio debería ser público. | Era una de las propuestas del plebiscito de seguridad social de 2024, que no alcanzó la mayoría. |
| eco_u2 | U | B | R | ANCAP debería perder el monopolio de la importación y refinación de combustibles. | |
| eco_u3 | U | A | | El Estado debería ampliar las cooperativas de vivienda y la vivienda pública, en vez de dejar la construcción al mercado. | Las cooperativas de ayuda mutua (como las de FUCVAM) son un modelo uruguayo con más de 50 años. |
| eco_u4 | U | B | | Los liceos privados gratuitos para barrios pobres, financiados con donaciones de empresas que descuentan impuestos, deberían multiplicarse. | Ejemplos: Liceo Jubilar, Liceo Impulso. |

---

## 8. Control · Planificación (A) ↔ Mercado (B)

**Qué mide**: cuánto debe intervenir el Estado en precios, salarios, impuestos y moneda, sin importar quién sea el dueño de las empresas.

**Por qué se adapta**: en Uruguay conviven la negociación salarial tripartita (Consejos de Salarios), metas de inflación del Banco Central y una regla fiscal desde 2020. Los debates fuertes: impuestos a los más ricos, el precio del dólar ("atraso cambiario") y el gasto.

| ID | Tipo | Polo | R | Afirmación | Contexto |
|---|---|---|---|---|---|
| con_f1 | F | A | R | El Estado debe fijar precios máximos a los productos básicos cuando suben demasiado. | |
| con_f2 | F | B | R | Los precios y los salarios deberían fijarse libremente entre las partes, sin intervención del Estado. | |
| con_f3 | F | A | | Los que más ganan deberían pagar una proporción mucho mayor de impuestos. | |
| con_f4 | F | B | | Bajar impuestos y regulaciones es la mejor forma de generar empleo. | |
| con_f5 | F | A | | El Estado debería fijar de forma permanente los precios de todos los productos básicos. | Escalón extremo. |
| con_f6 | F | B | | El Banco Central debe ser independiente del gobierno de turno. | |
| con_u1 | U | A | R | Los Consejos de Salarios, donde gobierno, sindicatos y empresas negocian los sueldos, son buenos para el país. | Creados en 1943 y reinstalados en 2005. |
| con_u2 | U | B | R | La regla fiscal que limita el gasto del Estado es necesaria, aunque obligue a postergar programas sociales. | Incorporada por la LUC en 2020. |
| con_u3 | U | A | | Hay que crear un impuesto especial al 1 % más rico para financiar políticas contra la pobreza infantil. | Propuesta impulsada por el PIT-CNT en 2025. |
| con_u4 | U | B | | El Estado no debería intervenir para mantener alto el precio del dólar; lo tiene que fijar el mercado. | Los exportadores suelen reclamar por el "dólar barato". |

---

## 9. Comercio · Protección (A) ↔ Apertura (B)

**Qué mide**: si el país debe proteger su producción de la competencia externa o abrirse al comercio y la inversión extranjera.

**Por qué se adapta**: para una economía chica y exportadora el debate no es "globalismo sí o no", sino **cómo** abrirse: dentro del Mercosur o por fuera, con China, con el acuerdo transpacífico (CPTPP), con la Unión Europea. También pesa la extranjerización de la tierra.

| ID | Tipo | Polo | R | Afirmación | Contexto |
|---|---|---|---|---|---|
| com_f1 | F | A | R | El Estado debe proteger a la industria nacional de la competencia extranjera con aranceles. | |
| com_f2 | F | B | R | El libre comercio entre países beneficia a la mayoría de las personas. | |
| com_f3 | F | A | | Las compras del Estado deberían priorizar a empresas nacionales, aunque cuesten más. | |
| com_f4 | F | B | | Las empresas extranjeras deben poder invertir en el país en igualdad de condiciones con las nacionales. | |
| com_f5 | F | A | | Un país debería producir sus propios alimentos y medicamentos, aunque importarlos sea más barato. | |
| com_f6 | F | B | | Uruguay debería salir del Mercosur para comerciar libremente con el mundo. | Escalón extremo. |
| com_u1 | U | B | R | Uruguay debería firmar tratados de libre comercio por su cuenta, aunque los otros socios del Mercosur no estén de acuerdo. | Las reglas del Mercosur exigen negociar en bloque; Uruguay pidió "flexibilizarlo" varias veces. |
| com_u2 | U | A | R | Un tratado de libre comercio con China pondría en riesgo a la industria y el empleo uruguayos. | Hubo un estudio de factibilidad que no avanzó a negociación. |
| com_u3 | U | B | | Uruguay debería sumarse al acuerdo transpacífico (CPTPP), con países como Australia, Japón y México. | Uruguay pidió el ingreso en 2022. |
| com_u4 | U | A | | La tierra uruguaya no debería poder venderse a extranjeros. | |

---

## 10. Religión · Laicidad estricta (A) ↔ Estado confesional (B)

**Qué mide**: solo el lugar de la religión **en lo público**, no tu fe personal. Va de la laicidad estricta (la religión fuera de todo lo público) a un Estado confesional (religión oficial, leyes basadas en la fe). En el medio está la **laicidad abierta**: el Estado no tiene religión, pero se aceptan expresiones religiosas en el espacio público y en la política.

**Por qué se adapta**: Uruguay separó Iglesia y Estado en la Constitución de 1918, prohibió la enseñanza religiosa en escuelas públicas en 1909 y en 1919 cambió el nombre de las fiestas religiosas (Semana de Turismo, Día de la Familia). El debate real no es "laico o religioso", sino **laicidad estricta** (tradición batllista) frente a **laicidad abierta o positiva** (defendida, por ejemplo, por el cardenal Sturla y por legisladores creyentes de distintos partidos).

**Por qué no se mide la fe personal**: una persona creyente puede defender la separación estricta y un agnóstico puede aceptar expresiones religiosas en lo público. Mezclar las dos cosas (como hace el 12 Axes original) confunde una posición política con una creencia.

**Escalones**: las afirmaciones tienen distinta intensidad (y lo mismo vale para otros 6 ejes, ver la nota al final de este archivo). Las extremas (religión oficial, ley de Dios sobre la ley civil) solo cuentan cuando estás de acuerdo: acordar con ellas te acerca al polo confesional, y rechazarlas cuenta como neutral. Así, aceptar lo moderado (Navidad, la estatua de la Virgen, legisladores que invocan su fe) te ubica en la laicidad abierta sin marcarte como confesional. Los tests de la app verifican esta regla.

| ID | Tipo | Polo | R | Afirmación | Contexto |
|---|---|---|---|---|---|
| rel_f1 | F | A | R | El Estado no debería financiar ni dar privilegios a ninguna religión. | Escalón moderado. |
| rel_f2 | F | B | R | Los valores religiosos deberían tener más peso en las decisiones políticas. | Escalón moderado. |
| rel_f3 | F | A | | La religión es un asunto privado y no debería tener ningún lugar en las instituciones del Estado. | Escalón fuerte. |
| rel_f4 | F | B | | El Estado debería tener una religión oficial. | Escalón extremo. |
| rel_f5 | F | A | | Los funcionarios públicos no deberían usar símbolos religiosos visibles en su trabajo. | Escalón fuerte. |
| rel_f6 | F | B | | Cuando una ley choca con la ley de Dios, debe primar la ley de Dios. | Escalón extremo. |
| rel_u1 | U | A | R | La laicidad uruguaya hay que defenderla, incluso frente a símbolos religiosos en espacios públicos. | Debates por la cruz del Papa en Tres Cruces (1987) y por la estatua de la Virgen en la rambla del Buceo (2017). |
| rel_u2 | U | B | R | Debería haber enseñanza religiosa optativa en las escuelas públicas. | Prohibida desde 1909. |
| rel_u3 | U | B | | Las fiestas oficiales deberían volver a llamarse Navidad y Semana Santa. | Desde 1919 se llaman Día de la Familia y Semana de Turismo. |
| rel_u4 | U | A | | Los legisladores no deberían invocar su fe religiosa para fundamentar sus votos. | |

---

## 11. Moral · Progresismo (A) ↔ Tradicionalismo (B)

**Qué mide**: valores culturales y derechos civiles: cambio social, género y sexualidad, frente a familia tradicional y costumbres.

**Por qué se adapta**: entre 2012 y 2025 Uruguay aprobó aborto, matrimonio igualitario, marihuana, ley integral trans, ley de violencia de género y eutanasia. Los intentos de derogar algunas (pre-referéndums de 2013 contra el aborto y de 2019 contra la ley trans) quedaron lejos de los votos necesarios. El status quo es progresista; el debate es si se fue demasiado lejos.

| ID | Tipo | Polo | R | Afirmación | Contexto |
|---|---|---|---|---|---|
| mor_f1 | F | A | R | Las parejas del mismo sexo deben tener exactamente los mismos derechos que las demás, incluida la adopción. | |
| mor_f2 | F | B | R | La familia formada por padre, madre e hijos es la base de la sociedad y el Estado debe protegerla especialmente. | |
| mor_f3 | F | A | | La educación sexual integral debe enseñarse en todas las escuelas. | |
| mor_f4 | F | B | | Los cambios culturales de las últimas décadas fueron demasiado rápidos. | |
| mor_f5 | F | A | | El Estado debería dejar de registrar el sexo de las personas en los documentos. | Escalón extremo. |
| mor_f6 | F | B | | El matrimonio entre personas del mismo sexo debería volver a prohibirse. | Escalón extremo. |
| mor_u1 | U | B | R | La ley de aborto de 2012 debería derogarse o restringirse. | Ley 18.987 de interrupción voluntaria del embarazo. En 2013 el intento de referéndum para derogarla no llegó al 9 %. |
| mor_u2 | U | A | R | La cuota para afrodescendientes en los empleos públicos es una medida justa. | Ley 19.122 (2013): reserva un 8 % de los ingresos al Estado. |
| mor_u3 | U | B | | La "agenda de género" en la educación pública fue demasiado lejos. | Expresión usada por sectores conservadores para criticar contenidos de educación sexual y de género. |
| mor_u4 | U | A | | La paridad (mitad de mujeres) debería ser obligatoria en las listas electorales. | Hoy rige una cuota: al menos un tercio de cada sexo. |

---

## 12. Tecnología · Tecnología (A) ↔ Naturaleza (B)

**Qué mide**: confianza en la técnica y el desarrollo productivo (IA, biotecnología, energía, industria) frente a precaución ambiental, vida simple y preservación.

**Por qué se adapta**: Uruguay tiene casi toda su electricidad de fuentes renovables, el Plan Ceibal y una economía basada en la celulosa, la soja y la forestación. Al mismo tiempo, la energía nuclear está prohibida por ley desde 1997, hubo movilización contra la megaminería (Aratirí) y hay debate sobre agrotóxicos, el agua y la exploración de petróleo en el mar.

| ID | Tipo | Polo | R | Afirmación | Contexto |
|---|---|---|---|---|---|
| tec_f1 | F | A | R | La inteligencia artificial y la automatización traerán más beneficios que perjuicios. | |
| tec_f2 | F | B | R | Para cuidar el planeta hay que consumir menos, no solo producir con mejor tecnología. | |
| tec_f3 | F | A | | Los cultivos transgénicos son seguros y necesarios para alimentar al mundo. | |
| tec_f4 | F | B | | Si hay dudas sobre un riesgo ambiental, un proyecto productivo no debería aprobarse. | |
| tec_f5 | F | A | | La edición genética de seres humanos para prevenir enfermedades debería permitirse. | |
| tec_f6 | F | B | | Habría que frenar el crecimiento económico para proteger el ambiente. | Escalón extremo. |
| tec_u1 | U | A | R | Uruguay debería permitir la energía nuclear, hoy prohibida por ley. | Prohibida por la ley del marco regulatorio eléctrico de 1997. |
| tec_u2 | U | B | R | Las plantas de celulosa como UPM hacen más daño ambiental que el beneficio económico que dejan. | UPM tiene plantas en Fray Bentos y en Paso de los Toros (2023). |
| tec_u3 | U | A | | Uruguay debería explorar si tiene petróleo o gas en su mar, aunque haya riesgos ambientales. | Hubo debate por los permisos de exploración sísmica en la plataforma marítima. |
| tec_u4 | U | B | | El uso de agrotóxicos en el campo debería restringirse fuertemente, aunque baje la producción. | |

---

## Dilemas uruguayos (5)

Se responden al final, con una sola opción. Cada opción suma una respuesta más en los ejes indicados (valor 0 = polo A, 100 = polo B). Los textos son escenarios concretos, distintos de los "arquetipos" del original.

### D1. Memoria · "¿Cómo debería recordar el país los años 1968–1985?"

| Opción | Efectos |
|---|---|
| A. Memoria, verdad y justicia: buscar a todos los desaparecidos y juzgar a los responsables del terrorismo de Estado. | Representación 5 |
| B. Reconocer la violencia de todos los sectores y que la Justicia actúe caso a caso. | Representación 25 |
| C. Dar vuelta la página: la Ley de Caducidad ya la confirmó la ciudadanía dos veces. | Representación 35 |
| D. Las Fuerzas Armadas frenaron a la guerrilla y evitaron algo peor. | Representación 75 · Poder 15 |

### D2. Inversión · "Llega una empresa extranjera que promete 2.000 empleos en el interior, pero pide exoneraciones fiscales y usará mucha agua del río. ¿Qué hacés?"

| Opción | Efectos |
|---|---|
| A. Se acepta: el empleo en el interior es la prioridad. | Comercio 85 · Tecnología 20 · Control 70 |
| B. Se acepta, pero con controles ambientales estrictos y sin exoneraciones especiales. | Comercio 60 · Tecnología 50 · Control 35 |
| C. Que el departamento donde se instala tenga la última palabra, con participación de los vecinos. | Territorio 10 · Representación 10 |
| D. No: prefiero desarrollo con empresas nacionales o públicas. | Comercio 20 · Economía 20 · Tecnología 60 |
| E. No: el agua y el ambiente no se negocian. | Tecnología 90 · Comercio 35 |

### D3. Seguridad · "Hay una ola de rapiñas en tu barrio. ¿Qué pedís primero?"

| Opción | Efectos |
|---|---|
| A. Más policías, penas más duras y militares de apoyo. | Poder 10 · Diplomacia 25 |
| B. Más policías y cámaras, pero con controles sobre su uso. | Poder 35 |
| C. Programas para jóvenes, empleo y rehabilitación en las cárceles. | Poder 65 · Economía 30 |
| D. Que el barrio se organice y decida con la policía comunitaria. | Poder 60 · Territorio 15 |

### D4. Mundo · "El Mercosur bloquea un acuerdo comercial que Uruguay quiere firmar. ¿Qué hacés?"

| Opción | Efectos |
|---|---|
| A. Firmarlo igual, aunque haya represalias. | Comercio 90 · Intervención 70 |
| B. Negociar dentro del bloque hasta que el Mercosur se flexibilice. | Comercio 65 · Intervención 35 |
| C. Priorizar el Mercosur y la integración latinoamericana. | Comercio 40 · Intervención 30 |
| D. Mejor así: no necesitamos más tratados de libre comercio. | Comercio 10 · Intervención 45 |

### D5. Familia y Estado · "Una ley propone que la educación sexual en la escuela pública sea optativa, a elección de los padres. ¿Qué votás?"

| Opción | Efectos |
|---|---|
| A. En contra: es un derecho del niño y el Estado debe garantizarlo. | Moral 10 · Territorio 70 · Religión 15 |
| B. En contra, pero con contenidos acordados con las familias. | Moral 35 · Territorio 60 |
| C. A favor: la educación en valores es de los padres. | Moral 70 · Poder 70 · Religión 55 |
| D. A favor, y además que haya formación religiosa optativa. | Moral 85 · Religión 70 |

---

## Nota de calibración: afirmaciones extremas

Las simulaciones con votantes de los dos lados mostraron que un votante firme pero común quedaba marcado como "borde del debate" cuando un eje no tenía ninguna afirmación extrema de su lado: acordar con todo lo moderado ya lo llevaba al tope de la escala. Por eso cada lado que lo necesitaba tiene una afirmación extrema ("Escalón extremo" en la columna Contexto). Ninguna entra en el formato Rápido. **Solo cuentan cuando estás de acuerdo**: si estás en desacuerdo, cuentan como neutral, para no empujar al polo contrario a todo el que las rechaza.

| Eje | Lado | Afirmación extrema | Reemplazó a |
|---|---|---|---|
| Poder | Seguridad | pod_f5: pena de muerte | Cámaras con reconocimiento facial |
| Inmigración | Pluralismo | inm_f6: fronteras abiertas para cualquiera | Mantener idioma y tradiciones |
| Diplomacia | Pacifismo | dip_f6: abolir las Fuerzas Armadas | Reducir ejércitos al mínimo |
| Economía | Público | eco_f3: bancos y grandes empresas estatales | Salud y educación gratis (casi todos de acuerdo) |
| Control | Planificación | con_f5: precios fijados de forma permanente | Gasto anticíclico |
| Comercio | Apertura | com_f6: salir del Mercosur | TLC como mejor camino (repetía com_f2) |
| Religión | Confesional | rel_f4 y rel_f6: religión oficial, ley de Dios | Fe personal (salió del eje) |
| Moral | Progresismo | mor_f5: dejar de registrar el sexo | Registro de género sin requisitos (ya es ley) |
| Moral | Tradición | mor_f6: volver a prohibir el matrimonio igualitario | Roles naturales de género |
| Tecnología | Naturaleza | tec_f6: frenar el crecimiento económico | Vida simple y rural |
