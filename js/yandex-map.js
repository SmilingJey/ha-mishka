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
