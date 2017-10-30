var c = document.querySelector(".canvas");

var gl = c.getContext("webgl", { preserveDrawingBuffer: false });
var w = (c.width = window.innerWidth);
var h = (c.height = window.innerHeight);

// Setup the WEBGL program.
webgl.vertexShader = gl.createShader(gl.VERTEX_SHADER);
// Assign a string to a shader.
gl.shaderSource(webgl.vertexShader, webgl.vertexShaderSource);
// Compile the shader.
gl.compileShader(webgl.vertexShader);

webgl.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(webgl.fragmentShader, webgl.fragmentShaderSource);
gl.compileShader(webgl.fragmentShader);

webgl.shaderProgram = gl.createProgram();
gl.attachShader(webgl.shaderProgram, webgl.vertexShader);
gl.attachShader(webgl.shaderProgram, webgl.fragmentShader);
gl.linkProgram(webgl.shaderProgram);
gl.useProgram(webgl.shaderProgram);

// Track webgl variables.
webgl.attribLocs = {
  position: gl.getAttribLocation(webgl.shaderProgram, "a_position")
};

webgl.buffers = {
  position: gl.createBuffer()
};

webgl.uniformLocs = {
  tick: gl.getUniformLocation(webgl.shaderProgram, "u_tick"),
  mode: gl.getUniformLocation(webgl.shaderProgram, "u_mode"),
  resolution: gl.getUniformLocation(webgl.shaderProgram, "u_resolution")
};

// The WebGLRenderingContext.enableVertexAttribArray() method of the WebGL API turns the generic vertex attribute array on at a given index position.
gl.enableVertexAttribArray(webgl.attribLocs.position);
// The WebGLRenderingContext.bindBuffer() method of the WebGL API binds a given WebGLBuffer to a target.
// gl.ARRAY_BUFFER: Buffer containing vertex attributes, such as vertex coordinates, texture coordinate data, or vertex color data.
gl.bindBuffer(gl.ARRAY_BUFFER, webgl.buffers.position);
// The WebGLRenderingContext.vertexAttribPointer() method of the WebGL API specifies the memory layout of the buffer holding the vertex attributes.
// void gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
gl.vertexAttribPointer(webgl.attribLocs.position, 3, gl.FLOAT, false, 0, 0);

gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

gl.viewport(0, 0, w, h);
gl.uniform2f(webgl.uniformLocs.resolution, w, h);

webgl.data = {
  position: []
};

webgl.draw = function(glType) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(webgl.data.position),
    gl.STATIC_DRAW
  );
  gl.drawArrays(glType, 0, webgl.data.position.length / 3);
};

webgl.clear = function(z) {
  var a = w / 2,
    A = -a,
    b = h / 2,
    B = -b;

  webgl.data.position = [A, B, z, a, B, z, A, b, z, A, b, z, a, b, z, a, B, z];

  gl.uniform1i(webgl.uniformLocs.mode, 0);
  webgl.draw(gl.TRIANGLES);
  gl.uniform1i(webgl.uniformLocs.mode, 1);
  webgl.data.position.length = 0;
};

var particles = [],
  tick = 0,
  opts = {
    baseW: 0.005,
    addedW: 0.015
  };

function Particle(radius, radian) {
  this.radius = radius;
  this.radian = radian + 6.2831853071;
  this.w = opts.baseW + opts.addedW * Math.random();
}

Particle.prototype.step = function() {
  if (Math.random() < 0.1) {
    this.w += (Math.random() - 0.5) / 100000;
  }

  var pr = this.radian;

  this.radian += this.w;

  webgl.data.position.push(
    this.radius,
    pr,
    0.99,
    this.radius,
    this.radian,
    0.99,
    0,
    this.radian,
    0.01,
    this.radius,
    this.radian,
    0.04
  );
};

function anim() {
  window.requestAnimationFrame(anim);

  webgl.clear(0.1);

  if (particles.length < 5) {
    for (var i = 0; i < 4; ++i) {
      particles.push(
        new Particle(
          // radius
          Math.random() * Math.min(w, h),
          // angle
          Math.random() * Math.PI * 2
        )
      );
    }
  }

  particles.map(function(particle) {
    particle.step();
  });

  ++tick;
  gl.uniform1f(webgl.uniformLocs.tick, tick);

  webgl.draw(gl.TRIANGLES);
  webgl.data.position.length = 0;
}

anim();

window.addEventListener("resize", function() {
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  gl.viewport(0, 0, w, h);
  gl.uniform2f(webgl.uniformLocs.resolution, w, h);
});

function spawnParticle(x, y) {
  var dx = x - w / 2;
  var dy = y - h / 2;

  particles.push(
    new Particle(
      Math.sqrt(dx * dx + dy * dy),
      Math.atan(dy / dx) - (dx < 0 ? Math.PI : 0)
    )
  );
}

var isMouseDown = false;

window.addEventListener("mousedown", function(e) {
  isMouseDown = true;
  spawnParticle(e);
});

window.addEventListener("mousemove", function(e) {
  if (isMouseDown) spawnParticle(e.clientX, e.clientY);
});

window.addEventListener("mouseup", function() {
  isMouseDown = false;
});

window.addEventListener("contextmenu", function(e) {
  e.preventDefault();
  particles.length = 0;
});
