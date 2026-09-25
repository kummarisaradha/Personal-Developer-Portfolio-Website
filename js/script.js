document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const body = document.body;
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.querySelector('.theme-toggle');
  const typedText = document.querySelector('.typed-text');
  const phrases = ['frontend developer', 'web enthusiast', 'curious maker'];
  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  const updateMenu = (isOpen) => {
    navMenu.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    menuToggle.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}"></i>`;
    lucide.createIcons();
  };

  menuToggle.addEventListener('click', () => updateMenu(!navMenu.classList.contains('is-open')));
  navLinks.forEach((link) => link.addEventListener('click', () => updateMenu(false)));

  themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  });

  const typePhrase = () => {
    const phrase = phrases[phraseIndex];
    typedText.textContent = phrase.slice(0, characterIndex);
    if (!deleting && characterIndex < phrase.length) {
      characterIndex += 1;
      setTimeout(typePhrase, 80);
    } else if (!deleting && characterIndex === phrase.length) {
      deleting = true;
      setTimeout(typePhrase, 1700);
    } else if (deleting && characterIndex > 0) {
      characterIndex -= 1;
      setTimeout(typePhrase, 42);
    } else {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typePhrase, 350);
    }
  };
  typePhrase();

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

  document.querySelector('.contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const status = document.querySelector('.form-status');
    status.textContent = 'Thanks for reaching out. This demo form is ready to connect.';
    event.target.reset();
  });
});
