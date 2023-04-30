'use strict';

function isAValidNumber(value) {
  const number = Number(value);

  if (isNaN(number) || isOutOfRange(number)) return false;

  return true;
}

function isOutOfRange(value) {
  return value < lowestValue || value > highestValue;
}

function isACorrectNumber(guess) {
  if (Number(guess) === secretNumber) return true;

  return false;
}

export const validations = {
  isAValidNumber,
  isACorrectNumber,
};
