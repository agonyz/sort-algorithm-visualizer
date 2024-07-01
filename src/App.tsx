import { SelectionsortVisualizer } from './components/visualizers/SelectionsortVisualizer.tsx';
import { BubblesortVisualizer } from './components/visualizers/BubblesortVisualizer.tsx';
import { MergeSortVisualizer } from './components/visualizers/MergesortVisualizer.tsx';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { generateRandomArray } from './utils';
import { SettingsPanel } from './components/settings/SettingsPanel.tsx';
import { Navigation } from './components/navigation/Navigation.tsx';

// todo: refactor the components, upcycle shared states
export const App = () => {
  const [sortType, setSortType] = useState<string>('bubble');
  const [arraySize, setArraySize] = useState<number>(10);
  const [sortDelay, setSortDelay] = useState<number>(500);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [array, setArray] = useState<number[]>(generateRandomArray(arraySize));

  const renderVisualizer = () => {
    switch (sortType) {
      case 'bubble':
        return (
          <BubblesortVisualizer
            arraySize={arraySize}
            array={array}
            setArray={setArray}
            sortDelay={sortDelay}
            isSorting={isSorting}
            setIsSorting={setIsSorting}
          />
        );
      case 'selection':
        return (
          <SelectionsortVisualizer
            arraySize={arraySize}
            array={array}
            setArray={setArray}
            sortDelay={sortDelay}
            isSorting={isSorting}
            setIsSorting={setIsSorting}
          />
        );
      case 'merge':
        return (
          <MergeSortVisualizer
            arraySize={arraySize}
            array={array}
            setArray={setArray}
            sortDelay={sortDelay}
            isSorting={isSorting}
            setIsSorting={setIsSorting}
          />
        );
      default:
        return (
          <BubblesortVisualizer
            arraySize={arraySize}
            array={array}
            setArray={setArray}
            sortDelay={sortDelay}
            isSorting={isSorting}
            setIsSorting={setIsSorting}
          />
        );
    }
  };

  return (
    <>
      <Navigation sortType={sortType} setSortType={setSortType} />
      <Container>
        <Row className="mt-4">
          <SettingsPanel
            arraySize={arraySize}
            setArraySize={setArraySize}
            sortDelay={sortDelay}
            setSortDelay={setSortDelay}
            isSorting={isSorting}
          />
        </Row>
        {renderVisualizer()}
      </Container>
    </>
  );
};
