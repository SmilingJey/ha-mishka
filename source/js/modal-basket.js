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
