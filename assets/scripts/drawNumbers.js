'use strict';

const lowestValue = 1;
const highestValue = 1000;
const secretNumber = generateRandomNumber();

function generateRandomNumber() {
  return parseInt(Math.random() * highestValue + 1);
}

function updateValuesIntoDOM() {
  // $ indicate a DOM element
  let $minValue = document.querySelector('.guess__tip--lowest');
  let $maxValue = document.querySelector('.guess__tip--largest');

  $minValue.textContent = lowestValue;
  $maxValue.textContent = highestValue;
}

updateValuesIntoDOM();
console.log(secretNumber);
