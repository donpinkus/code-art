var VSHADER_SOURCE = `
  attribute vec4 a_Position;

  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`;

var FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

function main() {
  var canvas = document.getElementById("example");

  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("no gl");
    return;
  }

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Failed to initialize shaders");
    return;
  }

  // Set the positions of vertices
  var n = initVertexBuffers(gl);

  if (n < 0) {
    console.log("failed to set the positions of the vertices");
    return;
  }

  // Clear
  gl.clearColor(0.0, 0.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw three points
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // n is 3

  function initVertexBuffers(gl) {
    let vertices = new Float32Array([
      -0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      0.5,
      0.5,
      -0.5
    ]);

    let n = vertices.length / 2;

    // 1. Create a buffer object
    let vertexBuffer = gl.createBuffer();
    // 2. Bind the buffer object to target. Basically sets ARRAY_BUFFER (the target) equal to vertexBuffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 3. Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    let a_Position = gl.getAttribLocation(gl.program, "a_Position");

    // 4. Assign the buffer object to an attribute variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // 5. Enable assignment
    gl.enableVertexAttribArray(a_Position);

    return n;
  }
}
