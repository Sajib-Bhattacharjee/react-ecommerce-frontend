import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faArrowLeft,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth";
import "./ForgotPasswordPage.css";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      setError("");
      setMessage("");
      setIsLoading(true);

      // In a real app, you would call a function from your auth context
      // await auth.sendPasswordResetEmail(email);

      // For demo purposes, we'll simulate success after a delay
      setTimeout(() => {
        setMessage("Password reset instructions have been sent to your email.");
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError("Failed to reset password. Please check your email address.");
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="forgot-password-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <h2 className="forgot-password-title">Forgot Password</h2>
                  <p className="text-muted">
                    Enter your email address and we'll send you instructions to
                    reset your password.
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                {message && (
                  <Alert variant="success" className="mb-4">
                    {message}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email Address</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2 d-flex align-items-center justify-content-center"
                    disabled={isLoading}
                    style={{ height: "48px" }}
                  >
                    {isLoading ? (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                    )}
                    {isLoading ? "Sending..." : "Reset Password"}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <Link to="/login" className="back-link">
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Back to Sign In
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;
