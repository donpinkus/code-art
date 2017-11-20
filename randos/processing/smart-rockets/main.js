var rocket;
var population;
var lifespan = 300;
var lifeP;
var maxFitP;
var minFitP;
var count = 0;
var target;

var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

function setup() {
  createCanvas(500, 500);
  rocket = new Rocket();
  population = new Population();
  lifeP = createP();
  maxFitP = createP();
  target = createVector(width / 2, 50);
}

function draw() {
  background(0);
  population.run();
  lifeP.html(count);

  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
  }

  // obstacle
  fill(255);
  rect(rx, ry, rw, rh);

  fill(255);
  ellipse(target.x, target.y, 16, 16);
}

function Population() {
  this.rockets = [];
  this.popsize = 500;
  this.matingPool = [];

  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  // The process of natural selection!
  this.evaluate = function() {
    var maxfit = 0;

    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }

    maxFitP.html(maxfit);

    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit; // Normalize fitness vals
    }

    this.matingPool = [];
    for (var i = 0; i < this.popsize; i++) {
      // Add fit rockets much more.
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.rockets[i]);
      }
    }

    this.selection = function() {
      var newRockets = [];

      for (var i = 0; i < this.rockets.length; i++) {
        const a = Math.floor(Math.random() * this.matingPool.length);
        const b = Math.floor(Math.random() * this.matingPool.length);

        var parentA = this.matingPool[a];
        var parentB = this.matingPool[b];
        var child = parentA.dna.crossover(parentB);
        child.mutate();

        newRockets[i] = new Rocket(child);
      }

      this.rockets = newRockets;
    };
  };

  this.run = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  };
}

function DNA(genes) {
  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(0.1);
    }
  }

  // For each gene spot, randomly chooses one from each partner.
  this.crossover = function(partner) {
    var newgenes = [];
    var mid = floor(random(this.genes.length));

    for (var i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.dna.genes[i];
      }
    }

    return new DNA(newgenes);
  };

  this.mutate = function() {
    for (var i = 00; i < this.genes.length; i++) {
      if (Math.random() < 0.05) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.1);
      }
    }
  };
}

function Rocket(dna) {
  this.pos = createVector(width / 2, height);
  this.vel = createVector();
  this.acc = createVector();
  this.crashed = false;

  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }

  this.fitness;

  this.applyForce = function(force) {
    // Acceleration is 0 after each update.
    this.acc.add(force);
  };

  this.calcFitness = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);

    this.fitness = map(d, 0, width, width, 0);

    if (this.crashed) {
      this.fitness = 1;
    }

    this.fitness = Math.pow(this.fitness, 2);
  };

  this.update = function() {
    const hitObstacle =
      this.pos.x > rx &&
      this.pos.x < rx + rw &&
      this.pos.y > ry &&
      this.pos.y < ry + rh;

    const hitWall =
      this.pos.x > width ||
      this.pos.x < 0 ||
      this.pos.y > height ||
      this.pos.y < 0;

    if (hitObstacle || hitWall) {
      this.crashed = true;
    }

    this.applyForce(this.dna.genes[count]);

    if (!this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  };

  this.show = function() {
    push(); // rotating and translating wont effect other objects
    noStroke();
    fill(255, 80);
    translate(this.pos.x, this.pos.y);

    rotate(this.vel.heading()); // Gives angle vector is pointing
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  };
}
