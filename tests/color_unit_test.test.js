var expect = require("chai").expect;

var ColorIncreaser = require("../tdd.js").ColorIncreaser;

function mockColor(red, green, blue, alpha) {
  this.levels = [];
  this.levels[0] = red;
  this.levels[1] = green;
  this.levels[2] = blue;
  this.levels[3] = alpha;
}

describe("ColorIncreaser tests", function() {
  beforeEach(function() {
    var colorValueIncrease = 1;
    var fillColor = new mockColor(0, 0, 0, 255);
    colorIncreaser = new ColorIncreaser(colorValueIncrease);
  });

  it("should be an object", function(done) {
    expect(colorIncreaser).to.be.a("object");
    done();
  });

  it("should store initial values without mutation", function(done) {
    expect(colorIncreaser.colorValueIncrease).to.be.equal(1);
    expect(colorIncreaser.colorValueIncrease).to.be.equal(1);
    expect(colorIncreaser.fillColor.levels[0]).to.equal(0);
    expect(colorIncreaser.fillColor.levels[1]).to.equal(0);
    expect(colorIncreaser.fillColor.levels[2]).to.equal(0);
    expect(colorIncreaser.fillColor.levels[3]).to.equal(255);
    done();
  });
});
