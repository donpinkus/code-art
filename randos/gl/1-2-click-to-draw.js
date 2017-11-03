var VSHADER_SOURCE = `
  attribute vec4 a_Position;

  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`;

var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;

  void main() {
    gl_FragColor = u_FragColor;
  }
`;

function main() {
  var canvas = document.getElementById("canvas");

  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("no gl");
    return;
  }

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Failed to initialize shaders");
    return;
  }

  // Get the storage location of attribute variable.
  const a_Position = gl.getAttribLocation(gl.program, "a_Position");

  const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");

  console.log(a_Position);
  console.log(u_FragColor);
  if (!u_FragColor) {
    console.log("Failed to get u_FragColor variable");
    return;
  }

  let g_points = [];
  let g_colors = [];

  function handleCanvasClick(e) {
    // Position
    let x = e.clientX;
    let y = e.clientY;
    let rect = e.target.getBoundingClientRect();

    // Convert to (-1, 1) domain.
    x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    g_points.push([x, y]);

    // Colors
    if (x >= 0 && y >= 0) {
      g_colors.push([1.0, 0.0, 0.0, 1.0]);
    } else {
      g_colors.push([0.0, 1.0, 0.0, 1.0]);
    }

    gl.clear(gl.COLOR_BUFFER_BIT);

    for (var i = 0; i < g_points.length; i++) {
      gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0);

      gl.uniform4f(
        u_FragColor,
        g_colors[i][0],
        g_colors[i][1],
        g_colors[i][2],
        g_colors[i][3]
      );

      gl.drawArrays(gl.POINTS, 0, 1);
    }
  }

  canvas.addEventListener("mousemove", e => handleCanvasClick(e));

  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

  gl.clearColor(0.0, 0.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
}
