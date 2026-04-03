import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Table2, Info, Send, RefreshCcwDotIcon } from "lucide-react";
import HypothesisInput from "./hypothesis-input";

interface DesktopInputFormProps {
  grid: string[][];
  nullHypothesis: string;
  altHypothesis: string;
  onNullChange: (value: string) => void;
  onAltChange: (value: string) => void;
  onUpdateCell: (r: number, c: number, value: string) => void;
  onAddRow: () => void;
  onAddCol: () => void;
  onClear: () => void;
}

export default function DesktopInputForm({
  grid,
  nullHypothesis,
  altHypothesis,
  onNullChange,
  onAltChange,
  onUpdateCell,
  onAddRow,
  onAddCol,
  onClear
}: DesktopInputFormProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="space-y-8">
        {/* Hypothesis Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Hypothesis Definition</h3>
          </div>
          <HypothesisInput
            nullHypothesis={nullHypothesis}
            altHypothesis={altHypothesis}
            onNullChange={onNullChange}
            onAltChange={onAltChange}
            idPrefix="desktop-"
          />
        </div>

        {/* Data Grid Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Table2 className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Observed Frequencies</h3>
          </div>
          <p className="text-sm text-slate-500 mb-4">Enter your observed frequency values in the cells below</p>

          <div className="flex items-start gap-4">
            <div className="overflow-auto bg-slate-50 rounded-xl p-4 w-full">
              <table className="border-collapse">
                <tbody>
                  {grid.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="p-1.5">
                          <Input
                            className="w-20 h-12 text-center text-base font-semibold rounded-lg border-2 border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
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

            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={onAddRow}
                title="Add Row"
                className="h-10 w-10 rounded-lg border-2 border-dashed border-blue-300 hover:bg-blue-50 hover:border-blue-500 transition-all"
              >
                <Plus className="h-4 w-4 text-blue-600" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={onAddCol}
                title="Add Column"
                className="h-10 w-10 rounded-lg border-2 border-dashed border-purple-300 hover:bg-purple-50 hover:border-purple-500 transition-all"
              >
                <Plus className="h-4 w-4 text-purple-600" />
              </Button>
              <div className="h-px bg-slate-200 my-1" />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={onClear}
                title="Clear All"
                className="h-10 w-10 rounded-lg border-2 border-red-200 hover:bg-red-50 hover:border-red-400 transition-all"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 items-end justify-end p-3">
          <Button type="submit" variant="secondary">
            <RefreshCcwDotIcon />
          </Button>
          <Button type="submit">
            <Send />
            Calculate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
