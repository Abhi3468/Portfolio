const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');

function toggleNavigation() {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? 'CLOSE' : 'MENU';
}

function closeNavigation() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'MENU';
}

menuButton.addEventListener('click', toggleNavigation);
document.querySelectorAll('.navigation a').forEach((link) => link.addEventListener('click', closeNavigation));
