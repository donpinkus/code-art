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
  g.drawCtx.fillRect(0, 0, 20, 20);

  draw();
}

function onMouseMove(e) {
  g.mousePos = {
    x: e.clientX,
    y: e.clientY
  };
}

function draw() {
  // Draw on canvas
  g.drawCtx.save();
  g.drawCtx.fillStyle = "rgb(0, 0, 255)";
  g.drawCtx.fillRect(
    g.mousePos.x - window.innerWidth / 2,
    g.mousePos.y - window.innerHeight / 2,
    10,
    10
  );
  g.drawCtx.restore();

  // Copy drawCtx to viewCtx.
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
  g.viewCtx.restore();

  requestAnimationFrame(draw);
}
