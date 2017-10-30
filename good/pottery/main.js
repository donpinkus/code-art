let camera, scene, renderer, controls, stats;

let globals = {
  cameraDimensions: {},
  objects: {},
  points: [],
  isMouseDown: false,
  mode: "draw",
  elements: {}
};

function addStats() {
  (function() {
    var script = document.createElement("script");
    script.onload = function() {
      var stats = new Stats();
      document.body.appendChild(stats.dom);
      requestAnimationFrame(function loop() {
        stats.update();
        requestAnimationFrame(loop);
      });
    };
    script.src = "//rawgit.com/mrdoob/stats.js/master/build/stats.min.js";
    document.head.appendChild(script);
  })();
}

document.addEventListener("DOMContentLoaded", onDocumentReady);

function onDocumentReady() {
  // addStats();
  init();

  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mouseup", onMouseUp);
  document.addEventListener("mousemove", onMouseMove);

  document.addEventListener("keydown", onKeyDown);

  globals.elements.eDrawBtn = document.querySelector("#draw");
  globals.elements.eLookBtn = document.querySelector("#look");
  globals.elements.example = document.querySelector(".example");

  globals.elements.eDrawInstructions = document.querySelector(
    ".draw-instructions"
  );
  globals.elements.eLookInstructions = document.querySelector(
    ".look-instructions"
  );

  globals.elements.eDrawBtn.addEventListener("click", e => {
    globals.mode = "draw";
    controls.enabled = false;

    e.currentTarget.classList.add("active");
    globals.elements.eLookBtn.classList.remove("active");

    globals.elements.eDrawInstructions.classList.remove("hidden");
    globals.elements.eLookInstructions.classList.add("hidden");
  });

  globals.elements.eLookBtn.addEventListener("click", e => {
    globals.mode = "look";
    controls.enabled = true;

    e.currentTarget.classList.add("active");
    globals.elements.eDrawBtn.classList.remove("active");

    globals.elements.eDrawInstructions.classList.add("hidden");
    globals.elements.eLookInstructions.classList.remove("hidden");
  });
}

function onKeyDown(e) {
  if (e.keyCode == 32) {
    if (globals.mode === "draw") {
      globals.mode = "look";
      controls.enabled = true;
    } else {
      globals.mode = "draw";
      controls.enabled = false;
    }
  }
}

function init() {
  scene = new THREE.Scene();

  const frustrumSize = 100;
  const aspect = window.innerWidth / window.innerHeight;

  globals.cameraDimensions = {
    aspect: window.innerWidth / window.innerHeight,
    frustrumSize: 100,
    left: frustrumSize * aspect / -2,
    right: frustrumSize * aspect / 2,
    top: frustrumSize / 2,
    bottom: frustrumSize / -2
  };

  camera = new THREE.OrthographicCamera(
    globals.cameraDimensions.left,
    globals.cameraDimensions.right,
    globals.cameraDimensions.top,
    globals.cameraDimensions.bottom,
    1,
    2000
  );

  // Sets the position to a Vector3 angle, then sets the length.
  camera.position.set(0, 0, 100);
  camera.up = new THREE.Vector3(0, 1, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enabled = false;

  addLathe();

  draw();
}

function draw() {
  renderer.render(scene, camera);

  globals.objects.lathe.rotation.y += 0.005;

  requestAnimationFrame(draw);
}

function addLathe(points = []) {
  let normalizedPoints = [];

  for (let i = 0; i < points.length; i++) {
    let scale = globals.cameraDimensions.frustrumSize;

    // Get fractions of width
    let absDistanceFromCenter = Math.abs(points[i].x - window.innerWidth / 2);
    let nWidth = absDistanceFromCenter / (window.innerWidth / 2);
    let nHeight = points[i].y * -1 / window.innerHeight;

    normalizedPoints.push(
      new THREE.Vector2(
        nWidth * globals.cameraDimensions.right,
        nHeight * scale + globals.cameraDimensions.top
      )
    );
  }

  var geometry = new THREE.LatheGeometry(normalizedPoints, 60);
  geometry.mergeVertices();

  var material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
  });
  var lathe = new THREE.Mesh(geometry, material);

  if (globals.objects.lathe) {
    scene.remove(globals.objects.lathe);
  }

  globals.objects.lathe = lathe;

  scene.add(globals.objects.lathe);
}

function onMouseDown() {
  globals.isMouseDown = true;
}

function onMouseUp() {
  globals.isMouseDown = false;
}

function onMouseMove(e) {
  if (globals.isMouseDown && globals.mode === "draw") {
    globals.points.push({ x: e.clientX, y: e.clientY });
    addLathe(globals.points);

    globals.elements.example.classList.add("hidden");
  }
}
