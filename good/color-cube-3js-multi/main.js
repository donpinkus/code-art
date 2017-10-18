let apocalypseLUT = new LUT(window.apocalypseLUTValues, 33);
let activeCube;

let camera, scene, renderer, controls;

document.addEventListener("DOMContentLoaded", onDocumentReady);

function onDocumentReady() {
  init();
  animate();

  document.querySelectorAll("[data-cube]").forEach(element => {
    element.addEventListener("click", function(e) {
      window.activeCube = this.getAttribute("data-cube");
      const obj = scene.getObjectByName("pointcloud");
      scene.remove(obj);

      let newCloud;
      switch (window.activeCube) {
        case "identity":
          newCloud = new IdentityPointCloud();
          break;
        case "apocalypse":
          newCloud = LUTPointCloud(apocalypseLUT, 33, 10, 4);
          break;
      }

      newCloud.name = "pointcloud";
      scene.add(newCloud);
    });
  });
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
  // addHelpers(true, true);

  // const pointCloud = new IdentityPointCloud(33, 10, 4);
  const pointCloud = LUTPointCloud(apocalypseLUT, 33, 10, 4);
  pointCloud.name = "pointcloud";
  scene.add(pointCloud);
}

function LUTPointCloud(lut, count = 33, spacing = 10, size = 4) {
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
        let lutColor = lut.lookup(xi, yi, zi);

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

function IdentityPointCloud(count = 33, spacing = 10, size = 4) {
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

  // let group = new THREE.Group();
  // group.add(pointCloud);
  //
  // let cubeGeo = new THREE.BoxGeometry(330, 330, 330);
  // let cubeMat = new THREE.MeshBasicMaterial({
  //   wireframe: true,
  //   color: new THREE.Color("rgb(230, 230, 230)"),
  //   opacity: 0.95,
  //   transparent: true
  // });
  // let cube = new THREE.Mesh(cubeGeo, cubeMat);
  // group.add(cube);

  return pointCloud;
}
