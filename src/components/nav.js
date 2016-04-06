import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default () => {
  return (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Keypair Management</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">Generate</NavItem>
          <NavItem eventKey={2} href="#">Verify</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
