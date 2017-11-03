let g = {
  rotation: 0,
  rotationIncr: Math.PI / (5 * 0.5 * 60),
  canvas: null,
  ctx: null,
  mousePos: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }
};

document.addEventListener("DOMContentLoaded", onDocumentReady);
document.addEventListener("mousemove", onMouseMove);

function onMouseMove(e) {
  g.mousePos = {
    x: e.clientX,
    y: e.clientY
  };
}

function onDocumentReady() {
  g.canvas = document.querySelector("#canvas");
  g.canvas.height = window.innerHeight;
  g.canvas.width = window.innerWidth;

  g.ctx = canvas.getContext("2d");

  draw();
}

function draw() {
  g.ctx.fillStyle = "rgba(255, 255, 255, 0.01)";

  var rectWidth = 300;
  var rectHeight = 10;

  g.ctx.save();
  g.ctx.translate(g.mousePos.x, g.mousePos.y);
  g.ctx.rotate(g.rotation);
  g.ctx.fillRect(rectWidth / -2, rectHeight / -2, rectWidth, rectHeight);
  g.ctx.restore();

  g.rotation += g.rotationIncr;

  requestAnimationFrame(draw);
}
