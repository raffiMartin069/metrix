interface HypothesisResultProps {
  chiSquare: number;
  criticalValue: number;
  df: number;
  nullHypothesis: string;
  altHypothesis: string;
}

/**
 * Displays the hypothesis test result with actual hypothesis statements
 * Shows whether to reject or fail to reject the null hypothesis
 */
export default function HypothesisResult({ 
  chiSquare, 
  criticalValue, 
  df,
  nullHypothesis, 
  altHypothesis 
}: HypothesisResultProps) {
  const isRejected = chiSquare > criticalValue;

  return (
    <div className="space-y-4">
      {/* Test Statistics Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-600 mb-1">Critical Value (α=0.05)</p>
          <p className="text-lg font-bold text-slate-700">{criticalValue.toFixed(3)}</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-600 mb-1">Degrees of Freedom</p>
          <p className="text-lg font-bold text-slate-700">{df}</p>
        </div>
      </div>

      {/* Formula */}
      <div className="p-3 md:p-4 bg-slate-50 rounded-lg">
        <p className="text-xs md:text-sm text-slate-700">
          <span className="font-semibold">Formula:</span> χ² = Σ[(Oᵢ - Eᵢ)² / Eᵢ]
        </p>
      </div>

      {/* Decision */}
      <div className={`p-4 rounded-lg border-2 ${
        isRejected
          ? 'bg-red-50 border-red-300'
          : 'bg-green-50 border-green-300'
      }`}>
        <p className="text-sm font-bold mb-2">
          {isRejected ? '🔴 Reject H₀' : '🟢 Fail to Reject H₀'}
        </p>
        <p className="text-xs md:text-sm text-slate-700 mb-3">
          χ² ({chiSquare.toFixed(3)}) {isRejected ? '>' : '≤'} Critical Value ({criticalValue.toFixed(3)})
        </p>
        
        {/* Display appropriate hypothesis */}
        <div className="mt-3 pt-3 border-t border-slate-300">
          {isRejected ? (
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1">Conclusion:</p>
              <p className="text-sm text-slate-800">
                {altHypothesis || "There is a significant difference between observed and expected frequencies."}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1">Conclusion:</p>
              <p className="text-sm text-slate-800">
                {nullHypothesis || "There is no significant difference between observed and expected frequencies."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
