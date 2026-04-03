interface ChiSquareStatsProps {
  chiSquare: number;
  df: number;
  criticalValue: number;
}

/**
 * Displays the key statistics for Chi-square test:
 * Chi-square statistic, Degrees of Freedom, and Critical Value
 */
export default function ChiSquareStats({ chiSquare, df, criticalValue }: ChiSquareStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
      <div className="bg-blue-50 rounded-lg p-3 md:p-4">
        <p className="text-xs text-slate-600 mb-1">χ² Statistic</p>
        <p className="text-xl md:text-2xl font-bold text-blue-600">{chiSquare.toFixed(4)}</p>
      </div>
      <div className="bg-purple-50 rounded-lg p-3 md:p-4">
        <p className="text-xs text-slate-600 mb-1">Degrees of Freedom</p>
        <p className="text-xl md:text-2xl font-bold text-purple-600">{df}</p>
      </div>
      <div className="bg-orange-50 rounded-lg p-3 md:p-4">
        <p className="text-xs text-slate-600 mb-1">Critical Value (α=0.05)</p>
        <p className="text-xl md:text-2xl font-bold text-orange-600">{criticalValue.toFixed(3)}</p>
      </div>
    </div>
  );
}
