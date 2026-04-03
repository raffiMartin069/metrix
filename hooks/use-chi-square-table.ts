import { useState } from "react";

// Represents a single row in the Chi-square table
export interface ChiSquareRow {
  category: string;
  observed: string;
}

/**
 * Hook for managing Chi-square goodness-of-fit table data
 * Handles category names and observed frequencies
 */
export const useChiSquareTable = (initialRows = 2) => {
  const [rows, setRows] = useState<ChiSquareRow[]>(
    Array.from({ length: initialRows }, () => ({ category: "", observed: "" }))
  );

  const UpdateRow = (index: number, field: keyof ChiSquareRow, value: string) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const AddRow = () => {
    setRows((prev) => [...prev, { category: "", observed: "" }]);
  };

  const RemoveRow = (index: number) => {
    if (rows.length > 1) {
      setRows((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const Clear = () => {
    setRows(Array.from({ length: initialRows }, () => ({ category: "", observed: "" })));
  };

  return { rows, UpdateRow, AddRow, RemoveRow, Clear };
};
