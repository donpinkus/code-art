const cWidth = window.innerWidth;
const cHeight = window.innerHeight;

const r = (cWidth > cHeight ? cHeight : cWidth) * 0.25;

let rotation = {
  y: 0,
  x: 0
};

let t = 0;
const tMax = 100;
let asc = true;

let rotate = 0;

function setup() {
  createCanvas(cWidth, cHeight, WEBGL);
  background(33, 33, 33);
}

function draw() {
  pctX = mouseX / cWidth;
  pctY = mouseY / cHeight;

  orbitControl();

  rotateY(radians(rotation.y));
  rotateX(radians(rotation.x));

  const total = 30;

  background(33, 33, 33);

  // Place balls along sphere
  // (r, lat, lon) --> (x, y, z);
  for (let i = 0; i < total; i++) {
    // Get "azimuth" angle
    let lonAngle = map(i, 0, total, 0, PI);

    for (let j = 0; j < total; j++) {
      // Get "incline" angle
      let latAngle = map(j, 0, total, 0, 2 * PI);

      let planeCoords = {
        x: i * (r / total * 2) - r,
        y: j * (r / total * 2) - r,
        z: 0
      };

      let sphereCoords = {
        x: r * sin(lonAngle) * cos(latAngle),
        y: r * sin(lonAngle) * sin(latAngle),
        z: r * cos(lonAngle)
      };

      // interpolate between plane coord and sphere coords
      const interVal = constrain(pctY * 2, 0, 1);
      let interCoords = {
        x: map(interVal, 0, 1, planeCoords.x, sphereCoords.x),
        y: map(interVal, 0, 1, planeCoords.y, sphereCoords.y),
        z: map(interVal, 0, 1, planeCoords.z, sphereCoords.z)
      };

      // Color
      let red = lerp(50, 255, i / total);
      let green = lerp(50, 255, j / total);
      let blue = 100;

      fill(red, green, blue);

      if (latAngle == map(15, 0, total, 0, 2 * PI)) {
        fill(255);
      }

      if (latAngle == map(10, 0, total, 0, 2 * PI)) {
        fill(255, 50, 50);
      }

      if (latAngle == map(20, 0, total, 0, 2 * PI)) {
        fill(50, 50, 255);
      }

      // Render sphere
      push();
      rotateY(PI * pctX);
      translate(interCoords.x, interCoords.y, interCoords.z);
      sphere(2);
      pop();
    }
  }

  if (t === tMax) {
    ascending = false;
  } else if (t === 0) {
    ascending = true;
  }

  if (ascending) {
    t++;
  } else {
    t--;
  }

  rotate += 0.5;
}
