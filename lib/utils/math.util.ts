export class MathUtil {
  static Gamma(z: number): number {
    if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * this.Gamma(1 - z));
    z -= 1;
    const g = 7;
    const C = [
      0.99999999999980993, 676.5203681218851, -1259.1392167224028,
      771.32342877765313, -176.61502916214059, 12.507343278686905,
      -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
    ];
    let x = C[0];
    for (let i = 1; i < g + 2; i++) {
      x += C[i] / (z + i);
    }
    const t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
  }

  static ChiSquarePDF(x: number, df: number): number {
    if (x <= 0) return 0;
    const k = df / 2;
    const numerator = Math.pow(x, k - 1) * Math.exp(-x / 2);
    const denominator = Math.pow(2, k) * this.Gamma(k);
    return numerator / denominator;
  }
}
