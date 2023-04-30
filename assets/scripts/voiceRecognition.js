'use strict';
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'pt-Br';
recognition.start();
recognition.addEventListener('result', onSpeak);

function onSpeak(e) {
  const transcription = e.results[0][0].transcript;

  console.log(e.target);

  showTranscriptionIntoDOM(transcription);
}

function showTranscriptionIntoDOM(transcription) {
  const $guessCheck = document.querySelector('.guess__check');
  $guessCheck.classList.add('active');

  document.querySelector('.guess__number').textContent = transcription;
}
