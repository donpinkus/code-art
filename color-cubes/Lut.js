class LUT {
  constructor(LUTValues, dim) {
    this.LUT = LUTValues;
    this.DIM = dim;
  }

  /*
    Each param ranges between 0 - 32. Has to be an integer since it's an array lookup.
  */
  lookup(r, g, b, isBtwn0And1) {
    if (isBtwn0And1) {
      r = Math.floor(r * this.DIM);
      g = Math.floor(g * this.DIM);
      b = Math.floor(b * this.DIM);
    }

    // Given an (r, g, b) combine them into 1 lookup index
    const i = (r + g * this.DIM + b * this.DIM * this.DIM) * 3;

    return {
      r: this.LUT[i],
      g: this.LUT[i + 1],
      b: this.LUT[i + 2]
    };
  }

  /* TODO: In progress */
  getLUTValue(r, g, b) {
    // If it falls on a point, return that point.
    // We have a point every 1 / 33 * n, with n between 0 and 33.
    if (
      checkEquality(r % (1 / 33), 3) &&
      checkEquality(g % (1 / 33), 3) &&
      checkEquality(b % (1 / 33), 3)
    ) {
      this.lookup(r, g, b);
      // TODO
    }
  }

  /* Number helpers */
  static fromNormToInt(num) {
    return Math.round(num * 32);
  }

  static fromIntToNorm(num) {
    return num / 32;
  }

  static fromNormTo8Bit(num) {
    return num * 255;
  }

  static checkFloatEquality(a, b, sigDigits) {
    return Math.abs(a - b) < 1 / (sigDigits * 10);
  }

  /* Lerps */
  static lerp() {
    return (1 - intensity) * low + intensity * high;
  }

  static colorLerp(r1, g1, b1, r2, g2, b2, intensity) {
    return {
      r: myLerp(r1, r2, intensity),
      g: myLerp(b1, b2, intensity),
      b: myLerp(g1, g2, intensity)
    };
  }

  static LUTLerp(lut1, lut2, intensity) {
    lerpLUTValues = [];

    if (lut1.length !== lut2.length) {
      throw new Error("Provided LUTs of different lengths.");
    }

    for (var i = 0; i < lut1.length; i++) {
      var lerpVal = myLerp(lut1[i], lut2[i], intensity);
      lerpLUTValues.push(lerpVal);
    }

    return new LUT(lerpLUTValues, 33);
  }

  /* TODO: In progress */
  static getLUTValuesFromFile(file) {
    // First line is title
    // Second line is dim
    const lines = file.split(/\n/);
    const dim = lines[1].split(" ")[1];

    const dataLines = lines.splice(0, 2);

    // 1D array of color LUT values.
    const vals = dataLines.join(" ").split(" ");

    return vals;
  }
}
