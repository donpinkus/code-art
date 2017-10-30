let camera, scene, renderer, controls;

let Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0
};

let objects = {};

document.addEventListener("DOMContentLoaded", onDocumentReady);

function onDocumentReady() {
  init();
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );

  // Sets the position to a Vector3 angle, then sets the length.
  camera.position.set(0, 1, 1).setLength(100);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  addHelpers(true, true);

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(stream => handleStreaming(stream));
}

function handleStreaming(stream) {
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  var source = audioCtx.createMediaStreamSource(stream);
  window.analyser = audioCtx.createAnalyser();
  source.connect(analyser);

  draw();
}

function draw() {
  analyser.fftSize = Math.pow(2, 10);

  // half the FFT value
  var bufferLength = analyser.frequencyBinCount;

  // create an array to store the data
  var waveformArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(waveformArray);

  var frequencyArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(frequencyArray);

  console.log(frequencyArray[250]);

  drawLine("wave", waveformArray, "white");

  drawLine("freq", frequencyArray, "red");

  renderer.render(scene, camera);

  requestAnimationFrame(draw);
}

function drawLine(name, data, color) {
  var material = new THREE.LineBasicMaterial({
    color: color
  });

  var geometry = new THREE.Geometry();

  // For each
  data.forEach((d, i) => {
    geometry.vertices.push(new THREE.Vector3(i, d / 255 * 100, 0));
  });

  if (!objects[name]) {
    line = new THREE.Line(geometry, material);
    line.name = name;
    objects[name] = line;
    scene.add(line);
  } else {
    objects[name].geometry = geometry;
  }
}
