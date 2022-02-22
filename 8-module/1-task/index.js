import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    let initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
    document.addEventListener('scroll', () => this.updatePosition(initialTopCoord));
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition(initialTopCoord) {
     // корзина при экране меньше 767
     let mobileDevice = document.documentElement.clientWidth; 
     if (mobileDevice <= 767) {
       this.elem.style.position = '';
       this.elem.style.zIndex = '';
       this.elem.style.right = '';
       this.elem.style.left = '';
       return;
      };

    
    if (window.pageYOffset > initialTopCoord) {
      this.elem.style.position = 'fixed'; // ставим корзине фиксированное положение

      let containerElem = document.querySelector(".container");

      if((containerElem.getBoundingClientRect().right + 100) > document.documentElement.clientWidth){ //если меню занимает всю ширину страницы

        this.elem.style.right = 10 +'px'; //  10px от правой границы окна
        this.elem.style.zIndex = 10; // ставим видимость для корзины поверх меню

      } else {  // если меню не занимает всю ширину страницы
      this.elem.style.left = containerElem.getBoundingClientRect().right + 20 + 'px'; //  20px от элемента .container
      };
       
    } else { // возвращаем все назад при прокрутке обратно вверх
      this.elem.style.position = 'absolute';
      this.elem.style.zIndex = '';
      this.elem.style.right = '';
      this.elem.style.left = '';

    }; 

   
}
}



