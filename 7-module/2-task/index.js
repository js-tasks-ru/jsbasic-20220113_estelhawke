import createElement from '../../assets/lib/create-element.js';

export default class Modal {

  body = document.querySelector("body");

  constructor() {
    this.body.classList.add("is-modal-open");
    this.modalWindowHtml = createElement(`
    <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title"></h3>
        <div class="modal__body"></div>
        </div>`);
    this.modalBody = this.modalWindowHtml.querySelector(".modal__body");
    this.modalTitle = this.modalWindowHtml.querySelector(".modal__title");
  }

  //функция названия окна

  setTitle(title) {
    this.modalTitle.innerHTML = title;
  }

  // функция тела окна

  setBody(node) {
    this.modalBody.append(node);
  }

  // создание окна

  open() {

     this.body.append(this.modalWindowHtml);

     // крепим обработчик события клик на кнопку

     let modalButton = this.body.querySelector(".modal__close");

     modalButton.addEventListener("click", () => this.close());

    //вешаем обработчик события нажатия ESCAPE 

    const onKeydown = (event) => {
      if (event.code === 'Escape') {
         this.close();
         };
        document.removeEventListener ("keydown", onKeydown);
    }
    document.addEventListener("keydown", onKeydown);
  } 

  //функция для закрытия окна

  close() {
    if(this.body.classList.contains("is-modal-open")) {
    this.body.classList.remove("is-modal-open");

    let modalToRemove = this.body.querySelector(".modal");
    modalToRemove.remove();
  }};
  
}



