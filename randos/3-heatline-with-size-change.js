var g = {
  w: window.innerWidth,
  h: window.innerHeight
};

var x;
var y;
var easing = 0.04;

var initialized = false;

var i = 0;
var ascending = true;
var from;
var to;
var weight = 1;

function setup() {
  createCanvas(g.w, g.h);
  colorMode(RGB);
  fast = color(244, 127, 160);
  slow = color(74, 112, 209);
  x = mouseX;
  y = mouseY;
}

function draw() {
  var speed = dist(mouseX, mouseY, pmouseX, pmouseY);
  var color = lerpColor(slow, fast, speed / 40);
  fill(color);

  var px = x;
  var targetX = mouseX;
  x += (targetX - x) * easing;

  var py = y;
  var targetY = mouseY;
  y += (targetY - y) * easing;

  strokeWeight(weight);
  stroke(color);
  line(px, py, x, y);

  var eDim = {
    x: null,
    y: null
  };

  if (mouseIsPressed) {
    eDim.x = 15;
    eDim.y = 15;
    fill(0, 0, 0, 0);
    stroke(color);
  } else {
    eDim.x = 5;
    eDim.y = 5;
    fill(0, 0, 0, 0);
    stroke(color);
    strokeWeight(2);
  }

  if (keyIsDown(38)) {
    weight++;
  } else if (keyIsDown(40)) {
    weight--;
  }

  ellipse(x, y, eDim.x, eDim.y);
}
