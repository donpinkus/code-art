window.IdentityLUT = function() {
  let identityInstance = [];

  this.logged = 0;

  this.DIM = DIM = 33;
  const SUB_DIM = DIM - 1;

  for (let b = 0; b < DIM; b++) {
    for (let g = 0; g < DIM; g++) {
      for (let r = 0; r < DIM; r++) {
        identityInstance.push(r / SUB_DIM);
        identityInstance.push(g / SUB_DIM);
        identityInstance.push(b / SUB_DIM);
      }
    }
  }

  this.LUT = identityInstance;

  // Each param ranges between 0 - 32. Has to be an integer since it's an array lookup.
  this.lookup = function(r, g, b, isBtwn0And1) {
    if (isBtwn0And1) {
      r = Math.floor(r * this.DIM);
      g = Math.floor(g * this.DIM);
      b = Math.floor(b * this.DIM);
    }

    // Given an r, g, b... combine them into 1 lookup index.
    const i = (r + g * DIM + b * DIM * DIM) * 3;

    if (this.logged < 3) {
      console.log("index", i);
      this.logged++;
    }

    return {
      r: this.LUT[i],
      g: this.LUT[i + 1],
      b: this.LUT[i + 2]
    };
  };
};
