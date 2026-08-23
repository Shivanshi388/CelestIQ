document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.md-content');
  if (!content || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  content.classList.add('celestiq-content-ready');
});
