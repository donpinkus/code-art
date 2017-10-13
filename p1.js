const identityLUT = new IdentityLUT();

const cWidth = window.innerWidth;
const cHeight = window.innerHeight;

const cubeLength = cHeight / 2;
const pxScale = cubeLength / 33;

let logged = 0;

function setup() {
  createCanvas(cWidth, cHeight, WEBGL);
  background(33, 33, 33);
}

function draw() {
  orbitControl();

  // canvas background color
  background(33, 33, 33);

  for (let x = 0; x < 33; x++) {
    for (let y = 0; y < 33; y++) {
      for (let z = 0; z < 33; z++) {
        push();
        translate(
          z * pxScale - cubeLength / 2,
          y * pxScale * -1 + cubeLength / 2,
          x * pxScale - cubeLength / 2
        );
        var color = identityLUT.lookup(x, y, z);

        if (logged < 3) {
          logged++;
        }

        fill(
          fromNormTo8Bit(color.r),
          fromNormTo8Bit(color.g),
          fromNormTo8Bit(color.b)
        );
        sphere(2);
        pop();
      }
    }
  }
}

function fromNormToInt(num) {
  return Math.round(num * 32);
}

function fromIntToNorm(num) {
  return num / 32;
}

function fromNormTo8Bit(num) {
  return num * 255;
  // #fffff = rgb(255, 255, 255)
}

function drawOriginalCube() {
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
