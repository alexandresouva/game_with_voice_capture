'use strict';
import { validations } from './validation.js';

// Found Speech API
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
// Initialize API
const recognition = new SpeechRecognition();
recognition.lang = 'pt-Br';
startVoiceCapture();
recognition.addEventListener('result', onSpeak);

// $ indicate a DOM Element
const $guessCheck = document.querySelector('.guess__check');
const $error = document.querySelector('.guess__error');
let transcription = '';

function onSpeak(e) {
  transcription = e.results[0][0].transcript;

  if (validations.isAValidNumber(transcription)) {
    hideErrorMessage();
    if (validations.isACorrectNumber(transcription)) {
      changeToWinnerView();
    } else {
      showTranscriptionIntoDOM(transcription);
    }
  } else {
    showErrorMessage();
    hideTranscriptionIntoDOM();
  }
}

recognition.addEventListener('end', () => {
  if (validations.isACorrectNumber(transcription)) {
    stopVoiceCapture();
  } else {
    startVoiceCapture();
  }
});

function changeToWinnerView() {
  document.body.innerHTML = `
  <main class="guess">
    <h1 class="guess__title">Parabéns, você acertou!</h1>
    <h3 class="guess__tip">O número secreto era ${secretNumber}.</h3>
    <button id="playAgain" class="guess__btnRestart">Jogar novamente!</button>
  </main>`;
}

function stopVoiceCapture() {
  recognition.stop();
}

function startVoiceCapture() {
  recognition.start();
}

function showTranscriptionIntoDOM(transcription) {
  $guessCheck.classList.add('active');

  document.querySelector('.guess__number').textContent = transcription;

  showTip();
}

function showTip() {
  const $tip = document.querySelector('.guess__result');

  if (secretNumber > Number(transcription)) {
    $tip.innerHTML =
      'O número secreto é maior <i class="fa-solid fa-up-long"></i>';
  } else {
    $tip.innerHTML =
      'O número secreto é menor <i class="fa-solid fa-down-long"></i>';
  }
}

function hideTranscriptionIntoDOM() {
  $guessCheck.classList.remove('active');
}

function showErrorMessage() {
  const errorMsg = `Você precisa escolher um número entre ${lowestValue} e ${highestValue}`;

  $error.textContent = errorMsg;
  $error.classList.add('active');
}

function hideErrorMessage() {
  $error.classList.remove('active');
}

function restartGame() {
  window.location.reload();
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'playAgain') restartGame();
});
