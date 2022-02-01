const startEl = document.querySelector('[data-start]');
const stopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

startEl.addEventListener('click', onStartRundomColorForBody);
stopEl.addEventListener('click', onStopRundomColor);

let timerId = null;
let isActive = false;

function onStartRundomColorForBody() {
  if (isActive) {
    return;
  }
  isActive = true;
  addsRundomColorForBody();

  timerId = setInterval(addsRundomColorForBody, 1000);
}

function onStopRundomColor() {
  clearTimeout(timerId);
  isActive = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function addsRundomColorForBody() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}
