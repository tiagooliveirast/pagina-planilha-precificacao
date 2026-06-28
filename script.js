/* ============================================
   Tiago Sheik — Planilha de Precificação
   JavaScript (IntersectionObserver, FAQ, Sticky CTA, Tracking)
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Fade-In com IntersectionObserver ── */
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }



});

/* ── FAQ Accordion ── */
function toggleFaq(button) {
  var item = button.parentElement;
  var isOpen = item.classList.contains('open');

  // Fecha todos
  var allItems = document.querySelectorAll('.faq-item.open');
  allItems.forEach(function (el) {
    el.classList.remove('open');
  });

  // Abre o clicado se estava fechado
  if (!isOpen) {
    item.classList.add('open');
  }
}

/* ── Tracking (placeholder para pixel) ── */
function trackCheckout(plano) {
  console.log('[Track] Checkout iniciado — plano:', plano);
  // FUTURO: disparar evento do pixel aqui
  // Exemplo: if (typeof fbq !== 'undefined') fbq('track', 'Purchase', ...);
  // Exemplo: if (typeof gtag !== 'undefined') gtag('event', 'purchase', ...);
}
