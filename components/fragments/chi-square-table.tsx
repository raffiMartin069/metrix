import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { ChiSquareRow } from "@/hooks/use-chi-square-table";

interface ChiSquareTableProps {
  rows: ChiSquareRow[];
  expected: number[];
  onUpdateRow: (index: number, field: keyof ChiSquareRow, value: string) => void;
  onAddRow: () => void;
  onRemoveRow: (index: number) => void;
}

/**
 * Chi-square goodness-of-fit table with 6 standard columns:
 * Category, O (Observed), E (Expected), O-E, (O-E)², (O-E)²/E
 */
export default function ChiSquareTable({
  rows,
  expected,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
}: ChiSquareTableProps) {
  
  // Calculate derived columns for each row
  const CalculateRow = (observed: number, exp: number) => {
    const diff = observed - exp;
    const diffSquared = Math.pow(diff, 2);
    const chiComponent = exp > 0 ? diffSquared / exp : 0;
    return { diff, diffSquared, chiComponent };
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-300 px-4 py-2 text-left text-sm font-semibold text-slate-700">
              Category
            </th>
            <th className="border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700">
              O
            </th>
            <th className="border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700">
              E
            </th>
            <th className="border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700">
              O − E
            </th>
            <th className="border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700">
              (O − E)²
            </th>
            <th className="border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700">
              (O − E)² / E
            </th>
            <th className="border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const observed = parseFloat(row.observed) || 0;
            const exp = expected[index] || 0;
            const { diff, diffSquared, chiComponent } = CalculateRow(observed, exp);

            return (
              <tr key={index} className="hover:bg-slate-50">
                <td className="border border-slate-300 px-2 py-1">
                  <Input
                    value={row.category}
                    onChange={(e) => onUpdateRow(index, "category", e.target.value)}
                    placeholder={`Category ${index + 1}`}
                    className="border-0 focus-visible:ring-1"
                  />
                </td>
                <td className="border border-slate-300 px-2 py-1">
                  <Input
                    type="number"
                    value={row.observed}
                    onChange={(e) => onUpdateRow(index, "observed", e.target.value)}
                    placeholder="0"
                    className="text-center border-0 focus-visible:ring-1"
                  />
                </td>
                <td className="border border-slate-300 px-4 py-2 text-center text-sm text-slate-600">
                  {exp.toFixed(2)}
                </td>
                <td className="border border-slate-300 px-4 py-2 text-center text-sm text-slate-600">
                  {diff.toFixed(2)}
                </td>
                <td className="border border-slate-300 px-4 py-2 text-center text-sm text-slate-600">
                  {diffSquared.toFixed(2)}
                </td>
                <td className="border border-slate-300 px-4 py-2 text-center text-sm text-slate-600">
                  {chiComponent.toFixed(4)}
                </td>
                <td className="border border-slate-300 px-2 py-1 text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveRow(index)}
                    disabled={rows.length === 1}
                    className="h-8 w-8"
                  >
                    <Trash2 size={14} className="text-red-600" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onAddRow}
          className="rounded-lg border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50"
        >
          <Plus size={16} className="text-blue-600 mr-2" />
          Add Row
        </Button>
      </div>
    </div>
  );
}
