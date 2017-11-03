let g = {
  mousePos: {
    x: 0,
    y: 0
  },
  drawCanvas: null,
  drawCtx: null,
  viewCanvas: null,
  viewCtx: null,
  rotationAngle: 2,
  t: 0,
  intensity: 0,
  intensityAscending: true,
  canvasWidth:
    (window.innerWidth > window.innerHeight
      ? window.innerHeight
      : window.innerWidth) * 0.9,
  canvasHeight:
    (window.innerWidth > window.innerHeight
      ? window.innerHeight
      : window.innerWidth) * 0.9
};

/**
 * A linear interpolator for hexadecimal colors
 * @param {String} a
 * @param {String} b
 * @param {Number} amount
 * @example
 * // returns #7F7F7F
 * lerpColor('#000000', '#ffffff', 0.5)
 * @returns {String}
 */
function lerpColor(a, b, amount) {
  var ah = parseInt(a.replace(/#/g, ""), 16),
    ar = ah >> 16,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff,
    bh = parseInt(b.replace(/#/g, ""), 16),
    br = bh >> 16,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab);

  return (
    "#" + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)
  );
}

document.addEventListener("DOMContentLoaded", onDocumentReady);
document.addEventListener("mousemove", onMouseMove);

function onDocumentReady(e) {
  g.drawCanvas = document.getElementById("drawCanvas");
  g.viewCanvas = document.getElementById("viewCanvas");

  g.drawCtx = g.drawCanvas.getContext("2d");
  g.viewCtx = g.viewCanvas.getContext("2d");

  g.drawCanvas.width = g.viewCanvas.width = g.canvasWidth;
  g.drawCanvas.height = g.viewCanvas.height = g.canvasHeight;

  // Translate origins
  g.drawCtx.translate(g.drawCanvas.width / 2, g.drawCanvas.height / 2);
  g.viewCtx.translate(g.drawCanvas.width / 2, g.drawCanvas.height / 2);

  g.drawCtx.fillStyle = "rgb(0, 255, 0)";
  g.drawCtx.fillRect(-10, -10, 20, 20);

  draw();
}

function onMouseMove(e) {
  g.mousePos = {
    x: e.clientX,
    y: e.clientY
  };

  // console.log(g.mousePos.x, g.mousePos.y);
}

function draw() {
  g.t++;

  // Draw on canvas
  const transX = g.mousePos.x - window.innerWidth / 2;
  const transY = g.mousePos.y - window.innerHeight / 2;

  const radianAngle = g.rotationAngle * Math.PI / 180 * g.t * -1;

  // Add inverseRotation to mouse position.
  const drawX = transX * Math.cos(radianAngle) - transY * Math.sin(radianAngle);

  const drawY = transY * Math.cos(radianAngle) + transX * Math.sin(radianAngle);

  // Get color
  if (g.intensity === 99) {
    g.intensityAscending = false;
  } else if (g.intensity === 1) {
    g.intensityAscending = true;
  }

  console.log(g.intensity, g.intensityAscending);

  g.intensityAscending ? g.intensity++ : g.intensity--;

  const color = lerpColor("#FF0080", "#FF8C00", g.intensity / 100);

  g.drawCtx.fillStyle = color;
  g.drawCtx.fillRect(drawX, drawY, 20, 20);

  // Copy drawCtx to viewCtx.
  g.viewCtx.rotate(Math.PI / 180 * g.rotationAngle);
  g.viewCtx.drawImage(
    g.drawCanvas,
    0, // sourceX
    0, // sourceY - note that source ignores translation. It's not a canvas context, so we choose top left corner of the canvas to start copying pixels.
    g.drawCanvas.width, // sourceWidth
    g.drawCanvas.height, // sourceHeight
    -0.5 * g.viewCanvas.width, // destinationX
    -0.5 * g.viewCanvas.height, // destinationY
    g.viewCanvas.width, // destinationWidth
    g.viewCanvas.height // destinationHeight
  );

  requestAnimationFrame(draw);
}
