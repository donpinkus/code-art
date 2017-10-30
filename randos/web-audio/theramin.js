var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Graph
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

var I_WIDTH = window.innerWidth;
var I_HEIGHT = window.innerHeight;

var maxFreq = 6000;
var maxVol = 1;

var canvasCtx;

function main() {
  // Pitch & Volume

  var initialFreq = 300;
  var initialVol = 0.5;

  gainNode.gain.value = initialVol;

  oscillator.type = "sine";
  oscillator.frequency.value = initialFreq;
  oscillator.start();

  // Canvas
  var canvas = document.querySelector(".canvas");
  canvas.width = I_WIDTH;
  canvas.height = I_HEIGHT;

  canvasCtx = canvas.getContext("2d");

  document.onmousemove = updatePage;
}

function updatePage(e) {
  curX = e.pageX;
  curY = e.pageY;

  oscillator.frequency.value = curX / I_WIDTH * maxFreq;
  gainNode.gain.value = (I_HEIGHT - curY) / I_HEIGHT * maxVol;

  canvasDraw();
}

function random(n1, n2) {
  var rando = n1 + Math.floor(Math.random() * (n2 - n1));
  return rando;
}

function canvasDraw() {
  rX = curX;
  rY = curY;
  rC = Math.floor(gainNode.gain.value / maxVol * 30);

  canvasCtx.globalAlpha = 0.2;

  for (i = 1; i <= 15; i += 2) {
    canvasCtx.beginPath();
    canvasCtx.fillStyle =
      "rgb(" +
      100 +
      i * 10 +
      "," +
      Math.floor(gainNode.gain.value / maxVol * 255) +
      "," +
      Math.floor(oscillator.frequency.value / maxFreq * 255) +
      ")";
    canvasCtx.arc(
      rX + random(0, 50),
      rY + random(0, 50),
      rC / 2 + i,
      Math.PI / 180 * 0,
      Math.PI / 180 * 360,
      false
    );
    canvasCtx.fill();
    // canvasCtx.closePath();
  }
}
