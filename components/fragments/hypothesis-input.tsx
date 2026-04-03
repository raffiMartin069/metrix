import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface HypothesisInputProps {
  nullHypothesis: string;
  altHypothesis: string;
  onNullChange: (value: string) => void;
  onAltChange: (value: string) => void;
  idPrefix?: string;
}

export default function HypothesisInput({
  nullHypothesis,
  altHypothesis,
  onNullChange,
  onAltChange,
  idPrefix = ""
}: HypothesisInputProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}null-hypothesis`} className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <span className="text-blue-600">H₀</span>
          Null Hypothesis
        </Label>
        <Textarea
          id={`${idPrefix}null-hypothesis`}
          value={nullHypothesis}
          onChange={(e) => onNullChange(e.target.value)}
          placeholder="e.g., The observed frequencies follow the expected distribution"
          className="resize-none text-sm border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          rows={2}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}alt-hypothesis`} className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <span className="text-purple-600">H₁</span>
          Alternative Hypothesis
        </Label>
        <Textarea
          id={`${idPrefix}alt-hypothesis`}
          value={altHypothesis}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="e.g., The observed frequencies do not follow the expected distribution"
          className="resize-none text-sm border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
          rows={2}
        />
      </div>
    </div>
  );
}
