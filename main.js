(function() {
  const faq = document.querySelector('.faq');
  const menu = document.querySelector('#menu');
  const toggle = document.querySelector('#toggle-menu');

  function handleMenuButtonClick() {
    if (menu.classList.contains('is-active')) {
      this.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-active');
    } else {
      this.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-active');
    }
  }

  toggle.addEventListener('click', handleMenuButtonClick);

  // FAQ toggles
  function handleFaqButtonClick(e) {
    if (e.target.classList.contains('faq__title')) {
      e.target.nextElementSibling.click();
      return;
    }

    if (!e.target.classList.contains('faq__toggle')) {
      return;
    }

    const button = e.target;
    const target = e.target.nextElementSibling;
    const isExpanded = e.target.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      button.setAttribute('aria-expanded', 'false');
      target.hidden = true;
    } else {
      button.setAttribute('aria-expanded', 'true');
      target.hidden = false;
    }
  }

  function handleHashChange() {
    const { hash } = window.location;
    if (!hash) return;

    const item = document.querySelector(hash);
    if (!item) return;

    item.hidden = false;
    item.previousElementSibling.setAttribute('aria-expanded', 'true');
  }

  if (faq) {
    faq.addEventListener('click', handleFaqButtonClick);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('load', handleHashChange);
  }
})();
