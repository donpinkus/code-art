function main() {
  var canvas = document.getElementById("example");

  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("no gl");
    return;
  }

  // Vertex Shader
  var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute float a_PointSize;

    void main() {
      gl_Position = a_Position;
      gl_PointSize = a_PointSize;
    }
  `;

  var FSHADER_SOURCE = `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);
    }
  `;

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Failed to initialize shaders");
    return;
  }

  gl.clearColor(0.0, 0.0, 1.0, 1.0);

  // Get the storage location of attribute variable.
  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");

  if (a_Position < 0) {
    console.log("failed to get position");
    return;
  }

  // Pass vertex position to attribute variable.
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
  gl.vertexAttrib1f(a_PointSize, 15.0);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
}
