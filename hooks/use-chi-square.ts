import { useMemo } from "react";
import { ChiSquareService } from "@/lib/services/chi-square.service";
import { ChartUtil } from "@/lib/utils/chart.util";
import { ChiSquareRow } from "./use-chi-square-table";

export const useChiSquare = (rows: ChiSquareRow[]) => {
  return useMemo(() => {
    // Parse observed values from rows
    const observed = rows.map(r => parseFloat(r.observed) || 0).filter(v => v >= 0);
    const categories = rows.map(r => r.category || `Category ${rows.indexOf(r) + 1}`);
    
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
    const chartData = ChartUtil.GenerateChartData(observed, stats.expected, categories);
    const curveData = ChartUtil.GenerateChiSquareCurve(stats.df, stats.chiSquare, stats.criticalValue);

    return { ...stats, chartData, curveData };
  }, [rows]);
};
