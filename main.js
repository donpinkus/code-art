let apocalypseLUT = new LUT(window.apocalypseLUTValues, 33);

let camera, scene, renderer, controls;

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

  // const pointCloud = new IdentityPointCloud(33, 10, 4);
  const pointCloud = LUTPointCloud(apocalypseLUT, 33, 10, 4);
  scene.add(pointCloud);
}

function LUTPointCloud(lut, count = 33, spacing = 10, size = 2) {
  let material = new THREE.PointsMaterial({
    vertexColors: THREE.VertexColors,
    size
  });

  let geometry = new THREE.Geometry();

  _.times(count, function(xi) {
    _.times(count, function(yi) {
      _.times(count, function(zi) {
        let x = xi * spacing;
        let y = yi * spacing;
        let z = zi * spacing;

        let particle = new THREE.Vector3(x, y, z);
        geometry.vertices.push(particle);

        // Get r, g, b from LUT.
        let lutColor = lut.lookup(x, y, z);

        let color = new THREE.Color().setRGB(
          lutColor.r,
          lutColor.g,
          lutColor.b
        );
        geometry.colors.push(color);
      });
    });
  });

  let pointCloud = new THREE.Points(geometry, material);

  pointCloud.position.set(
    count * spacing * -0.5,
    count * spacing * -0.5,
    count * spacing * -0.5
  );

  return pointCloud;
}

function IdentityPointCloud(count = 33, spacing = 10, size = 2) {
  let material = new THREE.PointsMaterial({
    vertexColors: THREE.VertexColors,
    size
  });

  let geometry = new THREE.Geometry();

  _.times(count, function(xi) {
    _.times(count, function(yi) {
      _.times(count, function(zi) {
        let x = xi * spacing;
        let y = yi * spacing;
        let z = zi * spacing;

        let particle = new THREE.Vector3(x, y, z);
        geometry.vertices.push(particle);

        let r = xi / count;
        let g = yi / count;
        let b = zi / count;

        let color = new THREE.Color().setRGB(r, g, b);
        geometry.colors.push(color);
      });
    });
  });

  let pointCloud = new THREE.Points(geometry, material);

  pointCloud.position.set(
    count * spacing * -0.5,
    count * spacing * -0.5,
    count * spacing * -0.5
  );
  return pointCloud;
}
