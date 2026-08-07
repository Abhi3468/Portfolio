const menu = document.querySelector('.menu');
const nav = document.querySelector('.header nav');
menu.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('.header nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
