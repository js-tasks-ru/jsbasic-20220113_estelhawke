function toggleText() {
  
  let buttonToClick = document.querySelector(".toggle-text-button");

  buttonToClick.addEventListener("click", function(event) {
      let textToHide = document.getElementById('text');
      textToHide.hidden = !textToHide.hidden;
  });
}

