import { SelectionsortVisualizer } from './components/visualizers/SelectionsortVisualizer.tsx';
import { BubblesortVisualizer } from './components/visualizers/BubblesortVisualizer.tsx';
import { MergeSortVisualizer } from './components/visualizers/MergesortVisualizer.tsx';
import { useEffect, useRef, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { generateRandomArray } from './utils';
import { SettingsPanel } from './components/panels/SettingsPanel.tsx';
import { Navigation } from './components/navigation/Navigation.tsx';
import { ControlPanel } from './components/panels/ControlPanel.tsx';
import { InfoCard } from './components/cards/InfoCard.tsx';
import { SortSuccessToast } from './components/toasts/SortSuccessToast.tsx';

// todo: refactor the components, upcycle shared states
export const App = () => {
  const [sortType, setSortType] = useState<string>('bubble');
  const [arraySize, setArraySize] = useState<number>(10);
  const [sortDelay, setSortDelay] = useState<number>(500);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [array, setArray] = useState<number[]>(generateRandomArray(arraySize));
  const [showToast, setShowToast] = useState<boolean>(false);

  // sort method refs
  const bubbleSortRef = useRef<(array: number[]) => void>(() => {}); // initialize with an empty function (ts error)
  const selectionSortRef = useRef<(array: number[]) => void>(() => {});
  const mergeSortRef = useRef<(array: number[]) => void>(() => {});

  const resetComponent = () => {
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
  };

  useEffect(() => {
    const array = generateRandomArray(arraySize);
    setArray(array);
  }, [arraySize]);

  const handleSortEnd = () => {
    setShowToast(true);
  };

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
            sortRef={bubbleSortRef}
            onSortEnd={handleSortEnd}
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
            sortRef={selectionSortRef}
            onSortEnd={handleSortEnd}
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
            sortRef={mergeSortRef}
            onSortEnd={handleSortEnd}
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
            sortRef={bubbleSortRef}
            onSortEnd={handleSortEnd}
          />
        );
    }
  };

  return (
    <>
      <Navigation
        sortType={sortType}
        setSortType={setSortType}
        isSorting={isSorting}
      />
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
        <InfoCard sortType={sortType} />
        {renderVisualizer()}
        <ControlPanel
          isSorting={isSorting}
          onGenerate={resetComponent}
          onSort={() => {
            switch (sortType) {
              case 'bubble':
                bubbleSortRef.current && bubbleSortRef.current(array);
                break;
              case 'selection':
                selectionSortRef.current && selectionSortRef.current(array);
                break;
              case 'merge':
                mergeSortRef.current && mergeSortRef.current(array);
                break;
              default:
                bubbleSortRef.current && bubbleSortRef.current(array);
                break;
            }
          }}
        />
        <SortSuccessToast show={showToast} setShow={setShowToast} />
      </Container>
    </>
  );
};
