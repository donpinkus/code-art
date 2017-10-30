var g = {
  w: window.innerWidth,
  h: window.innerHeight
};

var start = {
  x: 20,
  y: 20
};
var stop = {
  x: g.w,
  y: g.h
};

var x = start.x;
var y = start.y;

var step = 0.005;
var pct = 0.0;

function setup() {
  createCanvas(g.w, g.h);
  colorMode(RGB);
}

function draw() {
  background(0);
  if (pct < 1) {
    x = start.x + (stop.x - start.x) * pct;
    y = start.y + (stop.y - start.y) * pct;
    pct += step;
  }
  fill(200);
  ellipse(x, y, 20, 20);
}
