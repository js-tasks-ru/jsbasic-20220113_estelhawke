import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {

  elem = document.createElement("div");

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem.classList.add("slider");

    this.sliderHTML = createElement(`
    <div class="slider__thumb">
      <span class="slider__value" style="left: 50%;"></span>
     </div>`);

    this.sliderHTML2 = createElement(`<div class="slider__progress" style = "width: 0%">
     </div>`);

    this.elem.append(this.sliderHTML);
    this.elem.append(this.sliderHTML2);

    this.#sliderSteps();
    this.#listenerClick();
    this.#listenerDrag();
    }



   // функция для установления количества шагов слайдера
    #sliderSteps = () => {
      let divSteps = document.createElement("div");
      divSteps.classList.add("slider__steps");

      let result = [];
      for(let number = 0; number < this.steps; number++) {
        result.push("<span></span>");
      };

      divSteps.innerHTML = result.join("");
      divSteps.querySelector("span").classList.add("slider__step-active");
      this.elem.append(divSteps);
      }

      //функция с обработчиком-события клик
     #listenerClick() {

       function onClickElem () {

         let left = event.clientX - this.elem.getBoundingClientRect().left;
         let leftRelative = left / this.elem.offsetWidth;
         let segments = this.steps - 1;
         let approximateValue = leftRelative * segments;
         let value = Math.round(approximateValue);

         this.elem.querySelector(".slider__value").innerHTML = value;

         // визуально выделяем шаг на слайдере 
         let spansInSlidersteps = this.elem.querySelector(".slider__steps").children;
         let arraySpans = Array.from(spansInSlidersteps);

         arraySpans.forEach( function(item) {
           item.classList.contains("slider__step-active");
           item.classList.remove("slider__step-active")});

         spansInSlidersteps[value].classList.add("slider__step-active");

         //меняем положение ползунка
         let valuePercents = value / segments * 100;
        
         this.elem.querySelector(".slider__thumb").style.left = valuePercents + '%';

         this.elem.querySelector(".slider__progress").style.width = valuePercents + '%';

         //генерируем пользовательское событие slider-change
         let sliderChangeEvent = new CustomEvent('slider-change', {
           detail: value, 
           bubbles: true 
         });
         this.elem.dispatchEvent(sliderChangeEvent);
      }
         this.elem.addEventListener("click", onClickElem.bind(this));
    }




    //слушатель события перетаскивания ползунка
    #listenerDrag() {
      let OnDownBind = onDownElem.bind(this); //переменная с bind

      let slideThumb = this.elem.querySelector(".slider__thumb");

      slideThumb.addEventListener("pointerdown", OnDownBind);
      
      document.ondragstart = () => false;
      slideThumb.onpointerdown = () => false;
      document.onpointermove = () => false;
      document.onpointerup = () => false;

      //при нажатии мышки
      function onDownElem () {
        let onMoveBind = onMoveElem.bind(this); //переменная с bind      

        this.elem.classList.add("slider_dragging");

        //прикрепляем обработчики
        document.addEventListener("pointermove", onMoveBind);
 
        // функция при перемещении мышки
        function onMoveElem (event) {
            let onUpBind = onUpElem.bind(this); //переменная с bind

            let left = event.clientX - this.elem.getBoundingClientRect().left;
            
            let leftRelative = left / this.elem.offsetWidth;
    
             if (leftRelative < 0) {
                 leftRelative = 0;
            };
    
             if (leftRelative > 1) {
                 leftRelative = 1;
              };
            
             let leftPercents = leftRelative * 100;
    
             slideThumb.style.left = leftPercents + '%';
    
             this.elem.querySelector(".slider__progress").style.width = leftPercents + '%';
    
             let segments = this.steps - 1;
             let approximateValue = leftRelative * segments;
             let value = Math.round(approximateValue);
    
             this.elem.querySelector(".slider__value").innerHTML = value;
         
          
            // функция при отпускании клавиши мышки
             document.addEventListener("pointerup", onUpBind);

             function onUpElem() {
              if (this.elem.classList.contains(".slider_dragging")){
                this.elem.classList.remove(".slider_dragging")};

              //генерируем пользовательское событие slider-change
              let sliderChangeEvent = new CustomEvent('slider-change', {
                detail: value, 
                bubbles: true 
              });
              this.elem.dispatchEvent(sliderChangeEvent);

              document.removeEventListener("pointermove", onMoveBind);
          }
        }
      }
    }

   elem() {
    return this.elem;
  }
 
}


