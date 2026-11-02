(() => {
  const roots = [...document.querySelectorAll('[data-pareto-root]')];
  if (!roots.length) return;
  const script = document.currentScript || [...document.scripts].find((item) => item.src.includes('pareto-mold-fill.js'));
  if (!script) return;
  const moduleUrl = new URL('lab/pareto-mold-fill-controller.js', script.src);
  moduleUrl.searchParams.set('v', '055dad93bb5a');
  import(moduleUrl.href)
    .then(({ mountParetoFill }) => roots.forEach((root) => mountParetoFill(root)))
    .catch(() => {
      roots.forEach((root) => {
        const status = root.querySelector('[data-fill-status]');
        if (status) status.textContent = 'Static drawing. Interactive fill could not load.';
      });
    });
})();
