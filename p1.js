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

  const scaleFactor = 1;

  const stepSize = 8;
  const colorScaleFactor = 255 / (stepSize - 1);

  const cubeLength = 255 * scaleFactor;
  const translateOrigin = cubeLength / 2;

  const radius = 2;

  for (let b = 0; b < 255; b += stepSize) {
    for (let g = 0; g < 255; g += stepSize) {
      for (let r = 0; r < 255; r += stepSize) {
        // Draw a sphere with a color, at a location.
        push();

        translate(
          b * scaleFactor - translateOrigin,
          g * scaleFactor * -1 + translateOrigin,
          r * scaleFactor - translateOrigin
        );

        fill(r, g, b);
        box(radius, radius, radius);
        pop();
      }
    }
  }
}

// Given an R, G, B, looks it up in the moonriseLUT.
function moonrisify(r, g, b) {
  var moonriseIndex = b / 32 + g / 32 + r / 32;
}

// // Moonrise LUT
// [
//   [r,g,b],
//   [r,g,b],
//   ...
// ]
