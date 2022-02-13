export default class Carousel {

  mainCarousel = document.createElement("div");

  constructor(slides) {
    this.slides = slides;
    this.createCarousel(slides);
    this.initCarousel();

  }

  createCarousel(slides) {

    //добавляем к главному div класс "carousel"

    this.mainCarousel.classList.add("carousel");

    //создаем стрелочки

    let slideArrows = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
       </div>`;

    // создаем слайды

    let slide =`<div class="carousel__inner"> ${this.slides.map((item) => 
                `<div class="carousel__slide" data-id="${item.id}">
                    <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
                    <div class="carousel__caption">
                        <span class="carousel__price">€${item.price.toFixed(2)}</span>
                      <div class="carousel__title">${item.name}</div>
                      <button type="button" class="carousel__button">
                        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                      </button>
                    </div>
                </div>`).join('')} </div>`;

   // крепим стрелочки к главному div

    this.mainCarousel.innerHTML = slideArrows;

   //крепим слайды к главному div

    this.mainCarousel.insertAdjacentHTML("beforeend", slide);
       
   // вешаем CustomEvent на кнопку "+"

    let slideButton = this.mainCarousel.querySelectorAll(".carousel__button");
 

    slideButton.forEach(function (item) {
      item.addEventListener("click", function () {
        let productAddEv = new CustomEvent("product-add", {
          detail: this.closest('[data-id]').dataset.id,
          bubbles: true,
        }); 
        this.dispatchEvent(productAddEv);
      });
    }); 
  }


    // функция для переключения слайдов

   initCarousel() {

    //назначаем необходимые элементы

    let sliderBelt = this.mainCarousel.querySelector(".carousel__inner");

    let sliderHolder =  document.querySelector(".container");

    let arrowRight = this.mainCarousel.querySelector(".carousel__arrow_right");
  
    let arrowLeft = this.mainCarousel.querySelector(".carousel__arrow_left");
    
    arrowLeft.style.display = 'none';

    let click = 1;

    //вешаем обработчик событий на div.container

    sliderHolder.addEventListener("click", function(event){

        let target = event.target.closest('.carousel__arrow');

        if(target == arrowRight) {
          arrowLeft.style.display = '';
          sliderBelt.style.transform = 'translateX(' + (-sliderBelt.offsetWidth * click) + 'px)';
          ++click;

          if (click === sliderBelt.children.length) {
            arrowRight.style.display = 'none';
          }
        };

        if(target == arrowLeft) { 
          arrowRight.style.display = '';
          sliderBelt.style.transform = 'translateX(' + (-sliderBelt.offsetWidth * (click - 2)) + 'px)';

          if(click === 2 ){
            arrowLeft.style.display = 'none';
          } 

          click--;
        }
    });
}

  get elem() {
    return this.mainCarousel;
  }

}
