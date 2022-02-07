function toggleText() {
  
  let buttonToClick = document.querySelector(".toggle-text-button");

  buttonToClick.addEventListener('click', () => {
  let textToHide = document.getElementById('text');
    textToHide.hidden = !textToHide.hidden
  });
}

