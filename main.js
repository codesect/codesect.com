(function () {
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
})();
