// A splatter paint doodle.
// Q - dots, E - lines
var g = {
  w: window.innerWidth,
  h: window.innerHeight
};

function setup() {
  createCanvas(g.w, g.h);
}

function draw() {
  var speed = dist(mouseX, mouseY, pmouseX, pmouseY);

  if (keyIsDown(87)) {
    strokeWeight(1);
    ellipse(mouseX, mouseY, 5, 5);
  }

  if (keyIsDown(81)) {
    strokeWeight(Math.min(100 / speed, 10));
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
