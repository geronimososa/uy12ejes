const conDato = (valor) => valor !== null && valor !== undefined;

function promedio(valores) {
  const presentes = valores.filter(conDato);
  return presentes.length === 0 ? 50 : presentes.reduce((s, v) => s + v, 0) / presentes.length;
}

export function posicionCompas(vector) {
  return {
    x: promedio([vector.economia, vector.control]),
    y: promedio([vector.representacion, conDato(vector.poder) ? 100 - vector.poder : null]),
  };
}

export function region({ x, y }) {
  if (y >= 60) {
    if (x < 40) return 'Izquierda autoritaria';
    if (x <= 60) return 'Autoritarismo de centro';
    return 'Derecha autoritaria';
  }
  if (y < 10) {
    if (x < 40) return 'Izquierda libertaria';
    if (x <= 60) return 'Liberalismo de centro';
    return 'Libertarismo';
  }
  if (x < 12) return 'Izquierda socialista';
  if (x < 30) return 'Izquierda';
  if (x < 42) return 'Centroizquierda';
  if (x < 58) return 'Centro';
  if (x < 70) return 'Centroderecha';
  if (x < 88) return 'Derecha';
  return 'Derecha liberal';
}

function concordar(adjetivo, femenino) {
  if (!femenino || adjetivo.includes(' ')) return adjetivo;
  if (adjetivo.endsWith('o')) return `${adjetivo.slice(0, -1)}a`;
  if (adjetivo.endsWith('or')) return `${adjetivo}a`;
  return adjetivo;
}

export function etiqueta(vector, ejes) {
  const nombre = region(posicionCompas(vector));
  const femenino = nombre.split(' ')[0].endsWith('a');
  if (conDato(vector.moral) && vector.moral < 35) return `${nombre} progresista`;
  if (conDato(vector.moral) && vector.moral > 65) return `${nombre} ${concordar('conservador', femenino)}`;
  const candidatos = ejes
    .filter((eje) => !['representacion', 'poder', 'moral', 'economia', 'control'].includes(eje.id))
    .filter((eje) => conDato(vector[eje.id]))
    .map((eje) => ({ eje, distancia: Math.abs(vector[eje.id] - 50) }))
    .sort((a, b) => b.distancia - a.distancia);
  const mayor = candidatos[0];
  if (mayor && mayor.distancia >= 30) {
    const adjetivo = vector[mayor.eje.id] < 50 ? mayor.eje.adjA : mayor.eje.adjB;
    return `${nombre} ${concordar(adjetivo, femenino)}`;
  }
  return nombre;
}

export function centroUruguayo(partidos) {
  const totalBancas = partidos.reduce((suma, p) => suma + p.bancas, 0);
  return partidos.reduce((centro, p) => {
    const punto = posicionCompas(p.vector);
    return {
      x: centro.x + (punto.x * p.bancas) / totalBancas,
      y: centro.y + (punto.y * p.bancas) / totalBancas,
    };
  }, { x: 0, y: 0 });
}

export function lecturaUruguaya(usuario, centro) {
  const diferencia = usuario.x - centro.x;
  const distancia = Math.abs(diferencia);
  const lado = diferencia < 0 ? 'izquierda' : 'derecha';
  if (distancia < 7) return 'en el centro';
  if (distancia < 20) return `a la ${lado} del centro`;
  return `en la ${lado}`;
}
