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

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  dateFormat: 'Y.m.d / H:i',
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      Notiflix.Notify.success('You can start the timer!');
      btnStart.disabled = false;
    }
  },
};
flatpickr(inputEl, options);

function onStartCountdown() {
  const dateInput = new Date(inputEl.value).getTime();

  const intervalId = setInterval(() => {
    const deltaTime = dateInput - Date.now();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    dataDays.innerHTML = `${days}`;
    dataHours.innerHTML = `${hours}`;
    dataMinutes.innerHTML = `${minutes}`;
    dataSeconds.innerHTML = `${seconds}`;

    if (dateInput - Date.now() < 1) {
      clearInterval(intervalId);

      return (
        (dataDays.innerHTML = '00'),
        (dataHours.innerHTML = '00'),
        (dataMinutes.innerHTML = '00'),
        (dataSeconds.innerHTML = '00')
      );
    }
  }, 1000);
  btnStart.disabled = true;
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
