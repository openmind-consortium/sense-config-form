import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

function NavBar({ onUpload, fileName, onValidate, downLoadDisabled, downloadHref }) {

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
        <Nav className="ml-auto" style={{ marginLeft: "50px" }}>
          <Button
            variant="secondary"
            style={{ marginRight: "20px" }}
            onClick={onUpload}
          >
            Upload
          </Button>
        </Nav>
        {downLoadDisabled ? (
          <Button style={{ marginRight: "20px" }} onClick={onValidate}>
            Validate
          </Button>
        ) : (
          <Button
            style={{ marginRight: "20px" }}
            href={downloadHref}
            download={fileName}
          >
            Download
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
