var rocket;
var population;
var lifespan = 200;
var lifeP;
var maxFitP;
var minFitP;
var count = 0;
var target;
var popSize = 100;

var gWidth = window.innerWidth;
var gHeight = window.innerHeight;

function setup() {
  createCanvas(gWidth, gHeight);
  rocket = new Rocket();
  population = new Population();
  lifeP = createP();
  maxFitP = createP();
  target = createVector(gWidth / 2, gHeight / 6);

  background(40);
}

function draw() {
  background(0, 0.9);
  population.run();
  lifeP.html(count);

  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
  }

  fill("rgb(249, 38, 114)");
  ellipse(target.x, target.y, 16, 16);
}

function Population() {
  this.rockets = [];
  this.popsize = window.popSize;
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
      var n = this.rockets[i].fitness * 1000;
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
      if (Math.random() < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.1);
      }
    }
  };
}

function Rocket(dna) {
  this.pos = createVector(width / 2, height / 6 * 5);
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
    var d = 1 / dist(this.pos.x, this.pos.y, target.x, target.y);

    this.fitness = Math.pow(d, 10);
  };

  this.update = function() {
    this.applyForce(this.dna.genes[count]);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.show = function() {
    push(); // rotating and translating wont effect other objects
    noStroke();
    fill(255);
    translate(this.pos.x, this.pos.y);

    rotate(this.vel.heading()); // Gives angle vector is pointing
    rectMode(CENTER);
    rect(0, 0, 5, 2);
    pop();
  };
}
