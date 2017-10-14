(function() {
  "use strict";

  // Geometric Constants
  var tau = Math.PI * 2;
  var pointSpacing = 100;
  var pointCount = 100;
  var cubeLength = pointSpacing * pointCount;

  var width, height;
  var scene, camera, renderer, pointCloud;
  var gui;
  var guiControls;
  var cameraControls;
  var stats;

  function initialize() {
    renderer = new THREE.WebGLRenderer({ alpha: true });
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      127,
      window.innerWidth / window.innerHeight,
      1,
      cubeLength
    );

    camera.position.x = cubeLength / 10;
    camera.position.y = cubeLength / 10;
    camera.position.z = cubeLength / 10;

    // cameraControls = new THREE.OrbitControls(camera);

    createGUI();
    createStats();

    document.body.appendChild(renderer.domElement);
    window.addEventListener("resize", onWindowResize);
    onWindowResize();
  }

  function createGUI() {
    guiControls = new function() {
      this.fov = 127;
      this.x = 0;
      this.y = 0;
      this.z = cubeLength / 2;

      this.center = function() {
        this.x = 0;
        this.y = 0;
        this.z = cubeLength / 2;
      };
    }();

    gui = new dat.GUI();
    var f1 = gui.addFolder("Camera Settings");
    f1
      .add(guiControls, "fov", 0, 180)
      .listen()
      .name("Field of View");

    // Camera Position
    f1
      .add(guiControls, "x", cubeLength * -1, cubeLength)
      .listen()
      .name("Camera - X");
    f1
      .add(guiControls, "y", cubeLength * -1, cubeLength)
      .listen()
      .name("Camera - Y");
    f1
      .add(guiControls, "z", cubeLength * -1, cubeLength)
      .listen()
      .name("Camera - Z");
    f1.add(guiControls, "center").name("Center camera");
    f1.open();
  }

  function createStats() {
    stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.top = "10px";
    stats.domElement.style.left = "10px";
    document.getElementById("Stats").appendChild(stats.domElement);
  }

  function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    updateRendererSize();
  }

  function updateRendererSize() {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function onDocumentReady() {
    initialize();

    /* DO STUFF! */
    pointCloud = new PointCloud();
    scene.add(pointCloud);

    var axisHelper = new THREE.AxisHelper(5);
    scene.add(axisHelper);

    render();
  }

  function PointCloud(points) {
    if (!points) points = 10;

    var material = new THREE.PointsMaterial({
      color: 0xffffcc,
      size: 4
    });

    var geometry = new THREE.Geometry();

    _.times(points, function(xi) {
      _.times(points, function(yi) {
        _.times(points, function(zi) {
          var x = xi * pointSpacing;
          var y = yi * pointSpacing;
          var z = zi * pointSpacing;

          var particle = new THREE.Vector3(x, y, z);

          geometry.vertices.push(particle);
        });
      });
    });

    var pointCloud = new THREE.Points(geometry, material);

    return pointCloud;
  }

  function render() {
    camera.position.x = guiControls.x;
    camera.position.y = guiControls.y;
    camera.position.z = guiControls.z;

    camera.fov = guiControls.fov;
    camera.updateProjectionMatrix();

    stats.update();

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  document.addEventListener("DOMContentLoaded", onDocumentReady);
})();
