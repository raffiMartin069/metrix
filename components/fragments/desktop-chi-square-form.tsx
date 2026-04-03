import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Send, Info, Table2 } from "lucide-react";
import HypothesisInput from "./hypothesis-input";
import ChiSquareTable from "./chi-square-table";
import { ChiSquareRow } from "@/hooks/use-chi-square-table";

interface DesktopChiSquareFormProps {
  rows: ChiSquareRow[];
  expected: number[];
  nullHypothesis: string;
  altHypothesis: string;
  onNullChange: (value: string) => void;
  onAltChange: (value: string) => void;
  onUpdateRow: (index: number, field: keyof ChiSquareRow, value: string) => void;
  onAddRow: () => void;
  onRemoveRow: (index: number) => void;
  onClear: () => void;
}

/**
 * Desktop layout form for Chi-square goodness-of-fit test
 * Uses the standard 6-column table format
 */
export default function DesktopChiSquareForm({
  rows,
  expected,
  nullHypothesis,
  altHypothesis,
  onNullChange,
  onAltChange,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onClear
}: DesktopChiSquareFormProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="space-y-8">
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

        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Table2 className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Chi-Square Data Table</h3>
          </div>
          <p className="text-sm text-slate-500 mb-4">Enter categories and observed frequencies</p>
          
          <ChiSquareTable
            rows={rows}
            expected={expected}
            onUpdateRow={onUpdateRow}
            onAddRow={onAddRow}
            onRemoveRow={onRemoveRow}
          />
        </div>

        <div className="flex gap-3 items-center justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClear}
            className="rounded-lg border-2 hover:bg-red-50 hover:border-red-300"
          >
            <Trash2 size={16} className="text-red-600 mr-2" />
            Clear
          </Button>
          <Button type="submit">
            <Send size={16} className="mr-2" />
            Calculate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
