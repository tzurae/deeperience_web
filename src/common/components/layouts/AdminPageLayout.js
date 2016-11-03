import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import ErrorList from '../utils/ErrorList';

const AdminPageLayout = ({ children, ...rest }) => (
  <div>
    <Navbar fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/admin">Express-React-HMR-Boilerplate Admin System</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
      </Navbar.Collapse>
    </Navbar>
    <Grid fluid>
      <Row>
        <Col md={2}>
          <Nav bsStyle="pills" stacked activeKey={1}>
            <NavItem eventKey={1} href="/admin/user">User</NavItem>
            <NavItem eventKey={2} href="/">Go back to site</NavItem>
          </Nav>
        </Col>
        <Col md={10} {...rest}>
          <ErrorList />
          {children}
        </Col>
      </Row>
    </Grid>
  </div>
);

export default AdminPageLayout;
