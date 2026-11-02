import { buildDistanceField, fillAt, stepProgress } from './pareto-mold-fill-model.js?v=055dad93bb5a';

const SVG_NS = 'http://www.w3.org/2000/svg';
const GRID_WIDTH = 20;
const GRID_HEIGHT = 40;
export const CASE_FILL_SOURCE = Object.freeze({ x: 10, y: 39 });

export function makeCaseResistanceMap() {
  const costs = new Float32Array(GRID_WIDTH * GRID_HEIGHT).fill(1);
  const zones = [
    { x: 14, y: 17, rx: 2.5, ry: 4, peak: 1.28 },
    { x: 6, y: 27, rx: 2.2, ry: 3.5, peak: 1.22 },
  ];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      let drag = 0;
      const wallClearance = Math.min(x, GRID_WIDTH - 1 - x, y, GRID_HEIGHT - 1 - y);
      if (wallClearance < 3) drag = Math.max(drag, 0.12 * (1 - wallClearance / 3));
      const cameraOpening = x >= 1 && x <= 7 && y >= 2 && y <= 8;
      if (!cameraOpening) {
        const dx = x < 1 ? 1 - x : x > 7 ? x - 7 : 0;
        const dy = y < 2 ? 2 - y : y > 8 ? y - 8 : 0;
        const cameraClearance = Math.sqrt(dx * dx + dy * dy);
        if (cameraClearance < 2) drag = Math.max(drag, 0.14 * (1 - cameraClearance / 2));
      }
      // The left ligament beside the camera opening is one grid cell wide;
      // represent its restricted bypass with a tapered travel-cost penalty.
      if (x === 0 && y >= 2 && y <= 8) {
        const taper = Math.sin(Math.PI * (y - 1) / 8);
        drag = Math.max(drag, 0.55 * taper);
      }
      for (const zone of zones) {
        const radius = Math.sqrt(((x - zone.x) / zone.rx) ** 2 + ((y - zone.y) / zone.ry) ** 2);
        if (radius >= 1) continue;
        drag = Math.max(drag, (zone.peak - 1) * (1 - radius * radius));
      }
      const index = y * GRID_WIDTH + x;
      costs[index] = index === CASE_FILL_SOURCE.y * GRID_WIDTH + CASE_FILL_SOURCE.x || cameraOpening ? 1 : 1 + drag;
    }
  }
  return costs;
}

export function buildCaseDistanceField() {
  const mask = makeCavityMask();
  return buildDistanceField({
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    mask,
    costs: makeCaseResistanceMap(),
    source: CASE_FILL_SOURCE,
  });
}

export function projectCasePoint(x, y) {
  return {
    x: 250 + 7.5 * Number(x),
    y: 30 + 7.5 * Number(y),
  };
}

export function arrowDirection(key, withinInteractive, isEditable) {
  if (!withinInteractive || isEditable) return 0;
  if (key === 'ArrowLeft') return -1;
  if (key === 'ArrowRight') return 1;
  return 0;
}

function makeCavityMask() {
  const mask = new Uint8Array(GRID_WIDTH * GRID_HEIGHT);
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const corner = (x < 2 && y < 2 && x + y < 2)
        || (x >= GRID_WIDTH - 2 && y < 2 && GRID_WIDTH - 1 - x + y < 2)
        || (x < 2 && y >= GRID_HEIGHT - 2 && x + GRID_HEIGHT - 1 - y < 2)
        || (x >= GRID_WIDTH - 2 && y >= GRID_HEIGHT - 2 && GRID_WIDTH - 1 - x + GRID_HEIGHT - 1 - y < 2);
      const cameraOpening = x >= 1 && x <= 7 && y >= 2 && y <= 8;
      if (!corner && !cameraOpening) mask[y * GRID_WIDTH + x] = 1;
    }
  }
  return mask;
}

function stageNumber(stage) {
  const match = String(stage.className?.baseVal || stage.className || '').match(/\btt-mold-stage-(\d+)\b/);
  return match ? Math.min(7, Math.max(1, Number(match[1]))) : 1;
}

function isEditableTarget(target) {
  if (!target) return false;
  return Boolean(target.isContentEditable || target.closest?.('input, textarea, select, [contenteditable="true"]'));
}

function renderFill(svg, field, mask, costs, progress) {
  const group = svg.querySelector('[data-fill-cells]');
  const status = svg.querySelector('[data-svg-fill-status]');
  const result = fillAt(field.distances, progress);
  const nodes = group.children;
  for (let index = 0; index < mask.length; index++) {
    if (!mask[index]) continue;
    const cell = nodes[index];
    const filled = result.cells[index] === 1;
    if (!filled) {
      cell.setAttribute('class', costs[index] > 1.02 ? 'tt-fill-cell is-drag' : 'tt-fill-cell');
      cell.removeAttribute('fill-opacity');
      cell.removeAttribute('data-distance');
      continue;
    }
    const fraction = result.fractions[index];
    const distance = field.distances[index];
    const x = index % GRID_WIDTH;
    const y = Math.floor(index / GRID_WIDTH);
    const neighbors = [];
    if (x > 0) neighbors.push(index - 1);
    if (x + 1 < GRID_WIDTH) neighbors.push(index + 1);
    if (y > 0) neighbors.push(index - GRID_WIDTH);
    if (y + 1 < GRID_HEIGHT) neighbors.push(index + GRID_WIDTH);
    const front = fraction < 1 || neighbors.some((next) => field.distances[next] >= 0 && result.fractions[next] < 1);
    const drag = costs[index] > 1.02 ? ' is-drag' : '';
    cell.setAttribute('class', `${front ? 'tt-fill-cell is-front' : 'tt-fill-cell is-filled'}${drag}`);
    cell.setAttribute('fill-opacity', String(fraction));
    cell.setAttribute('data-distance', String(distance));
  }
  if (status) status.textContent = `${result.percent}% CAVITY VOLUME / 2D PROXY`;
  return result;
}

function buildCells(svg, mask) {
  const group = svg.querySelector('[data-fill-cells]');
  if (!group) return null;
  group.replaceChildren();
  for (let index = 0; index < mask.length; index++) {
    const cell = document.createElementNS(SVG_NS, 'rect');
    cell.setAttribute('class', 'tt-fill-cell');
    cell.setAttribute('x', String(index % GRID_WIDTH + 0.08));
    cell.setAttribute('y', String(Math.floor(index / GRID_WIDTH) + 0.08));
    cell.setAttribute('width', '0.84');
    cell.setAttribute('height', '0.84');
    group.appendChild(cell);
  }
  return group;
}

function mountFidelityGuide(root) {
  const guide = root.querySelector('[data-fidelity-guide]');
  if (!guide) return () => {};
  const select = guide.querySelector('[data-fidelity-select]');
  const panels = [...guide.querySelectorAll('[data-fidelity-panel]')];
  if (!select || !panels.length) return () => {};
  const update = () => {
    for (const panel of panels) panel.hidden = panel.dataset.fidelityPanel !== select.value;
  };
  select.addEventListener('change', update);
  update();
  return () => select.removeEventListener('change', update);
}

export function mountParetoFill(root) {
  const visual = root?.querySelector('[data-pareto-visual]');
  const svg = visual?.querySelector('svg');
  if (!root || !visual || !svg || root.dataset.paretoMounted === 'true') return () => {};
  root.dataset.paretoMounted = 'true';

  const mask = makeCavityMask();
  const costs = makeCaseResistanceMap();
  const field = buildCaseDistanceField();
  buildCells(svg, mask);
  root.classList.add('tt-pareto-ready');

  const controls = root.querySelector('[data-pareto-controls]');
  const range = controls?.querySelector('[data-fill-range]');
  const status = controls?.querySelector('[data-fill-status]');
  const announcement = controls?.querySelector('[data-fill-announcement]');
  const buttons = [...(controls?.querySelectorAll('button') || [])];
  buttons.forEach((button) => { button.disabled = false; });
  if (range) range.disabled = false;

  let progress = 0;
  let renderFrame = 0;
  const updateProgress = (next, announce = true) => {
    progress = Math.min(1, Math.max(0, next));
    if (renderFrame) cancelAnimationFrame(renderFrame);
    renderFrame = requestAnimationFrame(() => {
      const result = renderFill(svg, field, mask, costs, progress);
      if (range) range.value = String(Math.round(progress * 100));
      if (status) status.textContent = `${result.percent}% of equal-cell cavity volume represented. Geometry proxy only.`;
      if (announcement && announce) announcement.textContent = `${result.percent}% of equal-cell cavity volume represented. Geometry proxy only.`;
      renderFrame = 0;
    });
  };

  const onClick = (event) => {
    const stepButton = event.target.closest?.('[data-fill-step]');
    if (stepButton) {
      updateProgress(stepProgress(progress, Number(stepButton.dataset.fillStep)));
      return;
    }
    if (event.target.closest?.('[data-fill-reset]')) updateProgress(0);
  };
  const onInput = (event) => {
    if (event.target.matches?.('[data-fill-range]')) updateProgress(Number(event.target.value) / 100, false);
  };
  const onChange = (event) => {
    if (event.target.matches?.('[data-fill-range]')) updateProgress(progress);
  };
  const onKeydown = (event) => {
    const zone = event.target.closest?.('[data-pareto-key-target], [data-pareto-controls]');
    const direction = arrowDirection(event.key, Boolean(zone), isEditableTarget(event.target));
    if (!direction) return;
    event.preventDefault();
    updateProgress(stepProgress(progress, direction));
  };
  controls?.addEventListener('click', onClick);
  controls?.addEventListener('input', onInput);
  controls?.addEventListener('change', onChange);
  root.addEventListener('keydown', onKeydown);
  updateProgress(0, false);

  const stages = [...root.querySelectorAll('.tt-mold-stage')];
  let stageFrame = 0;
  const setStage = (stage) => {
    visual.dataset.stage = String(stage);
    visual.querySelectorAll('[data-stage-layer]').forEach((layer) => {
      layer.dataset.active = String(Number(layer.dataset.stageLayer) <= stage);
    });
  };
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let observer = null;
  if (reducedMotion || !('IntersectionObserver' in window) || !stages.length) {
    setStage(7);
  } else {
    setStage(1);
    observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (!visible.length) return;
      visible.sort((a, b) => Math.abs(a.boundingClientRect.top - window.innerHeight * 0.45) - Math.abs(b.boundingClientRect.top - window.innerHeight * 0.45));
      if (stageFrame) cancelAnimationFrame(stageFrame);
      stageFrame = requestAnimationFrame(() => {
        setStage(stageNumber(visible[0].target));
        stageFrame = 0;
      });
    }, { rootMargin: '-43% 0px -43% 0px', threshold: [0, 1] });
    stages.forEach((stage) => observer.observe(stage));
  }

  const unmountGuide = mountFidelityGuide(root);
  return () => {
    observer?.disconnect();
    if (stageFrame) cancelAnimationFrame(stageFrame);
    if (renderFrame) cancelAnimationFrame(renderFrame);
    controls?.removeEventListener('click', onClick);
    controls?.removeEventListener('input', onInput);
    controls?.removeEventListener('change', onChange);
    root.removeEventListener('keydown', onKeydown);
    unmountGuide();
    root.dataset.paretoMounted = 'false';
  };
}
