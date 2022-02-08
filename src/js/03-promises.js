import Notiflix from 'notiflix';

const btnCreatePromises = document.querySelector('.form');
const btnEl = document.querySelector('button');

btnCreatePromises.addEventListener('submit', onSubmit);
// btnEl.disabled = false;

let amountCounter = 1;

function onSubmit(e) {
  e.preventDefault();

  btnEl.disabled = true;

  createPromise(`${amountCounter}`, `${btnCreatePromises.elements.delay.value}`);
}

function createPromise(position, delay) {
  const AMOUNT = Number(`${btnCreatePromises.elements.amount.value}`);
  const STEP = Number(`${btnCreatePromises.elements.step.value}`);
  let delayNum = Number(`${delay}`);

  setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      Notiflix.Notify.success(`✅ Fulfilled promise ${amountCounter} in ${delay}ms`);
      amountCounter += 1;
    } else {
      Notiflix.Notify.failure(`❌ Rejected promise ${amountCounter} in ${delay}ms`);
      amountCounter += 1;
    }
    setInterval(() => {
      const shouldResolve = Math.random() > 0.3;

      if (amountCounter > AMOUNT) {
        btnEl.disabled = false;
        console.log(1);

        return;
      }
      if (shouldResolve) {
        Notiflix.Notify.success(`✅ Fulfilled promise ${amountCounter} in ${(delayNum += STEP)}ms`);
        amountCounter += 1;
      } else {
        Notiflix.Notify.failure(`❌ Rejected promise ${amountCounter} in ${(delayNum += STEP)}ms`);
        amountCounter += 1;
      }
    }, STEP);
  }, delay);
}

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;

//   const promise = new Promise((resolve, reject) => {
//     let intervalID = setInterval(() => {
//       if (shouldResolve) {
//         // Fulfill
//         resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       } else {
//         // Reject
//         reject(`❌ Rejected promise ${position} in ${delay}ms`);
//       }
//     }, delay);
//   });

//   promise
//     .then(value => {
//       Notiflix.Notify.success(value);
//     })
//     .catch(error => {
//       Notiflix.Notify.failure(error);
//     });
// }
