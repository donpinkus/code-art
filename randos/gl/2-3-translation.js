var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform vec4 u_Translation;

  void main() {
    gl_Position = a_Position + u_Translation;
  }
`;

var FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

var t = [0.5, 0.5, 0.0];

function main() {
  var canvas = document.getElementById("example");
  var gl = getWebGLContext(canvas);

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  // Clear
  gl.clearColor(0.0, 0.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 1. Create a buffer object
  let vertexBuffer = gl.createBuffer();

  // 2. Bind the buffer object to target. Basically sets ARRAY_BUFFER (the target) equal to vertexBuffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // 3. Write data into the buffer object
  let vertices = new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5]);
  let n = vertices.length / 2;
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // 4. Assign the buffer object to an attribute variable
  let a_Position = gl.getAttribLocation(gl.program, "a_Position");
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // 5. Enable assignment
  gl.enableVertexAttribArray(a_Position);

  // Define translation
  let u_Translation = gl.getUniformLocation(gl.program, "u_Translation");
  gl.uniform4f(u_Translation, t[0], t[1], t[2], 0.0);

  // Draw three points
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // n is 3
}
