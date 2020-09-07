const go = (event) => {
    window.location.href = 'http://localhost:3000/trending/' + input.value;
}

const button = document.getElementsByClassName("search")[0];
const input = document.getElementsByClassName("input")[0];
button.addEventListener("click", (event) => go(event));
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    console.log('This is a test');
      event.preventDefault();
      button.click();
    }
  });