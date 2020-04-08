var header = document.querySelector('.page-header');
var headerToggle = document.querySelector('.page-header__menu-toggle');

if (header && headerToggle) {
  header.classList.remove('page-header--nojs');

  headerToggle.addEventListener('click', function() {
    if (header.classList.contains('page-header--menu-opened')) {
      header.classList.remove('page-header--menu-opened');
    } else {
      header.classList.add('page-header--menu-opened');
    }
  });
}
