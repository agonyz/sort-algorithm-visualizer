import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Col, Container, Row } from 'react-bootstrap';
import { delay } from '../../utils';
import { VisualizerProps } from '../../interfaces';

export const BubblesortVisualizer: React.FC<VisualizerProps> = ({
  array,
  setArray,
  sortDelay,
  setIsSorting,
  sortRef,
  onSortEnd,
}) => {
  const [currentJ, setCurrentJ] = useState<number | null>(null);

  // refs
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const container = useRef(null);
  const { contextSafe } = useGSAP({ scope: container });

  useEffect(() => {
    sortRef.current = (array: number[]) => bubbleSort(array);
  }, [sortRef]);

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
    onSortEnd();
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
      <Container ref={container} className="mt-5">
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
      </Container>
    </>
  );
};
