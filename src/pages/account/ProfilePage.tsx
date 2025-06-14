import React, { useState } from "react";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Container,
  Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faEdit,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Mock user data
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would update the user's profile
    // For demo purposes, we'll just show success message
    setTimeout(() => {
      setSuccess(true);
      setIsEditing(false);

      // Clear password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 500);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    // Reset password fields
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  return (
    <div className="profile-page py-5">
      <Container>
        <div className="profile-header mb-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <div className="d-flex align-items-center mb-3 mb-md-0">
              <div className="profile-avatar me-3">
                <span>
                  {formData.firstName.charAt(0)}
                  {formData.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="mb-1">My Profile</h3>
                <p className="text-muted mb-0">
                  Manage your personal information
                </p>
              </div>
            </div>
            <Button
              variant={isEditing ? "outline-danger" : "primary"}
              className="profile-edit-btn"
              onClick={isEditing ? cancelEditing : () => setIsEditing(true)}
            >
              <FontAwesomeIcon
                icon={isEditing ? faTimes : faEdit}
                className="me-2"
              />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>

        {success && (
          <Alert variant="success" className="profile-alert mb-4">
            <div className="d-flex align-items-center">
              <div className="alert-icon me-3">✓</div>
              <div>
                <strong>Success!</strong> Your profile has been updated
                successfully.
              </div>
            </div>
          </Alert>
        )}

        <Card className="profile-card shadow-sm">
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <div className="personal-info mb-4">
                <div className="section-header d-flex align-items-center mb-3">
                  <Badge bg="light" text="dark" className="section-badge me-2">
                    <FontAwesomeIcon icon={faUser} />
                  </Badge>
                  <h5 className="mb-0">Personal Information</h5>
                </div>

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="profile-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="profile-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div className="contact-info mb-4">
                <div className="section-header d-flex align-items-center mb-3">
                  <Badge bg="light" text="dark" className="section-badge me-2">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </Badge>
                  <h5 className="mb-0">Contact Information</h5>
                </div>

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <div className="input-with-icon">
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={true}
                          className="profile-input"
                        />
                        <div className="input-icon">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                      </div>
                      <Form.Text className="text-muted">
                        Email cannot be changed for security reasons.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <div className="input-with-icon">
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="profile-input"
                        />
                        <div className="input-icon">
                          <FontAwesomeIcon icon={faPhone} />
                        </div>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              {isEditing && (
                <div className="password-section">
                  <div className="section-header d-flex align-items-center mb-3">
                    <Badge
                      bg="light"
                      text="dark"
                      className="section-badge me-2"
                    >
                      <FontAwesomeIcon icon={faLock} />
                    </Badge>
                    <h5 className="mb-0">Change Password</h5>
                  </div>

                  <Form.Group className="mb-4">
                    <Form.Label>Current Password</Form.Label>
                    <div className="input-with-icon">
                      <Form.Control
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="profile-input"
                      />
                      <div className="input-icon">
                        <FontAwesomeIcon icon={faLock} />
                      </div>
                    </div>
                  </Form.Group>

                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className="profile-input"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="profile-input"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-grid mt-4">
                    <Button
                      variant="primary"
                      type="submit"
                      className="save-btn"
                    >
                      <FontAwesomeIcon icon={faSave} className="me-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ProfilePage;
