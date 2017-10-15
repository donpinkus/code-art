var camera, scene, renderer, controls;

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
  camera.position.set(0.5, 1, 1).setLength(700);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  addObjects();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function addObjects() {
  addHelpers(true, true);

  const pointCloud = new PointCloud(33, 10, 4);
  scene.add(pointCloud);
}

function PointCloud(count = 33, spacing = 10, size = 2) {
  var material = new THREE.PointsMaterial({
    vertexColors: THREE.VertexColors,
    size
  });

  var geometry = new THREE.Geometry();

  _.times(count, function(xi) {
    _.times(count, function(yi) {
      _.times(count, function(zi) {
        var x = xi * spacing;
        var y = yi * spacing;
        var z = zi * spacing;

        var r = xi / count;
        var g = yi / count;
        var b = zi / count;

        var particle = new THREE.Vector3(x, y, z);
        geometry.vertices.push(particle);

        var color = new THREE.Color().setRGB(r, g, b);
        geometry.colors.push(color);
      });
    });
  });

  var pointCloud = new THREE.Points(geometry, material);

  pointCloud.position.set(
    count * spacing * -0.5,
    count * spacing * -0.5,
    count * spacing * -0.5
  );
  return pointCloud;
}

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
