import './App.scss';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { delay, generateRandomArray } from './utils';

export const App = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [currentJ, setCurrentJ] = useState<number | null>(null);
  const [arraySize, setArraySize] = useState<number>(10);
  const [sortDelay, setSortDelay] = useState<number>(500);

  // refs
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const container = useRef(null);
  const { contextSafe } = useGSAP({ scope: container });

  useEffect(() => {
    const array = generateRandomArray(arraySize);
    setArray(array);
  }, [arraySize]);

  const resetComponent = () => {
    const array = generateRandomArray(arraySize);
    setArray(array);
    setCurrentJ(null);
  };

  const bubbleSort = async (array: number[]) => {
    setIsSorting(true);
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        setCurrentJ(j);
        await delay(sortDelay);

        if (arr[j] > arr[j + 1]) {
          const box1 = boxRefs.current[j];
          const box2 = boxRefs.current[j + 1];

          const timeline = visualizeSort(box1, box2);
          await timeline!.play();

          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          timeline!.revert();
          //gsap.context().revert(); // todo: find way to revert the contextSafe
        }
      }
    }
    setIsSorting(false);
    setCurrentJ(null);
  };

  const visualizeSort = contextSafe(
    (box1: HTMLDivElement | null, box2: HTMLDivElement | null) => {
      if (!box1 || !box2) {
        return null;
      }

      const tl = gsap.timeline();
      const box1Rect = box1.getBoundingClientRect();
      const box2Rect = box2.getBoundingClientRect();

      const xDistance1 = box2Rect.left - box1Rect.left;
      const xDistance2 = box1Rect.left - box2Rect.left;

      return tl
        .to(box1, { y: -50, duration: 0.2 })
        .to(box2, { y: 50, duration: 0.2 }, '<')
        .to(box1, { x: xDistance1, duration: 0.5 })
        .to(box2, { x: xDistance2, duration: 0.5 }, '<')
        .to(box1, { y: 0, duration: 0.2 })
        .to(box2, { y: 0, duration: 0.2 }, '<');
    },
  );

  return (
    <>
      <h1>Bubblesort</h1>
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
                max={1000}
                disabled={isSorting}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-5" style={{ marginBottom: 60 }}>
          <Col className="d-flex justify-content-center align-items-center">
            <div
              style={{
                height: 20,
                width: 20,
                backgroundColor: 'lightgreen',
                marginRight: 5,
              }}
            ></div>
            <span>j</span>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <div
              style={{
                height: 20,
                width: 20,
                backgroundColor: 'violet',
                marginRight: 5,
              }}
            ></div>
            <span>j + 1</span>
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
                backgroundColor:
                  i === currentJ
                    ? 'lightgreen'
                    : currentJ !== null && i === currentJ + 1
                      ? 'violet'
                      : '',
              }}
              key={i}
            >
              {v}
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center mt-3">
          <Col>
            <Button
              className="mt-5 mx-3"
              onClick={() => resetComponent()}
              disabled={isSorting}
            >
              Generate
            </Button>
            <Button
              className="mt-5"
              onClick={() => bubbleSort(array)}
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
