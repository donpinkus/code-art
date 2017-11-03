var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  angle = 0;

canvas.width = canvas.height = 400;

// red
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, 400, 400);
ctx.fillStyle = "rgb(255,0,0)";

// yellow
var yellowWidth = 190;

ctx.fillRect(10, 10, yellowWidth, yellowWidth);
ctx.fillStyle = "rgb(255,255,0)";
ctx.fillRect(250, 250, 90, 90);

// Create a temp canvas to store our data (because we need to delete the other box.
var tempCanvas = document.createElement("canvas"),
  tempCtx = tempCanvas.getContext("2d");

tempCanvas.width = canvas.width;
tempCanvas.height = canvas.height;
tempCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height);

function doRotate() {
  angle += 5;

  // Now clear the portion to rotate.
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  // Translate (190/2 is half of the box we drew)
  ctx.translate(yellowWidth / 2, yellowWidth / 2);
  // Scale
  // ctx.scale(0.5, 0.5);
  // Rotate it
  ctx.rotate(angle * Math.PI / 180);

  // Finally draw the image data from the temp canvas.
  // image, dx, dy, dWidth, dHeight,
  ctx.drawImage(
    tempCanvas,
    0, // sourceX
    0, // sourceY
    200, // sourceWidth
    200, // sourceHeight
    -1 * yellowWidth / 2, // dX
    -1 * yellowWidth / 2, // dY
    yellowWidth, // dWidth
    yellowWidth // dHeight
  );

  ctx.restore();
  requestAnimationFrame(doRotate);
}

doRotate();
