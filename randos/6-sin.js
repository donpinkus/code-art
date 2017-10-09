var g = {
  w: window.innerWidth,
  h: window.innerHeight
};

var angle = 0.0;
var pV = 0;
var sV = 0;

var pX = 0;
var x = 0;

function setup() {
  createCanvas(g.w, g.h);
  colorMode(RGB);

  background(204);

  // main circle
  strokeWeight(4);
  fill(0, 0, 0, 0);
  ellipse(200, g.h / 2, 200, 200);

  // orbiter

  // defaults
  strokeWeight(1);
}

function draw() {
  background(200);
  var amplitude = 100;

  sV = sin(angle);
  angle += 0.05;

  x += g.w / 600;

  y = g.h / 2 + sV * amplitude;

  ellipse(x, y, 10, 10);
}
