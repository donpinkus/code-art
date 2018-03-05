const drawTriangle = regl({
  // fragment shader
  frag: `
  precision mediump float;
  uniform vec4 color;
  void main () {
    gl_FragColor = color;
  }`,

  // vertex shader
  vert: `
  precision mediump float;
  attribute vec2 position;
  void main () {
    gl_Position = vec4(position, 0, 1);
  }`,

  // attributes
  attributes: {
    position: [[-1, 0], [0, -1], [1, 1]]
  },

  // uniforms
  uniforms: {
    color: [0.1, 0.6, 0, 1]
  },

  // vertex count
  count: 3
});

drawTriangle();
