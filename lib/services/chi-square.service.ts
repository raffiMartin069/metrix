export class ChiSquareService {
  private static readonly CRITICAL_VALUES: { [key: number]: number } = {
    1: 3.841, 2: 5.991, 3: 7.815, 4: 9.488, 5: 11.070,
    6: 12.592, 7: 14.067, 8: 15.507, 9: 16.919, 10: 18.307
  };

  static GetCriticalValue(df: number): number {
    return this.CRITICAL_VALUES[df] || 3.841 + (df - 1) * 2;
  }

  static Calculate(observed: number[]) {
    const total = observed.reduce((sum, val) => sum + val, 0);

    if (total === 0) {
      return { chiSquare: 0, df: 0, expected: [], criticalValue: 3.841 };
    }

    const expected = observed.map(() => total / observed.length);
    const chiSquare = observed.reduce((sum, oi, i) => {
      const ei = expected[i];
      return sum + Math.pow(oi - ei, 2) / ei;
    }, 0);

    const df = observed.length - 1;
    const criticalValue = this.GetCriticalValue(df);

    return { chiSquare, df, expected, criticalValue };
  }
}
