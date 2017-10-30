const cWidth = window.innerWidth;
const cHeight = window.innerHeight;

function setup() {
  createCanvas(cWidth, cHeight, WEBGL);
  background(33, 33, 33);
}

function draw() {
  orbitControl();

  // canvas background color
  background(33, 33, 33);

  const scaleFactor = 27;
  const maxIncr = 17;
  const colorScaleFactor = maxIncr - 1;

  const cubeLength = scaleFactor * maxIncr;

  const translateOrigin = cubeLength / 2;

  for (let b = 0; b < maxIncr; b++) {
    for (let g = 0; g < maxIncr; g++) {
      for (let r = 0; r < maxIncr; r++) {
        // Draw a sphere with a color, at a location.
        push();

        translate(
          b * scaleFactor - translateOrigin,
          g * scaleFactor * -1 + translateOrigin,
          r * scaleFactor - translateOrigin
        );

        fill(r * colorScaleFactor, g * colorScaleFactor, b * colorScaleFactor);
        sphere(2);
        pop();
      }
    }
  }
}
