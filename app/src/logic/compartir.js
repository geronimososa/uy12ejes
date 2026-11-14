import ejes from '../data/ejes.json';
import perfiles from '../data/perfiles.json';
import { rankear } from './calculo.js';
import { etiqueta } from './compas.js';
import { ESPECTROS, espectroDe } from './espectros.js';

const referentes = perfiles.filter((p) => p.tipo === 'referente');

export function resumenCompartido(posiciones) {
  const [mejor] = rankear(posiciones, referentes);
  return {
    etiqueta: etiqueta(posiciones, ejes),
    referente: mejor.perfil.nombre,
    porcentaje: mejor.porcentaje,
    color: ESPECTROS.find((e) => e.id === espectroDe(posiciones))?.color ?? '#3570c4',
  };
}
