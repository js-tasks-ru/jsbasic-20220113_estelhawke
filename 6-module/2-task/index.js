export default class ProductCard {
  parent = document.createElement("div");

  constructor(product) {
      this.product = product;
      this.createHTML();
  }

  // создаем шаблон HTML для карточки 

  createHTML (product) {

   let htmlTemplate =  `
    <div class="card">
      <div class="card__top"> 
        <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
        <span class="card__price">€${this.product.price.toFixed(2)} </span>
      </div>
      <div class="card__body">
          <div class="card__title">${this.product.name}
      </div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`;


    // прикрепляем шаблон к div

    this.parent.innerHTML = htmlTemplate; 

    //создаем пользовательское событие "product-add"

    let productAddEvent = new CustomEvent("product-add", {
        detail: this.product.id,
        bubbles: true,
    });


    //крепим обработчик события "click" и пользовательское событие на кнопки

    let cardButton = this.parent.querySelectorAll(".card__button");

    cardButton.forEach(function (item) {
      item.addEventListener("click", function () {
        this.dispatchEvent(productAddEvent); 
      });
    });
  }
      

  get elem () {
      return this.parent;
  }
}

