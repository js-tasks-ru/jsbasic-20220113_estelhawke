import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {

  }

  async render() {
    // рендерим карусель
    let carouselHolder = document.body.querySelector('[data-carousel-holder]');
    let carousel = new Carousel(slides);
    carouselHolder.append(carousel.elem);

    // рендерим ленту
    let ribbonHolder = document.body.querySelector('[data-ribbon-holder]');
    let ribbonMenu = new RibbonMenu(categories);
    ribbonHolder.append(ribbonMenu.elem);

    // рендерим слайдер
    let stepSliderHolder = document.body.querySelector('[data-slider-holder]');
    let stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    stepSliderHolder.append(stepSlider.elem);

    // рендер иконки
    let cartIconHolder = document.body.querySelector('[data-cart-icon-holder]');
    let cartIcon = new CartIcon();
    cartIconHolder.append(cartIcon.elem);
    let cart = new Cart(cartIcon);
 
    //получение данных с сервера
    let response = await fetch('products.json');
    let products = response.json();

    //рендер грид
    let productsGridHolder = document.body.querySelector('[data-products-grid-holder]');
    let productsGrid = new ProductsGrid(products);
    productsGridHolder.innerHTML = '';
    productsGridHolder.append(productsGrid.elem);




  }
}
