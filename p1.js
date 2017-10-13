const identityLUT = new IdentityLUT();
const a1LUT = new LUT(window.apocalypseLUTValues, 33);
const a2LUT = new LUT(window.apocalypseLUTValues, 33);
const myLerpedLUT = myLUTLerp(identityLUT.LUT, a2LUT.LUT, 0.78);

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

        var color = myLerpedLUT.lookup(x, y, z);

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
}

function myLerp(low, high, intensity) {
  return (1 - intensity) * low + intensity * high;
}

function myColorLerp(r1, g1, b1, r2, g2, b2, intensity) {
  return {
    r: myLerp(r1, r2, intensity),
    g: myLerp(b1, b2, intensity),
    b: myLerp(g1, g2, intensity)
  };
}

function myLUTLerp(lut1, lut2, intensity) {
  var logger = 0;

  lerpLUTValues = [];

  if (lut1.length !== lut2.length) {
    throw new Error("Provided LUTs of different lengths.");
  }

  for (var i = 0; i < lut1.length; i++) {
    var lerpVal = myLerp(lut1[i], lut2[i], intensity);
    lerpLUTValues.push(lerpVal);

    if (logger < 4) {
      console.log("lut1", lut1[i], lut2[i], lerpVal);
      logger++;
    }
  }

  console.log("myLUTLerp");
  console.log(lerpLUTValues.length);

  return new LUT(lerpLUTValues, 33);
}

/*
Old
*/
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
