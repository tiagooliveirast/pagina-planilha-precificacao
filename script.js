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

  /* ── Preserva UTMs nos links de checkout ── */
  var params = new URLSearchParams(window.location.search);
  var src = params.get('src');
  var sck = params.get('sck');
  var checkoutLinks = document.querySelectorAll('a[href*="pay.hotmart.com/"]');

  checkoutLinks.forEach(function (link) {
    var url = new URL(link.href, window.location.origin);
    if (src) url.searchParams.set('src', src);
    if (sck) url.searchParams.set('sck', sck);
    link.href = url.toString();
  });



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
    var isBasic = plano === 'basic';
    var value = isBasic ? 9.90 : 37.00;
    var contentName = isBasic ? 'Planilha de Precificação' : 'Planilha + Kit Fechamento';
    if (typeof fbq !== 'undefined') {
      fbq('track', 'InitiateCheckout', {
        content_name: contentName,
        value: value,
        currency: 'BRL'
      });
    }
    // Descomente quando instalar o Google Tag:
    // if (typeof gtag !== 'undefined') gtag('event', 'begin_checkout', { value: value, currency: 'BRL' });
  } catch (e) { console.warn('[Track] erro', e); }
  console.log('[Track] Checkout iniciado — plano:', plano);
}

/* ── Social Proof Popup: vendas simuladas em intervalo curto ──
   CONFIG: ajuste aqui tempos e nomes. Intervalo 25-55s (média ~40s).
   Para usar vendas reais depois, troque o array por fetch da sua API. */
(function () {
  var popup = document.getElementById('spPopup');
  if (!popup) return;
  var elName = document.getElementById('spName');
  var elProduct = document.getElementById('spProduct');
  var elTime = document.getElementById('spTime');
  var elAvatar = document.getElementById('spAvatar');
  var btnClose = document.getElementById('spClose');

  // EDITE: nomes + cidades do seu público (técnicos)
  var buyers = [
    ['Carlos', 'Fortaleza/CE'], ['Diego', 'São Paulo/SP'], ['Anderson', 'Recife/PE'],
    ['Marcos', 'Salvador/BA'], ['Paulo', 'Belo Horizonte/MG'], ['Rafael', 'Curitiba/PR'],
    ['Lucas', 'Goiânia/GO'], ['Thiago', 'Manaus/AM'], ['Bruno', 'Rio de Janeiro/RJ'],
    ['Felipe', 'Porto Alegre/RS'], ['João', 'Belém/PA'], ['Igor', 'Campinas/SP'],
    ['Renan', 'Maceió/AL'], ['Everton', 'Florianópolis/SC'], ['Cláudio', 'Vitória/ES'],
    ['Marcelo', 'Natal/RN'], ['Alex', 'João Pessoa/PB'], ['Rodrigo', 'Cuiabá/MT'],
    ['Gustavo', 'Aracaju/SE'], ['Leandro', 'Teresina/PI'], ['Wesley', 'Santos/SP'],
    ['Danilo', 'Osasco/SP'], ['Jean', 'São Luís/MA'], ['Maicon', 'Londrina/PR']
  ];

  var lastIndex = -1;
  var closedForever = false;

  function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function pickBuyer() {
    var i;
    do { i = rand(0, buyers.length - 1); } while (i === lastIndex);
    lastIndex = i;
    return buyers[i];
  }

  function showPopup() {
    if (closedForever) return;
    var b = pickBuyer();
    elName.textContent = b[0] + ' · ' + b[1];
    elAvatar.textContent = b[0].charAt(0).toUpperCase();
    elProduct.textContent = 'Planilha + Kit Fechamento';
    elTime.textContent = 'há ' + rand(1, 4) + ' min · via ' + (Math.random() < 0.6 ? 'Pix' : 'cartão') + ' ✓';
    popup.classList.add('show');
    // visível por 6s, depois esconde e agenda o próximo
    setTimeout(hidePopup, 6000);
  }

  function hidePopup() {
    popup.classList.remove('show');
    scheduleNext();
  }

  function scheduleNext() {
    if (closedForever) return;
    // 25s a 55s aleatório (média ~40s, nunca passa de 1 min)
    var next = rand(25000, 55000);
    setTimeout(showPopup, next);
  }

  if (btnClose) {
    btnClose.addEventListener('click', function () {
      popup.classList.remove('show');
      // Fecha só esse aviso; o ciclo continua. Para parar tudo, descomente:
      // closedForever = true;
      scheduleNext();
    });
  }

  // Primeira aparição rápida: 8-12s após entrar (pega o visitante ainda no hero)
  setTimeout(showPopup, rand(8000, 12000));
})();

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
