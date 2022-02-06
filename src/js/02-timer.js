import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

btnStart.addEventListener('click', onStartCountdown);
inputEl.addEventListener('click', onAddsDateBefore);
btnStart.disabled = true;

// btnStart.setAttribute('disabled', true);

// function onStrop() {
//   if (
//     dataDays.value === 0 &&
//     dataHours.value === 0 &&
//     dataMinutes.value === 0 &&
//     dataSeconds.value === 0
//   ) {
//     return;
//   }
// }

const dateNow = Date.now();
const date = new Date();

// inputEl.value = date;

// if (new Date(inputEl.value).getTime() <= dateNow) {
//   btnStart.disabled = true;
// } else {
//   btnStart.disabled = false;
// }

// inputEl.value = new Date();

let isActive = false;

function onAddsDateBefore() {
  const options = {
    // clickOpens: true,
    allowInput: true,
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };

  // onAddsDateBefore();

  if (new Date(inputEl.value).getTime() <= dateNow) {
    btnStart.disabled = true;
  } else {
    btnStart.disabled = false;
  }

  flatpickr(inputEl, options);

  console.log('Click INPUT');
}

function onStartCountdown() {
  const dateInput = new Date(inputEl.value).getTime();
  // let intervalId = null;

  if (dateInput <= dateNow) {
    Notiflix.Notify.failure('Qui timide rogat docet negare');
    btnStart.disabled = true;
  } else {
    // btnStart.getAttribute('disabled');
    const intervalId = setInterval(() => {
      const dateNow = Date.now();
      const deltaTime = dateInput - dateNow;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      console.log(`${days}:${hours}:${minutes}:${seconds}`);
      dataDays.innerHTML = `${days}`;
      dataHours.innerHTML = `${hours}`;
      dataMinutes.innerHTML = `${minutes}`;
      dataSeconds.innerHTML = `${seconds}`;
      // btnStart.disabled = false;
      if (dateInput - Date.now() === 0) {
        clearInterval(intervalId);
        // btnStart.disabled = true;
        return;
      }
    }, 1000);

    isActive = true;

    Notiflix.Notify.success('Sol lucet omnibus');
  }

  console.log('Click on Start');
}

function addLeadingZero(val) {
  return String(val).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
