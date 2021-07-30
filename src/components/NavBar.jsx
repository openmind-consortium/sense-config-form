import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";

function NavBar() {
    return (
        <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>Sense Configuration</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#general">General</Nav.Link>
              <Nav.Link href="#sensing">Sensing</Nav.Link>
              <Nav.Link href="#time-domains">Time Domains</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavBar
