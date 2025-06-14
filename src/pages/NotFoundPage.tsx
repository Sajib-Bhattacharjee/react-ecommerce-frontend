import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./NotFoundPage.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8} lg={6}>
            <div className="not-found-content">
              <h1>404</h1>
              <h2>Page Not Found</h2>
              <p>
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
              </p>
              <Link to="/" className="btn btn-primary btn-lg">
                <FontAwesomeIcon icon={faHome} className="me-2" />
                Back to Home
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFoundPage;
