var yandexMap = document.querySelector("#yandex-map");
if (yandexMap) {
  try {
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("yandex-map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [59.938631, 30.323055],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 16,
            controls: []
        });

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Магазин Мишка',
          balloonContent: 'Россия, Санкт-Петербург, Большая Конюшенная улица, 19/8'
        }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'img/map-pin.png',
          // Размеры метки.
          iconImageSize: [67, 100],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-34, -100]
        }),

        myMap.geoObjects.add(myPlacemark)
    }

    yandexMap.classList.remove("contacts__map--nojs");
  } catch (e) {
    console.log("невозможно отобразить яндекс карты");
  }
}

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

//Модальное окно добавления в корзину
var modalBasketAdd = document.querySelector(".js-modal-basket-add");

if (modalBasketAdd){
  var openButtons = document.querySelectorAll(".js-basket-add");
  for(var i = 0; i < openButtons.length; i++) {
    openButtons[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      modalBasketAdd.classList.add("modal--show");
    });
  }

  var closeModal = function() {
    if (modalBasketAdd.classList.contains("modal--show")) {
      modalBasketAdd.classList.remove("modal--show");
      return true;
    }
    return false;
  }

  //закрытие модальных окон по ESC
  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      if (closeModal()) evt.preventDefault();
    }
  });

  //закрытие модальных окон по click на overlay
  var overlay = document.querySelector(".modal");
  overlay.addEventListener("click", function (evt) {
    if (evt.target !== this) return;
    closeModal();
    evt.preventDefault();
  });
}
