let camera, scene, renderer, controls;

let objects = {};

let updateCount = 0;

document.addEventListener("DOMContentLoaded", onDocumentReady);

function onDocumentReady() {
  init();

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(stream => handleStreaming(stream));
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
}

function handleStreaming(stream) {
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  var source = audioCtx.createMediaStreamSource(stream);
  window.analyser = audioCtx.createAnalyser();
  source.connect(analyser);

  addLights();
  drawPlane();

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

  // console.log(frequencyArray[250]);

  drawLine("wave", waveformArray, "white");
  drawLine("freq", frequencyArray, "red");
  updatePlane(frequencyArray);

  renderer.render(scene, camera);

  requestAnimationFrame(draw);
}

function drawPlane() {
  let material = new THREE.MeshNormalMaterial({
    color: "rgb(236, 157, 117)",
    wireframe: true
  });

  let geometry = new THREE.PlaneGeometry(80, 40, 512, 500);

  window.plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  console.log(window.plane.geometry.vertices[500]);
}

function updatePlane(data) {
  data.forEach((d, i) => {
    const oldVert = plane.geometry.vertices[updateCount * 500 + i];
    const index = updateCount * 512 + i;
    // console.log(plane.geometry.vertices[index].y);
    plane.geometry.vertices[index].z = d / 255 * 100;
  });

  plane.geometry.verticesNeedUpdate = true;

  updateCount == 500 ? (updateCount = 0) : updateCount++;
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

function addLights() {
  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
  shadowLight.position.set(150, 150, 150);
  shadowLight.castShadow = true;
  scene.add(shadowLight);

  ambientLight = new THREE.AmbientLight(0xdc8874, 0.5);
  scene.add(ambientLight);

  var geometry = new THREE.SphereGeometry(5, 32, 32);
  var material = new THREE.MeshNormalMaterial({ color: 0xffff00 });
  var sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
}
