var g = {
  w: window.innerWidth,
  h: window.innerHeight
};

var mic;
var amp;

var scale = 1.0;

var bg;

var colorSets = {};

var maxCentroid = 2000;

var showInstructions = true;

function setup() {
  colorMode(RGB);
  createCanvas(g.w, g.h);
  background(255);

  // Some color options...
  colorSets.bright = {
    from: color(192, 67, 173),
    to: color(109, 213, 243)
  };

  colorSets.fire = {
    from: color(44, 20, 45),
    to: color(239, 133, 87)
  };

  // orange
  bg = color(243, 191, 160, 10);
  bg = color(205, 118, 121, 5);

  fft = new p5.FFT(0.1);

  audioIn = new p5.AudioIn();
  audioIn.start();

  // Amplitude analyzer
  amp = new p5.Amplitude();
  amp.setInput(audioIn);

  fft.setInput(audioIn);
}

function draw() {
  renderBackground();
  renderAmpCircle();
  renderFreq1();

  if (maxCentroid > 2000 && showInstructions === true) {
    showInstructions = false;
    var thingsToHide = document.querySelectorAll(".hideOnSound");
    thingsToHide.forEach(function(node) {
      node.remove();
    });
  }
}

function renderBackground() {
  noStroke();
  fill(bg);
  rect(0, 0, g.w, g.h);
}

function renderFreq1() {
  var spectrum = fft.analyze();
  var centroid = fft.getCentroid();

  if (centroid > maxCentroid) {
    maxCentroid = centroid;
  }

  // Calculate center;
  var sum = 0;
  var count = 0;
  var avg;

  spectrum.forEach(function(bin, i) {
    sum += bin * i;
    count += bin;
  });

  avg = sum / count;

  fromColor = colorSets.bright.from;
  toColor = colorSets.bright.to;

  color = lerpColor(fromColor, toColor, Math.min(centroid / maxCentroid, 1));

  console.log(centroid);

  noStroke();
  fill(color); // spectrum is green
  for (var i = 0; i < spectrum.length; i++) {
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }
}

function renderAmpCircle() {
  scale = map(amp.getLevel(), 0, 1.0, 10, width);

  // Draw the circle based on the volume
  fill(255, 224, 187);
  ellipse(width / 2, height / 2, scale, scale);
}
