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
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {

    if(!this.initialTopCoord){ // высчитываем значение initialTopCoord, если его нет
      this.initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
    }

     // корзина при экране меньше 767
     let mobileDevice = document.documentElement.clientWidth; 
     if (mobileDevice <= 767) {
       this.elem.style.position = '';
       this.elem.style.zIndex = '';
       this.elem.style.right = '';
       this.elem.style.left = '';
       return;
      };

    
    if (window.pageYOffset > this.initialTopCoord) {
      this.elem.style.position = 'fixed'; // ставим корзине фиксированное положение
      this.elem.style.top = '50px';

      let leftIndent = Math.min(  // выбираем меньшее из:
        document.querySelector('.container').getBoundingClientRect().right + 20,  //Значение, чтобы отступ был 20px справа от первого элемент в документе с классом container 
        document.documentElement.clientWidth - this.elem.offsetWidth - 10  //Значение, чтобы отступ от правого края экрана был 10px
      ) + 'px';

      this.elem.style.left = leftIndent;
      this.elem.style.zIndex = 99;
       
    } else { // возвращаем все назад при прокрутке обратно вверх
      this.elem.style.position = 'absolute';
      this.elem.style.zIndex = '';
      this.elem.style.right = '';
      this.elem.style.left = '';

    }; 

   
}
}



