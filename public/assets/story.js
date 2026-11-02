(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 800px), (max-height: 760px)');
  const clamp = value => Math.min(1, Math.max(0, value));
  const phase = (progress, element) => {
    const start = Number(element.dataset.start || 0);
    const end = Number(element.dataset.end || 1);
    return clamp((progress - start) / Math.max(.001, end - start));
  };
  const scenes = [...document.querySelectorAll('[data-scroll-scene]')].map(root => {
    const section = root.closest('section');
    const kind = root.dataset.scrollScene;
    const steps = kind === 'leadership' ? [...(section?.querySelectorAll('.approach-step') || [])]
      : kind === 'journey' ? [...(root.closest('.timeline')?.querySelectorAll('.timeline-row') || [])] : [];
    return {root, kind, steps,
      paths: [...root.querySelectorAll('[data-draw]')].map(element => ({element, length: element.getTotalLength()})),
      fills: [...root.querySelectorAll('[data-fill]')],
      fades: [...root.querySelectorAll('[data-fade]')], last: -1};
  });
  let pending = false;
  function draw() {
    pending = false;
    // Read positions before writing SVG styles, avoiding repeated layout work.
    const values = scenes.map(scene => {
      if (reduced.matches) return {progress:1, current:-1};
      if (scene.steps.length && (scene.kind === 'journey' || !compact.matches)) {
        const current = scene.kind === 'leadership'
          ? scene.steps.reduce((latest, step, i) => step.getBoundingClientRect().top <= innerHeight * .7 ? i : latest, -1)
          : -1;
        const progress = scene.steps.reduce((sum, step) => {
          const rect = step.getBoundingClientRect();
          return sum + clamp((innerHeight * .7 - rect.top) / Math.max(1, Math.min(rect.height * 1.25, innerHeight * 1.2)));
        }, 0) / scene.steps.length;
        return {progress, current};
      }
      const rect = scene.root.getBoundingClientRect();
      const trigger = compact.matches ? .70 : .78;
      return {progress:clamp((innerHeight * trigger - rect.top) / Math.max(1, Math.min(rect.height * 1.35, innerHeight * 1.25))), current:-1};
    });
    scenes.forEach((scene, index) => {
      const {progress,current} = values[index];
      if (scene.last === progress && scene.lastCurrent === current) return;
      scene.last = progress;
      scene.lastCurrent = current;
      scene.paths.forEach(({element, length}) => {
        element.style.strokeDasharray = length;
        element.style.strokeDashoffset = length * (1 - phase(progress, element));
      });
      scene.fills.forEach(element => {
        const hidden = (1 - phase(progress, element)) * 100;
        element.style.clipPath = element.dataset.fillAxis === 'x' ? `inset(0 ${hidden}% 0 0)` : `inset(${hidden}% 0 0 0)`;
      });
      scene.fades.forEach(element => { element.style.opacity = 1 - progress * .85; });
      scene.steps.forEach((step, i) => {
        step.classList.toggle('is-reached', reduced.matches || progress * scene.steps.length > i);
        const reachedMidpoint = scene.kind === 'leadership' ? current === i : Math.floor(progress * scene.steps.length) === i;
        step.classList.toggle('is-current', !(scene.kind === 'leadership' && compact.matches) && !reduced.matches && reachedMidpoint);
      });
    });
    document.documentElement.classList.add('story-motion-ready', 'drawing-ready');
  }
  function queue() { if (!pending) { pending = true; requestAnimationFrame(draw); } }
  if (scenes.length) {
    addEventListener('scroll', queue, {passive:true});
    addEventListener('resize', () => { scenes.forEach(scene => { scene.last = -1; }); queue(); }, {passive:true});
    addEventListener('pageshow', queue);
    reduced.addEventListener('change', () => { scenes.forEach(scene => { scene.last = -1; }); draw(); });
    draw();
  }
  // Native details remain usable with no script, touch or keyboard.
  document.querySelectorAll('[data-network-detail]').forEach(detail => {
    const node = detail.closest('section')?.querySelector(`[data-node="${detail.dataset.networkDetail}"]`);
    detail.addEventListener('toggle', () => node?.classList.toggle('is-selected', detail.open));
  });
  const lab = document.querySelector('[data-lab]');
  if (!lab) return;
  const load = async () => {
    try { const module = await import(new URL('lab/controller.js?v=055dad93bb5a', document.querySelector('script[src*="assets/story.js"]').src)); module.mountLab(lab); }
    catch { lab.querySelector('[data-lab-status]').textContent = 'The interactive experiment could not load. The diagram and explanation are still available.'; }
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { if (entries.some(e=>e.isIntersecting)) {observer.disconnect(); load();} }, {rootMargin:'300px'}); observer.observe(lab);
  } else load();
})();
