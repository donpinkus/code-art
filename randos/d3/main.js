console.log("hi");
// Canvas settings
const width = 500;
const height = 500;

// point settings
const numPoints = 20000;
const pointWidth = 1;
const pointMargin = 1;

const colorScale = d3
  .scaleSequential(d3.interpolateViridis)
  .domain([numPoints - 1, 0]);

const points = d3.range(numPoints).map(index => ({
  id: index,
  color: colorScale(index)
}));

function draw() {
  const ctx = document.querySelector("canvas").getContext("2d");
  ctx.save();

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < points.length; ++i) {
    const point = points[i];
    ctx.fillStyle = point.color;
    ctx.fillRect(point.x, point.y, pointWidth, pointWidth);
  }

  ctx.restore();
}

function animate() {
  points.forEach(point => {
    point.sx = point.x;
    point.sy = point.y;
  });

  sineLayout(points, pointWidth + pointMargin, width, width);

  points.forEach(point => {
    point.tx = point.x;
    point.ty = point.y;
  });

  const duration = 1500;
  const ease = d3.easeQuadInOut;

  timer = d3.timer(elapsed => {
    // let t = elapsed / duration;
    let t = Math.min(1, ease(elapsed / duration));
    console.log("elapsed:", elapsed, "t:", t);

    if (elapsed === duration || elapsed > duration) {
      timer.stop();
      t = 1;

      animate();
    }

    points.forEach(point => {
      point.x = point.sx * (1 - t) + point.tx * t;
      point.y = point.sy * (1 - t) + point.ty * t;
    });

    draw();
  });
}

phyllotaxisLayout(points, pointWidth + pointMargin, width, height);
draw();
animate();
