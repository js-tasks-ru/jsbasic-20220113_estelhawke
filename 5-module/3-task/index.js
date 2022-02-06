function initCarousel() {
    let sliderBelt = document.querySelector(".carousel__inner");

    let sliderHolder =  document.querySelector(".container");

    let arrowRight = document.querySelector(".carousel__arrow_right");
  
    let arrowLeft = document.querySelector(".carousel__arrow_left");

    arrowLeft.style.display = 'none';

    let click = 1;

    sliderHolder.addEventListener("click", function(event){

        let target = event.target.closest('.carousel__arrow');

        if(target == arrowRight) {
   
          arrowLeft.style.display = '';

          let slideStyle = sliderBelt.style.transform = 'translateX(' + (-sliderBelt.offsetWidth * click) + 'px)';

          ++click;

          if (click === sliderBelt.children.length) {
            arrowRight.style.display = 'none';
          }
        };

        if(target == arrowLeft) { 

          arrowRight.style.display = '';

          let slideStyle = sliderBelt.style.transform = 'translateX(' + (-sliderBelt.offsetWidth * (click - 2)) + 'px)';

          if(click === 2 ){
            arrowLeft.style.display = 'none';
          } 

          click--;
        }
    });
}


