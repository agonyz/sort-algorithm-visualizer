import { SortAlgorithm } from '../interfaces';

export const sorts: Record<string, SortAlgorithm> = {
  bubble: {
    name: 'Bubble Sort',
    description:
      'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
  },
  selection: {
    name: 'Selection Sort',
    description:
      'Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted.',
    complexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
  },
  merge: {
    name: 'Merge Sort',
    description:
      'Merge Sort is a divide and conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
  },
};
