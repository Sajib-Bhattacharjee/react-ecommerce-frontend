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
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { Icon } from "../utils/IconHelper";
import "./ContactPage.css";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit the form data to your backend
    // Simulate API call
    setTimeout(() => {
      // Success case for demo
      if (formData.name && formData.email && formData.message) {
        setSubmitted(true);
        setError(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setError(true);
        setSubmitted(false);
      }
    }, 800);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8} className="text-center">
              <h1>Contact Us</h1>
              <p className="lead">
                We'd love to hear from you. Get in touch with our team for any
                questions or feedback.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row>
          <Col lg={4} className="mb-4 mb-lg-0">
            <Card className="contact-info-card h-100">
              <Card.Body>
                <h3 className="mb-4">Get In Touch</h3>

                <div className="contact-info-item">
                  <div className="contact-icon">
                    <Icon icon={FaEnvelope} />
                  </div>
                  <div className="contact-details">
                    <h5>Email</h5>
                    <p>support@yourstore.com</p>
                    <p>sales@yourstore.com</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">
                    <Icon icon={FaPhone} />
                  </div>
                  <div className="contact-details">
                    <h5>Phone</h5>
                    <p>Customer Support: (800) 123-4567</p>
                    <p>Sales Inquiries: (800) 765-4321</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">
                    <Icon icon={FaMapMarkerAlt} />
                  </div>
                  <div className="contact-details">
                    <h5>Address</h5>
                    <p>123 Commerce Street</p>
                    <p>San Francisco, CA 94105</p>
                    <p>United States</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">
                    <Icon icon={FaClock} />
                  </div>
                  <div className="contact-details">
                    <h5>Business Hours</h5>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Card className="contact-form-card">
              <Card.Body>
                <h3 className="mb-4">Send Us a Message</h3>

                {submitted && (
                  <Alert variant="success" className="mb-4">
                    Your message has been sent successfully! We'll get back to
                    you soon.
                  </Alert>
                )}

                {error && (
                  <Alert variant="danger" className="mb-4">
                    Please fill in all required fields.
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Your Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Your Email <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      Message <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" size="lg">
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col xs={12}>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0972377499376!2d-122.40058492346176!3d37.79133971378709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806285ddb1b3%3A0x6cf7a313d6a53ec7!2sFinancial%20District%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1680532705599!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;
