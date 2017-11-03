let g = {
  mousePos: {
    x: 0,
    y: 0
  },
  drawCanvas: null,
  drawCtx: null,
  viewCanvas: null,
  viewCtx: null,
  rotationAngle: 1,
  t: 0
};

document.addEventListener("DOMContentLoaded", onDocumentReady);
document.addEventListener("mousemove", onMouseMove);

function onDocumentReady(e) {
  g.drawCanvas = document.getElementById("drawCanvas");
  g.viewCanvas = document.getElementById("viewCanvas");

  g.drawCtx = g.drawCanvas.getContext("2d");
  g.viewCtx = g.viewCanvas.getContext("2d");

  g.drawCanvas.width = g.viewCanvas.width = window.innerWidth;
  g.drawCanvas.height = g.viewCanvas.height = window.innerHeight;

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

  console.log(g.mousePos.x, g.mousePos.y);
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

  // g.drawCtx.fillStyle = "rgb(0, 0, 255)";
  // g.drawCtx.fillRect(transX, transY, 10, 10);

  g.drawCtx.fillStyle = "rgb(0, 255, 0)";
  g.drawCtx.fillRect(drawX, drawY, 10, 10);

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
