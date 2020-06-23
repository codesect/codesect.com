(function () {
  const faq = document.querySelector('.faq');
  const invitation = document.querySelector('#invitation');
  const inviteCodeInput = document.querySelector('#code');
  const menu = document.querySelector('#menu');
  const menuToggle = document.querySelector('#toggle-menu');

  const INVITE_URL =
    'https://europe-west3-codesect-invite.cloudfunctions.net/validate';

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

  function handleInviteCodeInput() {
    invitation.querySelector('.message--error').hidden = true;
    inviteCodeInput.setAttribute('aria-invalid', 'false');
  }

  function validateInviteCode(e) {
    e.preventDefault();

    const code = inviteCodeInput.value;
    const submitButton = invitation.querySelector('.form__btn');
    const errorMessage = invitation.querySelector('.message--error');

    if (!code.match(/[\w]{8}/)) return;

    errorMessage.textContent = '';
    invitation.setAttribute('aria-busy', 'true');
    inviteCodeInput.setAttribute('disabled', '');
    submitButton.setAttribute('disabled', '');

    fetch(INVITE_URL, {
      method: 'POST',
      body: JSON.stringify({
        code,
      }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }

        return res.json();
      })
      .then(data => {
        invitation.setAttribute('aria-busy', 'false');
        inviteCodeInput.removeAttribute('disabled');
        submitButton.removeAttribute('disabled');

        if (data && data.error) {
          errorMessage.hidden = false;
          errorMessage.textContent = 'You entered an invalid code.';
          inviteCodeInput.setAttribute('aria-invalid', 'true');
          inviteCodeInput.focus();
          return;
        }

        if (data && data.redirect) {
          window.location = data.redirect;
        }
      })
      .catch(err => {
        errorMessage.hidden = false;
        errorMessage.textContent = 'Something went wrong. Please try again!';
        invitation.setAttribute('aria-busy', 'false');
        inviteCodeInput.removeAttribute('disabled');
        submitButton.removeAttribute('disabled');
        inviteCodeInput.focus();
        console.error({ error: err.message });
        return;
      });
  }

  if (invitation) {
    invitation.addEventListener('submit', validateInviteCode);
    inviteCodeInput.addEventListener('input', handleInviteCodeInput);
  }
})();
