import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faPinterest,
  faTiktok,
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcPaypal,
  faApplePay,
  faGooglePay,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faCreditCard,
  faShieldAlt,
  faTruck,
  faUndo,
  faArrowRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../hooks/useTheme";

import "./Footer.css";

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const { darkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      // In a real app, you would send this to an API
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className={`site-footer ${darkMode ? "dark-theme" : ""}`}>
      {/* Newsletter section */}
      <div className="footer-newsletter">
        <Container>
          <div className="newsletter-card">
            <Row className="align-items-center">
              <Col lg={6} md={6} sm={12} className="mb-3 mb-md-0">
                <div className="newsletter-content">
                  <h3>Stay Updated</h3>
                  <p>
                    Subscribe to our newsletter for exclusive offers, new
                    arrivals, and more.
                  </p>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Form onSubmit={handleSubscribe} className="newsletter-form">
                  <InputGroup className="flex-nowrap">
                    <Form.Control
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="newsletter-input"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      className="newsletter-btn"
                    >
                      Subscribe{" "}
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ms-2 d-none d-sm-inline"
                      />
                    </Button>
                  </InputGroup>
                  {subscribed && (
                    <div className="subscription-success">
                      <p>Thank you for subscribing!</p>
                    </div>
                  )}
                </Form>
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      {/* Services section */}
      <div className={`footer-services ${darkMode ? "dark-theme" : ""}`}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={3} md={6} sm={6} className="mb-4 mb-lg-0">
              <div className="service-item">
                <div className="service-icon">
                  <FontAwesomeIcon icon={faTruck} />
                </div>
                <div className="service-content">
                  <h5>Free Shipping</h5>
                  <p>On orders over $50</p>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6} className="mb-4 mb-lg-0">
              <div className="service-item">
                <div className="service-icon">
                  <FontAwesomeIcon icon={faUndo} />
                </div>
                <div className="service-content">
                  <h5>Easy Returns</h5>
                  <p>30 days return policy</p>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6} className="mb-4 mb-md-0">
              <div className="service-item">
                <div className="service-icon">
                  <FontAwesomeIcon icon={faShieldAlt} />
                </div>
                <div className="service-content">
                  <h5>Secure Payments</h5>
                  <p>100% secure checkout</p>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6}>
              <div className="service-item">
                <div className="service-icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="service-content">
                  <h5>24/7 Support</h5>
                  <p>Customer service</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main footer content */}
      <div className={`footer-main ${darkMode ? "dark-theme" : ""}`}>
        <Container>
          <Row>
            <Col lg={4} md={6} className="footer-column mb-5 mb-lg-0">
              <div className="footer-widget about-widget">
                <Link to="/" className="footer-logo">
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/public/images/logo.png"
                      alt="SBC Express Logo"
                      style={{
                        height: "40px",
                        width: "40px",
                        objectFit: "contain",
                        marginRight: "6px",
                      }}
                    />
                    <span className="footer-logo-text">SBC Express</span>
                  </div>
                </Link>
                <p className="about-text">
                  SBC Express is your one-stop destination for quality products
                  with exceptional service. We offer a curated selection of
                  electronics, clothing, and home goods to enhance your
                  lifestyle.
                </p>
                <div className="footer-social">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pinterest"
                  >
                    <FontAwesomeIcon icon={faPinterest} />
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                  >
                    <FontAwesomeIcon icon={faTiktok} />
                  </a>
                </div>
              </div>
            </Col>

            <Col lg={2} md={6} sm={6} className="footer-column mb-4 mb-lg-0">
              <div className="footer-widget links-widget">
                <h4 className="widget-title">Shop</h4>
                <ul className="footer-links">
                  <li>
                    <Link to="/electronics">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="link-icon"
                      />
                      Electronics
                    </Link>
                  </li>
                  <li>
                    <Link to="/clothing">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="link-icon"
                      />
                      Clothing
                    </Link>
                  </li>
                  <li>
                    <Link to="/home-kitchen">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="link-icon"
                      />
                      Home & Kitchen
                    </Link>
                  </li>
                  <li>
                    <Link to="/new-arrivals">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="link-icon"
                      />
                      New Arrivals
                    </Link>
                  </li>
                  <li>
                    <Link to="/best-sellers">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="link-icon"
                      />
                      Best Sellers
                    </Link>
                  </li>
                  <li>
                    <Link to="/deals">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="link-icon"
                      />
                      Deals & Offers
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={2} md={6} sm={6} className="footer-column mb-4 mb-lg-0">
              <div className="footer-widget links-widget">
                <h4 className="widget-title">Customer Service</h4>
                <ul className="footer-links">
                  <li>
                    <Link to="/faq">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="link-icon"
                      />
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="/shipping">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="link-icon"
                      />
                      Shipping Info
                    </Link>
                  </li>
                  <li>
                    <Link to="/returns">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="link-icon"
                      />
                      Returns & Refunds
                    </Link>
                  </li>
                  <li>
                    <Link to="/track-order">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="link-icon"
                      />
                      Track Order
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="link-icon"
                      />
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={4} md={6} className="footer-column">
              <div className="footer-widget contact-widget">
                <h4 className="widget-title">Contact</h4>
                <ul className="footer-contact">
                  <li>
                    <div className="contact-icon">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </div>
                    <div className="contact-text">
                      <p>Khulna, Bangladesh</p>
                    </div>
                  </li>
                  <li>
                    <div className="contact-icon">
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <div className="contact-text">
                      <p>01777777777</p>
                    </div>
                  </li>
                  <li>
                    <div className="contact-icon">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div className="contact-text">
                      <p>sbcexpress2025@gmail.com</p>
                    </div>
                  </li>
                </ul>

                <div className="payment-methods">
                  <h5>We Accept</h5>
                  <div className="payment-icons">
                    <div className="payment-icon">
                      <FontAwesomeIcon icon={faCcVisa} title="Visa" />
                    </div>
                    <div className="payment-icon">
                      <FontAwesomeIcon
                        icon={faCcMastercard}
                        title="Mastercard"
                      />
                    </div>
                    <div className="payment-icon">
                      <FontAwesomeIcon
                        icon={faCcAmex}
                        title="American Express"
                      />
                    </div>
                    <div className="payment-icon">
                      <FontAwesomeIcon icon={faCcPaypal} title="PayPal" />
                    </div>
                    <div className="payment-icon">
                      <FontAwesomeIcon icon={faApplePay} title="Apple Pay" />
                    </div>
                    <div className="payment-icon">
                      <FontAwesomeIcon icon={faGooglePay} title="Google Pay" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer bottom */}
      <div className={`footer-bottom ${darkMode ? "dark-theme" : ""}`}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              <p className="copyright">
                &copy; {currentYear} SBC Express. All rights reserved.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <div className="footer-bottom-links">
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms-conditions">Terms of Service</Link>
                <Link to="/sitemap">Sitemap</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
