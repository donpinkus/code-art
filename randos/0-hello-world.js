var g = {
  w: window.innerWidth,
  h: window.innerHeight
};

function setup() {
  createCanvas(g.w, g.h);
  colorMode(RGB);
}

function draw() {
  ellipse(50, 50, 20, 20);
}
