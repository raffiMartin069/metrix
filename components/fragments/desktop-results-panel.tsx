import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";
import { TrendingUp, CheckCircle2, XCircle, BarChart3, Activity } from "lucide-react";

interface DesktopResultsPanelProps {
  chiSquare: number;
  df: number;
  criticalValue: number;
  chartData: Array<{ category: string; observed: number; expected: number }>;
  curveData: Array<{ x: number; y: number; critical: number }>;
  nullHypothesis: string;
  altHypothesis: string;
}

export default function DesktopResultsPanel({
  chiSquare,
  df,
  criticalValue,
  chartData,
  curveData,
  nullHypothesis,
  altHypothesis
}: DesktopResultsPanelProps) {
  const isRejected = chiSquare > criticalValue;
  const hasData = chartData.length > 0 && chartData.some(d => d.observed > 0);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </div>
          <CardTitle className="text-lg">Statistical Results</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">

      {!hasData ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 bg-slate-100 rounded-full mb-4">
            <BarChart3 className="h-12 w-12 text-slate-400" />
          </div>
          <p className="text-slate-500 font-medium mb-1">No data to analyze</p>
          <p className="text-sm text-slate-400">Enter observed frequencies to see results</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-5 border border-blue-200/50">
              <p className="text-xs font-semibold text-blue-700 mb-1 uppercase tracking-wide">Chi-Square</p>
              <p className="text-3xl font-bold text-blue-900">{chiSquare.toFixed(3)}</p>
              <p className="text-xs text-blue-600 mt-1">χ² statistic</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-5 border border-purple-200/50">
              <p className="text-xs font-semibold text-purple-700 mb-1 uppercase tracking-wide">Degrees of Freedom</p>
              <p className="text-3xl font-bold text-purple-900">{df}</p>
              <p className="text-xs text-purple-600 mt-1">df = n - 1</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-5 border border-amber-200/50">
              <p className="text-xs font-semibold text-amber-700 mb-1 uppercase tracking-wide">Critical Value</p>
              <p className="text-3xl font-bold text-amber-900">{criticalValue.toFixed(3)}</p>
              <p className="text-xs text-amber-600 mt-1">α = 0.05</p>
            </div>
          </div>

          {/* Hypothesis Result */}
          <div className={`p-5 rounded-xl border-2 ${
            isRejected 
              ? 'bg-gradient-to-br from-red-50 to-red-100/30 border-red-300' 
              : 'bg-gradient-to-br from-emerald-50 to-emerald-100/30 border-emerald-300'
          }`}>
            <div className="flex items-start gap-3">
              {isRejected ? (
                <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`text-base font-bold mb-1 ${
                  isRejected ? 'text-red-900' : 'text-emerald-900'
                }`}>
                  {isRejected ? 'Reject H₀' : 'Fail to Reject H₀'}
                </p>
                <p className="text-sm text-slate-600 mb-2">
                  χ² ({chiSquare.toFixed(3)}) {isRejected ? '>' : '≤'} Critical Value ({criticalValue.toFixed(3)})
                </p>
                <div className="mt-3 pt-3 border-t border-slate-300">
                  <p className="text-xs font-semibold text-slate-600 mb-1">Conclusion:</p>
                  <p className={`text-sm leading-relaxed ${
                    isRejected ? 'text-red-700' : 'text-emerald-700'
                  }`}>
                    {isRejected 
                      ? (altHypothesis || 'There is a significant difference between observed and expected frequencies.')
                      : (nullHypothesis || 'There is no significant difference between observed and expected frequencies.')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Observed vs Expected Chart */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-4 w-4 text-slate-600" />
              <h4 className="text-sm font-semibold text-slate-700">Observed vs Expected Frequencies</h4>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <ChartContainer config={{}} className="h-64">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="category" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip />
                  <Bar dataKey="observed" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Observed" />
                  <Bar dataKey="expected" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Expected" />
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          {/* Chi-Square Distribution Chart */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-4 w-4 text-slate-600" />
              <h4 className="text-sm font-semibold text-slate-700">Chi-Square Distribution Curve</h4>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <ChartContainer config={{}} className="h-64">
                <AreaChart data={curveData}>
                  <defs>
                    <linearGradient id="colorDist" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCrit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="x" label={{ value: 'χ² Value', position: 'insideBottom', offset: -5 }} className="text-xs" />
                  <YAxis label={{ value: 'Density', angle: -90, position: 'insideLeft' }} className="text-xs" />
                  <ChartTooltip />
                  <Area type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={2} fill="url(#colorDist)" name="Distribution" />
                  <Area type="monotone" dataKey="critical" stroke="none" fill="url(#colorCrit)" name="Critical Region" />
                  <ReferenceLine x={chiSquare} stroke="#8b5cf6" strokeWidth={2} label={{ value: `χ²: ${chiSquare.toFixed(2)}`, position: 'top', className: 'text-xs font-bold fill-purple-600' }} />
                  <ReferenceLine x={criticalValue} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" label={{ value: `Critical: ${criticalValue.toFixed(2)}`, position: 'top', className: 'text-xs font-bold fill-red-600' }} />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        </>
      )}
      </CardContent>
    </Card>
  );
}
