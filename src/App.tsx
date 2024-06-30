import { SelectionsortVisualizer } from './components/SelectionsortVisualizer.tsx';
import { BubblesortVisualizer } from './components/BubblesortVisualizer.tsx';
import { MergeSortVisualizer } from './components/MergesortVisualizer.tsx';
import { useState } from 'react';
import { Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Github } from 'react-bootstrap-icons';

// todo: refactor the components, upcycle shared states
export const App = () => {
  const [sortType, setSortType] = useState<string>('merge');

  const renderVisualizer = () => {
    switch (sortType) {
      case 'bubble':
        return <BubblesortVisualizer />;
      case 'selection':
        return <SelectionsortVisualizer />;
      case 'merge':
        return <MergeSortVisualizer />;
      default:
        return <BubblesortVisualizer />;
    }
  };
  return (
    <>
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
      {renderVisualizer()}
    </>
  );
};
