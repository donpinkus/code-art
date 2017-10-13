const cWidth = window.innerWidth;
const cHeight = window.innerHeight;

const radius = 200;
let gap = 0;
let inc = 0.01;
let s, t;
let oldX, oldY, oldZ;

function setup() {
  createCanvas(cWidth, cHeight, WEBGL);
  background(33, 33, 33);
}

function draw() {
  background(33, 33, 33);

  orbitControl();

  const dirX = mouseX / width * 2;
  const dirY = mouseY / height * -2;

  s = t = 0;

  while (s <= 180) {
    const radianS = radians(s);
    const radianT = radians(t);

    const x = radius * cos(radianT) * sin(radianS);
    const y = radius * sin(radianT) * sin(radianS);
    const z = radius * cos(radianS);

    if (s > 0) {
      stroke(0, 128, 128);
      line(oldX, oldY, oldZ, x, y, z);
    }

    push();
    normalMaterial(0, 128, 128);
    fill(53, 126, 127);

    translate(x, y, z);

    sphere(5);
    pop();

    oldX = x;
    oldY = y;
    oldZ = z;

    s++;
    t += gap;
  }

  gap += inc;
}
