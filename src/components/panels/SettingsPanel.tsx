import { FC } from 'react';
import { Form, Col } from 'react-bootstrap';
import { SettingsPanelProps } from '../../interfaces';

export const SettingsPanel: FC<SettingsPanelProps> = ({
  arraySize,
  setArraySize,
  sortDelay,
  setSortDelay,
  isSorting,
}) => {
  return (
    <>
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
    </>
  );
};
