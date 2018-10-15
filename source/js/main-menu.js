var navMain = document.querySelector('.main-menu');
var navToggle = document.querySelector('.main-menu__toggle');

navMain.classList.remove('main-menu--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-menu--closed')) {
    navMain.classList.remove('main-menu--closed');
    navMain.classList.add('main-menu--opened');
  } else {
    navMain.classList.add('main-menu--closed');
    navMain.classList.remove('main-menu--opened');
  }
});
