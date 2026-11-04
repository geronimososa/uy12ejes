const MAYORITARIOS = ['frente-amplio', 'partido-nacional', 'partido-colorado'];
const MARGEN_RADICAL = 15;
const acotar = (valor) => Math.max(0, Math.min(100, valor));

export function ventana(eje, partidos, legisladores = []) {
  const valores = [...partidos, ...legisladores].map((p) => p.vector[eje.id]).filter((v) => v !== null && v !== undefined);
  const mayoritarios = partidos.filter((p) => MAYORITARIOS.includes(p.id)).map((p) => p.vector[eje.id]);
  const aceptableMin = Math.min(...valores, eje.aceptableMin ?? 100);
  const aceptableMax = Math.max(...valores, eje.aceptableMax ?? 0);
  return {
    vigente: eje.vigente,
    mayoritario: [Math.min(...mayoritarios), Math.max(...mayoritarios)],
    aceptable: [aceptableMin, aceptableMax],
    radical: [acotar(aceptableMin - MARGEN_RADICAL), acotar(aceptableMax + MARGEN_RADICAL)],
  };
}

export function zona(posicion, v) {
  if (posicion >= v.mayoritario[0] && posicion <= v.mayoritario[1]) return 'mayoritario';
  if (posicion >= v.aceptable[0] && posicion <= v.aceptable[1]) return 'aceptable';
  if (posicion >= v.radical[0] && posicion <= v.radical[1]) return 'radical';
  return 'impensable';
}

export const TEXTO_ZONA = {
  mayoritario: 'Dentro de la zona mayoritaria del debate uruguayo.',
  aceptable: 'Dentro de lo que se discute en el Parlamento.',
  radical: 'En el borde del debate: hoy ningún partido ni legislador lo defiende, pero existe en la discusión pública.',
  impensable: 'Fuera del debate público uruguayo actual.',
};
