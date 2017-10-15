var camera, scene, renderer, controls;
var sphere, cube;

document.addEventListener("DOMContentLoaded", onDocumentReady);

function onDocumentReady() {
  init();
  animate();
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
  camera.position.set(0, 0, 1).setLength(100);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  addObjects();
}

function addObjects() {
  addHelpers(true, true);
  cube = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshNormalMaterial()
  );

  cube.position.set(20, 0, 0);
  scene.add(cube);
}

// Arguments are all booleans for whether to include them or not.
function addHelpers(axis, x, y, z) {
  var xGridHelper = new THREE.GridHelper(
    100,
    10,
    new THREE.Color("rgb(130, 20, 20)"),
    new THREE.Color("rgb(130, 20, 20)")
  );
  x && scene.add(xGridHelper);

  var yGridHelper = new THREE.GridHelper(
    100,
    10,
    new THREE.Color("rgb(20, 100, 20)"),
    new THREE.Color("rgb(20, 100, 20)")
  );
  yGridHelper.rotation.x = 3.14 / 2;
  y && scene.add(yGridHelper);

  var zGridHelper = new THREE.GridHelper(
    100,
    10,
    new THREE.Color("rgb(20, 20, 150)"),
    new THREE.Color("rgb(20, 20, 150)")
  );
  zGridHelper.rotation.z = 3.14 / 2;
  z && scene.add(zGridHelper);

  var axisHelper = new THREE.AxisHelper(100);
  axis && scene.add(axisHelper);
}

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.005;
  cube.rotation.z += 0.0025;

  renderer.render(scene, camera);
}
