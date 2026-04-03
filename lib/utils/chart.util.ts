import { MathUtil } from "./math.util";

export class ChartUtil {
  static GenerateChiSquareCurve(df: number, chiSquareValue: number, criticalValue: number) {
    if (df < 1) return [];

    const points = 200;
    const maxX = Math.max(chiSquareValue * 1.5, df + 3 * Math.sqrt(2 * df), 15);
    const data = [];

    for (let i = 0; i <= points; i++) {
      const x = (i / points) * maxX;
      const y = MathUtil.ChiSquarePDF(x, df);
      data.push({ x, y, critical: x >= criticalValue ? y : 0 });
    }

    return data;
  }

  static GenerateChartData(observed: number[], expected: number[]) {
    return observed.map((oi, i) => ({
      category: `Cat ${i + 1}`,
      observed: oi,
      expected: expected[i]
    }));
  }
}
