const startEl = document.querySelector('[data-start]');
const stopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

startEl.addEventListener('click', onStartRundomColorForBody);
stopEl.addEventListener('click', onStopRundomColor);
stopEl.disabled = true;

let timerId = null;

function onStartRundomColorForBody() {
  startEl.disabled = true;
  stopEl.disabled = false;

  addsRundomColorForBody();

  timerId = setInterval(addsRundomColorForBody, 1000);
}

function onStopRundomColor() {
  clearTimeout(timerId);
  startEl.disabled = false;
  stopEl.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function addsRundomColorForBody() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}
