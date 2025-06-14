import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./AccountPage.css";

const AccountPage: React.FC = () => {
  const { user: currentUser } = useContext(AuthContext);

  return (
    <Container className="my-5 account-page">
      <Row>
        <Col md={3}>
          <Card className="account-sidebar mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">My Account</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Nav className="flex-column">
                <NavLink to="/account/profile" className="nav-link">
                  Profile
                </NavLink>
                <NavLink to="/account/orders" className="nav-link">
                  Orders
                </NavLink>
                <NavLink to="/account/addresses" className="nav-link">
                  Addresses
                </NavLink>
                <NavLink to="/account/wishlist" className="nav-link">
                  Wishlist
                </NavLink>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AccountPage;
