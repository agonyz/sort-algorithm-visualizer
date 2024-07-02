import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import React from 'react';
import { sorts } from '../../utils';

interface InfoCardProps {
  sortType: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ sortType }) => {
  const sort = sorts[sortType];

  return (
    <Card className="mt-5">
      <Card.Header>Info</Card.Header>
      <Card.Body>
        <Card.Text>
          <Row>
            <Col md={9}>
              <h5>{sort.name}</h5>
              <div className="mt-3">{sort.description}</div>
            </Col>
            <Col md={3}>
              <h5>Time Complexity</h5>
              <Row className="mt-3">
                <Col>Worst Case:</Col>
                <Col>{sort.complexity.worst}</Col>
              </Row>
              <Row>
                <Col>Average Case:</Col>
                <Col>{sort.complexity.average}</Col>
              </Row>
              <Row>
                <Col>Best Case:</Col>
                <Col>{sort.complexity.best}</Col>
              </Row>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
