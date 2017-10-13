window.LUT = function(LUTValues, dim) {
  this.DIM = dim;

  this.LUT = LUTValues;

  // Each param ranges between 0 - 32. Has to be an integer since it's an array lookup.
  this.lookup = function(r, g, b, isBtwn0And1) {
    if (isBtwn0And1) {
      r = Math.floor(r * this.DIM);
      g = Math.floor(g * this.DIM);
      b = Math.floor(b * this.DIM);
    }

    // Given an r, g, b... combine them into 1 lookup index.
    const i = (r + g * DIM + b * DIM * DIM) * 3;

    return {
      r: this.LUT[i],
      g: this.LUT[i + 1],
      b: this.LUT[i + 2]
    };
  };
};
