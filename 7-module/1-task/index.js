import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {

  ribbon = document.createElement('div');


  constructor(categories) {
    this.categories = categories;
    this.createRibbon();

  }

  createRibbon() {

    //добавляем к главному div класс "ribbon"

    this.ribbon.classList.add("ribbon");

    //создаем стрелочки

    let RibbonLeftArrow = `<button class="ribbon__arrow ribbon__arrow_left ">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon"> </button>`;

    let RibbonRightArrow = `<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon"> </button>`;

    // создаем ленту-меню

    let createRibbon = `<nav class="ribbon__inner"> ${this.categories.map((item) => `
      <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`).join('')}</nav>`;

     // крепим левую стрелочку к главному div

     this.ribbon.innerHTML = RibbonLeftArrow;

     //крепим ленту к главному div
  
      this.ribbon.insertAdjacentHTML("beforeend", createRibbon);

      // крепим правую стрелочку к главному div

      this.ribbon.insertAdjacentHTML("beforeend", RibbonRightArrow);

      //крепим обработчик событий (кликов) на div .ribbon

      let leftArrow = this.ribbon.querySelector(".ribbon__arrow_left");
      let rightArrow = this.ribbon.querySelector(".ribbon__arrow_right");
      let ribbonInner = this.ribbon.querySelector(".ribbon__inner");


      this.ribbon.addEventListener("click", function (event) {

          let target = event.target.closest('.ribbon__arrow');
          let targetInNav = event.target.closest("a");
  
          if(target == rightArrow) {
            leftArrow.classList.add("ribbon__arrow_visible");
            ribbonInner.scrollBy(350, 0);
            let scrollLeft = ribbonInner.scrollLeft;
  
            if (scrollLeft == 350) {
              rightArrow.classList.remove("ribbon__arrow_visible");
            }
          };
  
          if(target == leftArrow) { 
            rightArrow.classList.add("ribbon__arrow_visible")
            ribbonInner.scrollBy(-350, 0);
            let scrollWidth = ribbonInner.scrollWidth;
            let scrollLeft = ribbonInner.scrollLeft;
            let clientWidth = ribbonInner.clientWidth;
            let scrollRight = scrollWidth - scrollLeft - clientWidth;

            if(scrollRight > 0){
              leftArrow.classList.remove("ribbon__arrow_visible");
            } 
          };

          // в случае если клик произошел на ссылке <a>
          
          if(targetInNav) {

            event.preventDefault();

            //убираем подсвеченные ссылки, если они есть, добавляем подсветку к выбранной ссылке

            let allA =  this.querySelectorAll("a");
            Array.from(allA).forEach((item) => {
            item.classList.remove("ribbon__item_active")
            });
            targetInNav.classList.add("ribbon__item_active");

            // вешаем пользовательское событие на ribbon

            let ribbonProductSelected = new CustomEvent('ribbon-select', {
              detail: targetInNav.dataset.id,
              bubbles: true
            });

            this.dispatchEvent(ribbonProductSelected);
          }
   
      });

    }

   get elem() {
    return this.ribbon;
  }
}
