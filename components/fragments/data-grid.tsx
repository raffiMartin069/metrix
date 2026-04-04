import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface DataGridProps {
  grid: string[][];
  onUpdateCell: (r: number, c: number, value: string) => void;
  onAddRow: () => void;
  onAddCol: () => void;
}

export default function DataGrid({ grid, onUpdateCell, onAddCol }: DataGridProps) {
  return (
    <div className="border-t border-slate-200 pt-8">
      <div className="flex items-start gap-6">
        <div className="overflow-auto">
          <table className="border-collapse">
            <tbody>
              {grid.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="p-1.5">
                      <Input
                        className="text-center text-base font-medium rounded-lg border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        value={cell}
                        onChange={(e) => onUpdateCell(ri, ci, e.target.value)}
                        placeholder="0"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onAddCol}
            className="rounded-lg border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <Plus size={16} className="text-blue-600" />
          </Button>
          <span className="text-xs text-slate-500 text-center">Add<br />Column</span>
        </div>
      </div>
    </div>
  );
}
