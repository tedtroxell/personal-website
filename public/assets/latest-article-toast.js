(() => {
  const toast = document.querySelector('[data-latest-article-toast]');
  if (!toast) return;

  const articleId = toast.dataset.articleId;
  const storageKey = `tt-latest-article-dismissed:${articleId}`;
  const dismissButton = toast.querySelector('[data-dismiss-article-toast]');
  const articleLink = toast.querySelector('[data-open-article-toast]');
  let revealTimer = 0;

  const wasDismissed = () => {
    try { return window.sessionStorage.getItem(storageKey) === '1'; }
    catch (_) { return false; }
  };
  const rememberDismissal = () => {
    try { window.sessionStorage.setItem(storageKey, '1'); }
    catch (_) { /* The notice still works when storage is unavailable. */ }
  };
  if (wasDismissed()) return;

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const shouldReveal = () => {
    const scrollableHeight = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const threshold = Math.min(800, Math.max(240, scrollableHeight * 0.06));
    return (window.scrollY || document.documentElement.scrollTop || 0) >= threshold;
  };
  const reveal = () => {
    revealTimer = 0;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('is-visible'));
  };
  const checkScroll = () => {
    if (shouldReveal()) {
      if (!revealTimer && toast.hidden) revealTimer = window.setTimeout(reveal, 350);
      return;
    }
    window.clearTimeout(revealTimer);
    revealTimer = 0;
  };
  const dismiss = () => {
    rememberDismissal();
    window.clearTimeout(revealTimer);
    toast.classList.remove('is-visible');
    window.setTimeout(() => { toast.hidden = true; }, reducedMotion ? 0 : 220);
  };

  dismissButton?.addEventListener('click', dismiss);
  articleLink?.addEventListener('click', rememberDismissal);
  window.addEventListener('scroll', checkScroll, { passive: true });
  window.addEventListener('resize', checkScroll);
  checkScroll();
})();
