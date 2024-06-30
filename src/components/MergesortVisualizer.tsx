import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { delay, generateRandomArray } from '../utils';

export const MergeSortVisualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [arraySize, setArraySize] = useState<number>(10);
  const [sortDelay, setSortDelay] = useState<number>(500);

  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const container = useRef(null);
  const { contextSafe } = useGSAP({ scope: container });

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
    const startIdx = left;

    while (leftIndex < l.length && rightIndex < r.length) {
      if (l[leftIndex] < r[rightIndex]) {
        result.push(l[leftIndex]);
        leftIndex++;
      } else {
        result.push(r[rightIndex]);
        rightIndex++;
      }
    }

    const merged = result
      .concat(l.slice(leftIndex))
      .concat(r.slice(rightIndex));

    await visualizeSort(merged, startIdx);

    return merged;
  };

  const visualizeSort = contextSafe(
    async (currentArray: number[], startIdx: number) => {
      const tl = gsap.timeline();

      currentArray.forEach((value, index) => {
        const box = boxRefs.current[startIdx + index];

        if (box) {
          tl.to(box, {
            y: -50,
            duration: 0.2,
            backgroundColor: '#f39c12',
            onComplete: () => {
              box.innerText = value.toString();
              box.style.backgroundColor = '#3498db';
            },
          });
        }
      });

      await tl.play();
      await delay(sortDelay);
      tl.revert();

      currentArray.forEach((value, index) => {
        const box = boxRefs.current[startIdx + index];
        if (box) {
          box.innerText = value.toString();
        }
      });
    },
  );

  const startSort = async () => {
    setIsSorting(true);
    const sortedArray = await mergeSort([...array]);
    setArray(sortedArray);
    setIsSorting(false);
  };

  return (
    <>
      <h1 className="mt-5 text-center">Merge Sort</h1>
      <Container ref={container} className="mt-5">
        <Row>
          <Col>
            <Form.Group controlId="formArraySize">
              <Form.Label>Array Size: {arraySize}</Form.Label>
              <Form.Range
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
                min={5}
                max={15}
                disabled={isSorting}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formSortDelay">
              <Form.Label>Sort Delay (ms): {sortDelay}</Form.Label>
              <Form.Range
                value={sortDelay}
                onChange={(e) => setSortDelay(parseInt(e.target.value))}
                min={1}
                max={5000}
                disabled={isSorting}
              />
            </Form.Group>
          </Col>
        </Row>

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
