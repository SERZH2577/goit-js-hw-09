import Notiflix from 'notiflix';

const btnCreatePromises = document.querySelector('.form');
const btnEl = document.querySelector('button');

btnCreatePromises.addEventListener('submit', onSubmit);
btnEl.disabled = false;

function onSubmit(e) {
  e.preventDefault();
  btnEl.disabled = true;

  let amountVal = Number(`${btnCreatePromises.elements.amount.value}`);
  let delayVal = Number(`${btnCreatePromises.elements.delay.value}`);
  let stepVal = Number(`${btnCreatePromises.elements.step.value}`);

  duplicatePromises(amountVal, delayVal);

  function duplicatePromises(amountVal, delayVal) {
    let position = 0;

    for (let i = 0; i < amountVal; i += 1) {
      if (i > 0) {
        delayVal += stepVal;
      }
      position += 1;

      createPromise(position, delayVal)
        .then(({ position, stepVal }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${stepVal}ms`);
        })
        .catch(({ position, stepVal }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${stepVal}ms`);
        });

      function createPromise(position, stepVal) {
        return new Promise((resolve, reject) => {
          const shouldResolve = Math.random() > 0.3;

          setTimeout(() => {
            if (position == amountVal) {
              btnEl.disabled = false;
            }

            if (shouldResolve) {
              resolve({ position, stepVal });
            } else {
              reject({ position, stepVal });
            }
          }, delayVal);
        });
      }
    }
  }
}
