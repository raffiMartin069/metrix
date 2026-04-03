import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";

interface ChiSquareChartProps {
  curveData: Array<{ x: number; y: number; critical: number }>;
  chiSquare: number;
  criticalValue: number;
}

export default function ChiSquareChart({ curveData, chiSquare, criticalValue }: ChiSquareChartProps) {
  return (
    <ChartContainer
      config={{
        y: {
          label: "Probability Density",
          color: "hsl(217, 91%, 60%)",
        },
        critical: {
          label: "Critical Region",
          color: "hsl(0, 84%, 60%)",
        },
      }}
      className="h-62.5 md:h-87.5 w-full"
    >
      <AreaChart data={curveData}>
        <defs>
          <linearGradient id="colorCurve" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.6} />
            <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis
          dataKey="x"
          label={{ value: 'χ² Value', position: 'insideBottom', offset: -5, className: 'text-xs' }}
          tickFormatter={(value) => value.toFixed(1)}
          className="text-xs"
        />
        <YAxis
          label={{ value: 'Density', angle: -90, position: 'insideLeft', className: 'text-xs' }}
          tickFormatter={(value) => value.toFixed(2)}
          className="text-xs"
        />
        <ChartTooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white p-2 border border-slate-200 rounded-lg shadow-lg text-xs">
                  <p className="font-semibold">χ² = {payload[0].payload.x.toFixed(3)}</p>
                  <p className="text-slate-600">Density: {payload[0].payload.y.toFixed(4)}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey="y"
          stroke="hsl(217, 91%, 60%)"
          strokeWidth={2}
          fill="url(#colorCurve)"
        />
        <Area
          type="monotone"
          dataKey="critical"
          stroke="none"
          fill="url(#colorCritical)"
        />
        <ReferenceLine
          x={criticalValue}
          stroke="hsl(0, 84%, 60%)"
          strokeWidth={2}
          strokeDasharray="5 5"
          label={{
            value: `Critical: ${criticalValue.toFixed(3)}`,
            position: 'top',
            className: 'text-xs font-semibold fill-red-600'
          }}
        />
        <ReferenceLine
          x={chiSquare}
          stroke="hsl(280, 65%, 50%)"
          strokeWidth={2}
          label={{
            value: `χ²: ${chiSquare.toFixed(3)}`,
            position: 'top',
            className: 'text-xs font-semibold fill-purple-600'
          }}
        />
      </AreaChart>
    </ChartContainer>
  );
}
