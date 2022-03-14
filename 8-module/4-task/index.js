import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if (product === null || product === undefined) return; // проверка на null/undefined товар

    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (!cartItem) { // проверка есть ли товар в корзине 
      cartItem = {
        product,
        count : 1 // установление count : 1
      };
      this.cartItems.push(cartItem); //  добавление товара в корзину  
    } else {
      cartItem.count + 1;
    };
    this.onProductUpdate(cartItem);
  
}

updateProductCount(productId, amount) {

  let cartItem = this.cartItems.find(item => item.product.id == productId);
    cartItem.count += amount;
    
     if (cartItem.count === 0) {
       this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);   // удаление товара
      };
      
     this.onProductUpdate(cartItem);
  }
  

  isEmpty() {
    if (this.cartItems.length === 0) {
      return true;
    } else {
      return false;
    };
  }

  getTotalCount() {
    return this.cartItems.reduce((totalCount, product) => totalCount + product.count, 0);
  }

  getTotalPrice() {
   return this.cartItems.reduce((totalPrice, product) => totalPrice + (product.product.price * product.count), 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }
  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {  
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modalBody = document.createElement('div');

    this.cartItems.forEach((product) => 
    this.modalBody.append(this.renderProduct(product.product, product.count))); // прикрепляем каждый продукт к телу модального окна

    this.modalBody.addEventListener('click', (event) => {  // установка обработчиков на все тело окна
      let target = event.target.closest('button');

      if(!target) return; // проверка что кликнули именно на кнопку
      if(target) {
        if(target.classList.contains('cart-counter__button_plus')) {
          let productToPlus = target.closest('[data-product-id]').dataset.productId;
          let amount = 1;
          this.updateProductCount(productToPlus, amount);
        };
        if(target.classList.contains('cart-counter__button_minus')) {
          let productToMinus = target.closest('[data-product-id]').dataset.productId;
          let amount = - 1;
          this.updateProductCount(productToMinus, amount);
      }
    };
    let cartOnSubmit = this.modalBody.querySelector('.cart-form');
    cartOnSubmit.onsubmit = (event) => this.onSubmit(event); // вешаем обработчик onsubmit 
  });
    this.modalBody.appendChild(this.renderOrderForm());  // прикрепляем форму для заказа 

    this.modal.setBody(this.modalBody);
    this.modal.open();
  }


  // функция отображения товара в модальном окне и корзине
  onProductUpdate(cartItem) { 
    this.cartIcon.update(this); // обновление иконки корзины

    let productId = cartItem.product.id;

    if(document.body.classList.contains('is-modal-open')) {

      if (this.isEmpty()) {  // проверка пуста ли корзина, если пуста удаление 
        let modal = new Modal();
        modal.close();
        return;
      };

      if(cartItem.count === 0) {
        this.modalBody.querySelector(`[data-product-id="${productId}"]`).remove();  // удаляем если количество товара = 0

      } else {

        let productId = cartItem.product.id; // id товара 

        // Элемент, который хранит количество товаров с таким productId в корзине
        let productCount = this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);

        // Элемент с общей стоимостью всех единиц этого товара
        let productPrice = this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

        // Элемент с суммарной стоимостью всех товаров
        let infoPrice = this.modalBody.querySelector(`.cart-buttons__info-price`);

        productCount.innerHTML = cartItem.count;    
        productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;  
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      };     
    };
  }


   async onSubmit(event) {
    event.preventDefault();  // предотвращение перезагрузки страницы 
    let buttonSubmit = this.modalBody.querySelector('button[type="submit"]'); 
    buttonSubmit.classList.add('is-loading');
    let submitForm = this.modalBody.querySelector('.cart-form');
    let formData = new FormData(submitForm)  // формирование formData

   await fetch('https://httpbin.org/post', {  // ждем fetch
      method: 'POST',
      body: formData,
    });

      this.modal.setTitle('Success!');
      buttonSubmit.classList.remove('is-loading');
      this.cartItems = [];
      this.cartIcon.update(this);
      this.modalBody.innerHTML =`
      <div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>
    `;
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}


