export interface SettingsPanelProps {
  arraySize: number;
  setArraySize: (size: number) => void;
  sortDelay: number;
  setSortDelay: (delay: number) => void;
  isSorting: boolean;
}
