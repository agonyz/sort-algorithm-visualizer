import React, { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { generateRandomArray } from '../../utils';
import { VisualizerProps } from '../../interfaces';

export const MergeSortVisualizer: React.FC<VisualizerProps> = ({
  arraySize,
  array,
  setArray,
  //sortDelay,
  isSorting,
  setIsSorting,
}) => {
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const container = useRef(null);
  const { contextSafe } = useGSAP({ scope: container });
  const tl = gsap.timeline(); // todo: find better way than using global gsap timeline element

  useEffect(() => {
    resetComponent();
  }, [arraySize]);

  const resetComponent = () => {
    const array = generateRandomArray(arraySize);
    setArray(array);
  };

  const mergeSort = async (array: number[], left = 0): Promise<number[]> => {
    if (array.length <= 1) {
      return array;
    }

    const m = Math.floor(array.length / 2);
    const l: number[] = array.slice(0, m);
    const r: number[] = array.slice(m);

    const sortedLeft = await mergeSort(l, left);
    const sortedRight = await mergeSort(r, left + m);

    return await merge(sortedLeft, sortedRight, left);
  };

  const merge = async (
    l: number[],
    r: number[],
    left: number,
  ): Promise<number[]> => {
    const result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < l.length && rightIndex < r.length) {
      if (l[leftIndex] < r[rightIndex]) {
        result.push(l[leftIndex]);
        leftIndex++;
      } else {
        result.push(r[rightIndex]);
        rightIndex++;
      }
    }

    // concatenate remaining elements from left or right array
    const merged = result
      .concat(l.slice(leftIndex))
      .concat(r.slice(rightIndex));

    // visualize the merge process
    await visualizeSort(merged, left);

    return merged;
  };

  const visualizeSort = contextSafe(
    async (currentArray: number[], startIdx: number) => {
      // move all boxes up before merging
      currentArray.forEach((_, index) => {
        const box = boxRefs.current[startIdx + index];
        if (box) {
          tl.to(box, {
            y: -50,
            duration: 0.2,
            backgroundColor: '#f39c12',
          });
        }
      });

      await tl.play();

      // calculate the new positions and animate the final merge
      const counts: Record<number, number> = {}; // keep count of occurrences of each value
      currentArray.forEach((_, index) => {
        const box = boxRefs.current[startIdx + index];
        if (box) {
          const boxValue = parseInt(box.innerText);
          if (!(boxValue in counts)) {
            counts[boxValue] = 0;
          }
          const offset = counts[boxValue]; // offset for the same values
          counts[boxValue]++; // increment count for next occurrence

          const newIndex = currentArray.indexOf(boxValue) + offset;
          tl.to(box, {
            x: (newIndex - index) * box.getBoundingClientRect().width, // move horizontally to new position
            duration: 0.5,
          });
        }
      });

      await tl.play();

      // move all boxes back down to their original vertical positions
      currentArray.forEach((_, index) => {
        const box = boxRefs.current[startIdx + index];
        if (box) {
          tl.to(box, {
            y: 0,
            duration: 0.2,
            backgroundColor: '#3498db',
          });
        }
      });

      await tl.play();
    },
  );

  const startSort = async () => {
    setIsSorting(true);
    const sortedArray = await mergeSort([...array]);
    setArray(sortedArray);
    tl.revert();
    setIsSorting(false);
  };

  return (
    <>
      <h1 className="mt-5 text-center">Merge Sort</h1>
      <Container ref={container} className="mt-5">
        <Row className="mt-5">
          {array.map((v, i) => (
            <Col
              ref={(el: HTMLDivElement) => (boxRefs.current[i] = el)}
              className="border d-flex justify-content-center align-items-center"
              style={{
                height: 50,
                width: 50,
              }}
              key={i}
            >
              {v}
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center mt-3">
          <Col className="d-flex justify-content-center">
            <Button
              className="mt-5 mx-3"
              onClick={() => resetComponent()}
              disabled={isSorting}
            >
              Generate
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              className="mt-5"
              onClick={() => startSort()}
              disabled={isSorting}
            >
              Sort
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
