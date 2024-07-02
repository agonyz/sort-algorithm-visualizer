import { MutableRefObject } from 'react';

export interface VisualizerProps {
  arraySize: number;
  array: number[];
  setArray: (array: number[]) => void;
  sortDelay: number;
  isSorting: boolean;
  setIsSorting: (sorting: boolean) => void;
  sortRef: MutableRefObject<(array: number[]) => void>;
  onSortEnd: () => void;
}
