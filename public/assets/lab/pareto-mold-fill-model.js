/** Geometry-only, weighted shortest-path model for the illustrative cavity fill. */
const MULTI_DIRECTIONAL_NEIGHBORS = (() => {
  const moves = [];
  for (let dx = -2; dx <= 2; dx++) {
    for (let dy = -2; dy <= 2; dy++) {
      const ax = Math.abs(dx);
      const ay = Math.abs(dy);
      if ((!dx && !dy) || (ax === 2 && ay !== 1) || (ay === 2 && ax !== 1)) continue;
      const sx = Math.sign(dx);
      const sy = Math.sign(dy);
      const via = ax === 2 ? [[sx, 0], [sx, sy]] : ay === 2 ? [[0, sy], [sx, sy]] : [];
      moves.push([dx, dy, Math.hypot(dx, dy), via]);
    }
  }
  return moves;
})();

export function buildDistanceField({ width, height, mask, source, costs }) {
  if (!Number.isInteger(width) || width < 1 || !Number.isInteger(height) || height < 1) {
    throw new RangeError('Cavity width and height must be positive integers.');
  }
  const size = width * height;
  if (!mask || mask.length !== size) {
    throw new RangeError('Cavity mask length must equal width × height.');
  }
  if (costs && costs.length !== size) {
    throw new RangeError('Flow resistance length must equal width × height.');
  }
  if (costs) {
    for (let index = 0; index < size; index++) {
      if (mask[index] && (!Number.isFinite(Number(costs[index])) || Number(costs[index]) <= 0)) {
        throw new RangeError('Flow resistance must be a positive, finite number for every open cell.');
      }
    }
  }
  if (!source || !Number.isInteger(source.x) || !Number.isInteger(source.y) || source.x < 0 || source.x >= width || source.y < 0 || source.y >= height) {
    throw new RangeError('Gate source must identify a cell inside the cavity grid.');
  }

  const distances = new Float64Array(size);
  distances.fill(-1);
  const start = source.y * width + source.x;
  if (!mask[start]) return { distances, reachableCount: 0, maxDistance: 0 };

  const pending = new Uint8Array(size);
  const settled = new Uint8Array(size);
  distances.fill(Infinity);
  let maxDistance = 0;
  distances[start] = 0;
  pending[start] = 1;
  let reachableCount = 0;

  while (true) {
    let current = -1;
    let bestDistance = Infinity;
    for (let index = 0; index < size; index++) {
      if (pending[index] && !settled[index] && distances[index] < bestDistance) {
        current = index;
        bestDistance = distances[index];
      }
    }
    if (current < 0) break;
    settled[current] = 1;
    reachableCount++;
    const x = current % width;
    const y = Math.floor(current / width);
    const nextDistance = distances[current];
    for (const [dx, dy, length, via] of MULTI_DIRECTIONAL_NEIGHBORS) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const next = ny * width + nx;
      if (!mask[next] || settled[next]) continue;
      let pathIsOpen = true;
      for (const [vx, vy] of via) {
        if (!mask[(y + vy) * width + x + vx]) {
          pathIsOpen = false;
          break;
        }
      }
      if (!pathIsOpen) continue;
      const cost = costs ? Number(costs[next]) : 1;
      const candidateDistance = nextDistance + length * cost;
      if (candidateDistance >= distances[next]) continue;
      distances[next] = candidateDistance;
      pending[next] = 1;
    }
  }

  for (let index = 0; index < size; index++) {
    if (distances[index] === Infinity) distances[index] = -1;
    else maxDistance = Math.max(maxDistance, distances[index]);
  }
  return { distances, reachableCount, maxDistance };
}

export function fillAt(distances, progress, cellVolumes = null) {
  if (!distances || typeof distances.length !== 'number') {
    throw new TypeError('Distance field must be an array-like value.');
  }
  if (cellVolumes && cellVolumes.length !== distances.length) {
    throw new RangeError('Cell volume length must equal the distance field length.');
  }
  const normalized = Number.isFinite(Number(progress)) ? Math.min(1, Math.max(0, Number(progress))) : 0;
  const reachable = [];
  let totalVolume = 0;
  for (let index = 0; index < distances.length; index++) {
    if (distances[index] < 0) continue;
    const volume = cellVolumes ? Number(cellVolumes[index]) : 1;
    if (!Number.isFinite(volume) || volume <= 0) {
      throw new RangeError('Cell volume must be a positive, finite number for every reachable cell.');
    }
    reachable.push({ index, distance: distances[index], volume });
    totalVolume += volume;
  }

  const cells = new Uint8Array(distances.length);
  const fractions = new Float32Array(distances.length);
  if (!reachable.length) return { cells, fractions, percent: 0, frontDistance: 0, filledVolume: 0, totalVolume: 0 };
  reachable.sort((a, b) => a.distance - b.distance || a.index - b.index);

  let remainingVolume = totalVolume * normalized;
  let filledVolume = 0;
  let frontDistance = 0;
  let cursor = 0;
  while (cursor < reachable.length && remainingVolume > 0) {
    const layerDistance = reachable[cursor].distance;
    const tolerance = 1e-7 * Math.max(1, Math.abs(layerDistance));
    let layerEnd = cursor;
    let layerVolume = 0;
    while (layerEnd < reachable.length && Math.abs(reachable[layerEnd].distance - layerDistance) <= tolerance) {
      layerVolume += reachable[layerEnd].volume;
      layerEnd++;
    }
    const fraction = Math.min(1, remainingVolume / layerVolume);
    for (let position = cursor; position < layerEnd; position++) {
      const cell = reachable[position];
      fractions[cell.index] = fraction;
      if (fraction > 0) cells[cell.index] = 1;
    }
    const layerFill = fraction * layerVolume;
    filledVolume += layerFill;
    remainingVolume = Math.max(0, remainingVolume - layerFill);
    frontDistance = layerDistance;
    cursor = layerEnd;
  }
  return {
    cells,
    fractions,
    percent: Math.round((filledVolume / totalVolume) * 100),
    frontDistance,
    filledVolume,
    totalVolume,
  };
}

export function stepProgress(progress, direction, step = 0.025) {
  if (!Number.isFinite(step) || step < 0) throw new RangeError('Progress step must be a finite, nonnegative number.');
  const current = Number.isFinite(Number(progress)) ? Number(progress) : 0;
  const sign = Math.sign(Number(direction) || 0);
  return Math.min(1, Math.max(0, current + sign * step));
}
