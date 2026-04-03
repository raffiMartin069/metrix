import { useState } from "react";

const createGrid = (rows: number, cols: number) =>
  Array.from({ length: rows }, () => Array(cols).fill(""));

export const useGrid = (initialRows = 2, initialCols = 2) => {
  const [grid, setGrid] = useState<string[][]>(createGrid(initialRows, initialCols));

  const updateCell = (r: number, c: number, value: string) => {
    setGrid((prev) =>
      prev.map((row, ri) =>
        row.map((cell, ci) => (ri === r && ci === c ? value : cell))
      )
    );
  };

  const addRow = () => setGrid((prev) => [...prev, Array(prev[0].length).fill("")]);
  const addCol = () => setGrid((prev) => prev.map((row) => [...row, ""]));
  const clear = () => setGrid(createGrid(initialRows, initialCols));

  return { grid, updateCell, addRow, addCol, clear };
};
