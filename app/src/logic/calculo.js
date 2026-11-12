export const ORDEN_EJES = ['estructura', 'representacion', 'poder', 'inmigracion', 'diplomacia', 'intervencion', 'economia', 'control', 'comercio', 'religion', 'moral', 'tecnologia'];

export const RESPUESTAS = [
  { valor: 1, texto: 'Muy de acuerdo' },
  { valor: 0.75, texto: 'De acuerdo' },
  { valor: 0.5, texto: 'Neutral' },
  { valor: 0.25, texto: 'En desacuerdo' },
  { valor: 0, texto: 'Muy en desacuerdo' },
  { valor: null, texto: 'No sé' },
];

export function valorHaciaB(afirmacion, acuerdo) {
  const efectivo = afirmacion.escalon === 'extremo' ? Math.max(acuerdo, 0.5) : acuerdo;
  const valor = efectivo * 100;
  return afirmacion.polo === 'B' ? valor : 100 - valor;
}

export const EJES_MINIMOS = 8;

export function calcularPosiciones(afirmaciones, respuestas, dilemas, elecciones, { vacioComoNulo = false } = {}) {
  const sumas = Object.fromEntries(ORDEN_EJES.map((eje) => [eje, { total: 0, cantidad: 0 }]));
  afirmaciones.forEach((afirmacion) => {
    const acuerdo = respuestas[afirmacion.id];
    if (acuerdo === undefined || acuerdo === null) return;
    const peso = afirmacion.peso ?? 1;
    sumas[afirmacion.eje].total += peso * valorHaciaB(afirmacion, acuerdo);
    sumas[afirmacion.eje].cantidad += peso;
  });
  dilemas.forEach((dilema) => {
    const opcion = dilema.opciones.find((o) => o.id === elecciones[dilema.id]);
    if (!opcion) return;
    Object.entries(opcion.efectos).forEach(([eje, valor]) => {
      sumas[eje].total += valor;
      sumas[eje].cantidad += 1;
    });
  });
  return Object.fromEntries(ORDEN_EJES.map((eje) => {
    const { total, cantidad } = sumas[eje];
    if (cantidad === 0) return [eje, vacioComoNulo ? null : 50];
    return [eje, total / cantidad];
  }));
}

export const tieneDato = (valor) => valor !== null && valor !== undefined;

export function intensidad(posicion) {
  const distancia = Math.abs(posicion - 50);
  if (distancia < 10) return 'Centro';
  if (distancia < 25) return 'Inclinado';
  if (distancia < 40) return 'Marcado';
  return 'Muy marcado';
}

export function afinidad(usuario, perfil) {
  const comparables = ORDEN_EJES.filter((eje) => tieneDato(usuario[eje]) && tieneDato(perfil[eje]));
  if (comparables.length === 0) return { porcentaje: 0, coinciden: [], difieren: [], ejesComparados: 0 };
  const diferencias = comparables.map((eje) => {
    const u = usuario[eje];
    const p = perfil[eje];
    const diferencia = Math.abs(u - p);
    const opuestos = (u - 50) * (p - 50) < 0 && Math.abs(u - 50) > 15 && Math.abs(p - 50) > 15;
    return { eje, diferencia, ajustada: opuestos ? diferencia * 1.25 : diferencia };
  });
  const promedio = diferencias.reduce((suma, d) => suma + d.ajustada, 0) / comparables.length;
  const cobertura = Math.min(1, comparables.length / EJES_MINIMOS);
  const ordenadas = [...diferencias].sort((a, b) => a.diferencia - b.diferencia);
  return {
    porcentaje: Math.max(0, Math.round((100 - 2 * promedio) * cobertura)),
    coinciden: ordenadas.slice(0, 2).map((d) => d.eje),
    difieren: ordenadas.slice(-2).reverse().map((d) => d.eje),
    ejesComparados: comparables.length,
  };
}

export function rankear(usuario, perfiles) {
  return perfiles
    .map((perfil) => ({ perfil, ...afinidad(usuario, perfil.vector) }))
    .sort((a, b) => b.porcentaje - a.porcentaje);
}

export const AFINIDAD_HISTORICA_MINIMA = 60;

export function figuraHistorica(rankingReferentes) {
  const mejor = rankingReferentes.find((fila) => fila.perfil.epoca === 'historico');
  return mejor && mejor.porcentaje >= AFINIDAD_HISTORICA_MINIMA ? mejor : null;
}
