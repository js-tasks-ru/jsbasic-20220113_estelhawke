function hideSelf() {

  let buttonToHide = document.querySelector(".hide-self-button");

  buttonToHide.addEventListener('click', function(event) {
    buttonToHide.hidden = true;
  });

}
