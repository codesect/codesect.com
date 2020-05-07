(function () {
  const faq = document.querySelector('.faq');
  const menu = document.querySelector('#menu');
  const menuToggle = document.querySelector('#toggle-menu');

  function handleMenuButtonClick() {
    if (this.getAttribute('aria-expanded') === 'true') {
      this.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-active');
    } else {
      this.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-active');
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', handleMenuButtonClick);
  }

  function handleFaqClick(e) {
    if (e.target.classList.contains('faq__title')) {
      e.target.nextElementSibling.click();
      return;
    }

    if (!e.target.classList.contains('faq__toggle')) {
      return;
    }

    const answer = e.target.nextElementSibling;
    const button = e.target;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      answer.hidden = true;
      button.setAttribute('aria-expanded', 'false');
    } else {
      answer.hidden = false;
      button.setAttribute('aria-expanded', 'true');
    }
  }

  function handleHashChange() {
    const { hash } = window.location;
    const answer = hash
      ? document.querySelector(hash)
      : document.querySelector('.faq__answer');

    if (!answer) return;

    const button = answer.previousElementSibling;

    answer.hidden = false;
    button.setAttribute('aria-expanded', 'true');
  }

  if (faq) {
    faq.addEventListener('click', handleFaqClick);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('load', handleHashChange);
  }
})();
