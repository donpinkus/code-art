const cWidth = window.innerWidth;
const cHeight = window.innerHeight;

const r = (cWidth > cHeight ? cHeight : cWidth) * 0.3;

let rotation = {
  y: 30,
  x: 30
};

function setup() {
  createCanvas(cWidth, cHeight, WEBGL);
  background(33, 33, 33);
}

function draw() {
  orbitControl();

  rotateY(radians(rotation.y));
  rotateX(radians(rotation.x));

  const total = 30;

  background(33, 33, 33);

  // Place balls along sphere
  // (r, lat, lon) --> (x, y, z);
  for (let i = 0; i < total; i++) {
    let lon = map(i, 0, total, -PI, PI);
    for (let j = 0; j < total; j++) {
      let lat = map(j, 0, total, -HALF_PI, HALF_PI);

      let x = r * sin(lon) * cos(lat);
      let y = r * sin(lon) * sin(lat);
      let z = r * cos(lon);

      fill(255, 255, 255);

      push();
      translate(x, y, z);
      sphere(1);
      pop();
    }
  }
}
