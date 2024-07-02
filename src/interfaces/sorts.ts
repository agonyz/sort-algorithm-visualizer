export interface SortAlgorithm {
  name: string;
  description: string;
  complexity: {
    best: string;
    average: string;
    worst: string;
  };
}
