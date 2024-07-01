export interface VisualizerProps {
  arraySize: number;
  array: number[];
  setArray: (array: number[]) => void;
  sortDelay: number;
  isSorting: boolean;
  setIsSorting: (sorting: boolean) => void;
}
