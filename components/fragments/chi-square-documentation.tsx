import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ChiSquareDocumentation() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-3xl">Chi-Square Goodness of Fit Test</CardTitle>
        <CardDescription>A comprehensive guide to understanding and interpreting the test</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">

      <div className="grid md:grid-cols-2 gap-8">
        {/* What is it */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 bg-blue-500 rounded-full" />
            <h3 className="text-lg font-semibold text-slate-800">What is it?</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">The Chi-Square Goodness of Fit Test determines whether observed frequencies differ significantly from expected frequencies.</p>
        </div>

        {/* Degrees of Freedom */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 bg-purple-500 rounded-full" />
            <h3 className="text-lg font-semibold text-slate-800">Degrees of Freedom</h3>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-center text-xl font-mono font-bold text-slate-700">df = n - 1</p>
          </div>
          <p className="text-slate-600 text-sm">Where <strong>n</strong> is the number of categories.</p>
        </div>
      </div>

      {/* Formula */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-emerald-500 rounded-full" />
          <h3 className="text-lg font-semibold text-slate-800">Formula</h3>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200">
          <p className="text-center text-2xl font-mono font-bold text-slate-800">χ² = Σ [(Oᵢ - Eᵢ)² / Eᵢ]</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-700 mb-1">Oᵢ</p>
            <p className="text-xs text-slate-600">Observed frequency for category i</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-700 mb-1">Eᵢ</p>
            <p className="text-xs text-slate-600">Expected frequency for category i</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-700 mb-1">Σ</p>
            <p className="text-xs text-slate-600">Sum across all categories</p>
          </div>
        </div>
      </div>

      {/* Calculation Steps */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-amber-500 rounded-full" />
          <h3 className="text-lg font-semibold text-slate-800">Calculation Steps</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">1</div>
            <p className="text-slate-600 pt-1">Calculate expected frequencies (E) for each category</p>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-sm">2</div>
            <p className="text-slate-600 pt-1">For each category, compute (O - E)²</p>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">3</div>
            <p className="text-slate-600 pt-1">Divide each result by E</p>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold text-sm">4</div>
            <p className="text-slate-600 pt-1">Sum all values to get χ²</p>
          </div>
        </div>
      </div>

      {/* Critical Value Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-red-500 rounded-full" />
          <h3 className="text-lg font-semibold text-slate-800">Critical Value Reference</h3>
        </div>
        <p className="text-sm text-slate-600">Critical values from the chi-square distribution table at α = 0.05 significance level:</p>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-300">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Degrees of Freedom</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-700">Critical Value (α=0.05)</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-200 hover:bg-white transition-colors">
                <td className="py-3 px-4">1</td>
                <td className="text-right py-3 px-4 font-mono">3.841</td>
              </tr>
              <tr className="border-b border-slate-200 hover:bg-white transition-colors">
                <td className="py-3 px-4">2</td>
                <td className="text-right py-3 px-4 font-mono">5.991</td>
              </tr>
              <tr className="border-b border-slate-200 hover:bg-white transition-colors">
                <td className="py-3 px-4">3</td>
                <td className="text-right py-3 px-4 font-mono">7.815</td>
              </tr>
              <tr className="border-b border-slate-200 hover:bg-white transition-colors">
                <td className="py-3 px-4">4</td>
                <td className="text-right py-3 px-4 font-mono">9.488</td>
              </tr>
              <tr className="hover:bg-white transition-colors">
                <td className="py-3 px-4">5</td>
                <td className="text-right py-3 px-4 font-mono">11.070</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interpretation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-indigo-500 rounded-full" />
          <h3 className="text-lg font-semibold text-slate-800">Interpretation</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
            <p className="font-semibold text-red-900 mb-2">χ² &gt; Critical Value</p>
            <p className="text-sm text-red-700">Reject null hypothesis - there is a significant difference between observed and expected frequencies.</p>
          </div>
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-5">
            <p className="font-semibold text-emerald-900 mb-2">χ² ≤ Critical Value</p>
            <p className="text-sm text-emerald-700">Fail to reject null hypothesis - no significant difference between observed and expected frequencies.</p>
          </div>
        </div>
        </div>
      </CardContent>
    </Card>
  );
}
