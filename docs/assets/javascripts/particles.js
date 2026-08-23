document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('[data-celestiq-particles]');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  canvas.setAttribute('aria-hidden', 'true');
});
