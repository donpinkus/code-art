var gWidth = window.innerWidth;
var gHeight = window.innerHeight;

function setup() {
  createCanvas(gWidth, gHeight);
  background(40);
}

function draw() {
  const xMax = gWidth;
  const yMax = gHeight;

  const count = 100;

  background(40);

  for (let i = 0; i < count; i++) {
    stroke("rgba(255, 255, 255, 0.3)");
    line(i * gWidth / count, 0, 0, gHeight - i * gHeight / count);
    line(0, i * gHeight / count, gWidth * i / count, gHeight);

    line(i * gWidth / count, 0, 0, gHeight - i * gHeight / count);
    line(gWidth, i * gHeight / count, gWidth - gWidth * i / count, gHeight);
  }
}
