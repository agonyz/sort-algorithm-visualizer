import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

interface ControlPanelProps {
  isSorting: boolean;
  onGenerate: () => void;
  onSort: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isSorting,
  onGenerate,
  onSort,
}) => {
  return (
    <Row className="justify-content-center mt-3">
      <Col className="d-flex justify-content-center">
        <Button className="mt-5 mx-3" onClick={onGenerate} disabled={isSorting}>
          Generate
        </Button>
      </Col>
      <Col className="d-flex justify-content-center">
        <Button className="mt-5" onClick={onSort} disabled={isSorting}>
          Sort
        </Button>
      </Col>
    </Row>
  );
};
