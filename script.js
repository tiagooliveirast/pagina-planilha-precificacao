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

/* ── Tracking (Meta Pixel + pronto p/ Google) ── */
function trackCheckout(plano) {
  try {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'InitiateCheckout', {
        content_name: plano === 'pro' ? 'Planilha PRO' : 'Planilha Basica',
        value: plano === 'pro' ? 37.00 : 9.90,
        currency: 'BRL'
      });
    }
    // Descomente quando instalar o Google Tag:
    // if (typeof gtag !== 'undefined') gtag('event', 'begin_checkout', { value: plano === 'pro' ? 37 : 9.9, currency: 'BRL' });
  } catch (e) { console.warn('[Track] erro', e); }
  console.log('[Track] Checkout iniciado — plano:', plano);
}

/* ── Sticky CTA: só aparece depois do hero ── */
(function () {
  var sticky = document.getElementById('stickyCta');
  if (!sticky) return;
  // Esconde no desktop via CSS; no mobile controla por scroll
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var precos = document.getElementById('precos');
    var precosTop = precos ? precos.offsetTop : 99999;
    // mostra após 500px, esconde quando o bloco de preço está visível (evita duplicar CTA)
    if (y > 500 && y < precosTop - 200) {
      sticky.classList.add('show');
    } else if (y >= precosTop - 200) {
      sticky.classList.remove('show');
    } else {
      sticky.classList.remove('show');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
