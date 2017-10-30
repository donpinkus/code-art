function main() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(stream => beginAnalysis(stream));
}

function beginAnalysis(stream) {
  if (!stream) {
    console.log("no stream");
    return;
  }

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  var source = audioCtx.createMediaStreamSource(stream);
  window.analyser = audioCtx.createAnalyser();

  source.connect(analyser);

  draw();
}

function draw() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  analyser.fftSize = 2048;
  // half the FFT value
  var bufferLength = analyser.frequencyBinCount;
  // create an array to store the data
  var dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);

  console.log(dataArray);

  window.requestAnimationFrame(draw);
}
