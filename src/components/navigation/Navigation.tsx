import { Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Github } from 'react-bootstrap-icons';
import { NavigationProps } from '../../interfaces';
import React from 'react';

export const Navigation: React.FC<NavigationProps> = ({
  sortType,
  setSortType,
  isSorting,
}) => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Sort Algorithm Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link target="_blank" href="https://github.com/agonyz">
              <Github size={35} />
            </Nav.Link>
          </Nav>
          <Nav>
            <Form.Group controlId="formSortType" className="d-flex">
              <Form.Control
                as="select"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                disabled={isSorting}
              >
                <option value="bubble">Bubblesort</option>
                <option value="selection">Selectionsort</option>
                <option value="merge">Mergesort</option>
              </Form.Control>
            </Form.Group>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
