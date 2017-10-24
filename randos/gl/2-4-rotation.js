var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_CosB, u_SinB;

  void main() {
    gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
    gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
    gl_Position.z = a_Position.z;
    gl_Position.w = 1.0;
  }
`;

var FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

var ANGLE = 90.0;

function main() {
  const canvas = document.getElementById("example");
  const gl = getWebGLContext(canvas);

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  // Clear
  gl.clearColor(0.0, 0.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 1. Create a buffer object
  const vertexBuffer = gl.createBuffer();

  // 2. Bind the buffer object to target. Basically sets ARRAY_BUFFER (the target) equal to vertexBuffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // 3. Write data into the buffer object
  const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  const n = vertices.length / 2;
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // 4. Assign the buffer object to an attribute variable
  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // 5. Enable assignment
  gl.enableVertexAttribArray(a_Position);

  // Define translation
  const radian = Math.PI * ANGLE / 180.0;
  const cosB = Math.cos(radian);
  const sinB = Math.sin(radian);
  const u_CosB = gl.getUniformLocation(gl.program, "u_CosB");
  const u_SinB = gl.getUniformLocation(gl.program, "u_SinB");
  gl.uniform1f(u_CosB, cosB);
  gl.uniform1f(u_SinB, sinB);

  // Draw three points
  gl.drawArrays(gl.TRIANGLES, 0, n); // n is 3
}
