var g = {
  w: window.innerWidth,
  h: window.innerHeight
};

var speed = 8;
var diameter = 30;

var circles = [
  {
    x: g.w / 2,
    y: g.h / 2
  }
];

function setup() {
  createCanvas(g.w, g.h);
  colorMode(RGB);

  background(204);
}

function draw() {
  fill(230);

  circles.forEach(function(c) {
    c.x += random(-speed, speed);
    c.y += random(-speed, speed);

    ellipse(c.x, c.y, diameter, diameter);
  });
}

function mouseClicked() {
  circles.push({ x: mouseX, y: mouseY });
}
