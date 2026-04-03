import { useMemo } from "react";
import { ChiSquareService } from "@/lib/services/chi-square.service";
import { ChartUtil } from "@/lib/utils/chart.util";

export const useChiSquare = (grid: string[][]) => {
  return useMemo(() => {
    // Flatten and parse observed values from grid
    const observed = grid.flat().map(v => parseFloat(v) || 0).filter(v => v >= 0);
    
    // Skip calculation if no valid data
    if (observed.length === 0 || observed.every(v => v === 0)) {
      return {
        chiSquare: 0,
        df: 0,
        expected: [],
        criticalValue: 3.841,
        chartData: [],
        curveData: []
      };
    }
    
    const stats = ChiSquareService.Calculate(observed);
    const chartData = ChartUtil.GenerateChartData(observed, stats.expected);
    const curveData = ChartUtil.GenerateChiSquareCurve(stats.df, stats.chiSquare, stats.criticalValue);

    return { ...stats, chartData, curveData };
  }, [grid]);
};
