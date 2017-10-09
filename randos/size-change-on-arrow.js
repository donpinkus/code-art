var g = {
  w: window.innerWidth,
  h: window.innerHeight
};

var x;
var y;
var easing = 0.5;

var init = false;

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
  if (!init) {
    x = mouseX;
    y = mouseY;
    init = true;
  }

  if (i == 100) {
    ascending = false;
  } else if (i == 0) {
    ascending = true;
  }

  ascending ? i++ : i--;

  var speed = dist(mouseX, mouseY, pmouseX, pmouseY);
  var color = lerpColor(slow, fast, speed / 50);
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

  if (mouseIsPressed) {
    stroke(220);
    strokeWeight(2);
  } else {
    strokeWeight(0);
  }

  if (keyIsDown(38)) {
    weight++;
  } else if (keyIsDown(40)) {
    weight--;
  }

  ellipse(x, y, 20, 20);
  print(targetX + " :" + x);
}
