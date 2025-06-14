import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingBag,
  faBoxOpen,
  faTags,
  faUser,
  faInfoCircle,
  faQuestionCircle,
  faEnvelope,
  faShieldAlt,
  faFileAlt,
  faSitemap,
  faChevronRight,
  faMapMarkerAlt,
  faShoppingCart,
  faHeart,
  faTag,
  faLaptop,
  faTshirt,
  faUtensils,
  faNewspaper,
  faStar,
  faArrowRight,
  faTruck,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../hooks/useTheme";
import "./SitemapPage.css";

const SitemapPage: React.FC = () => {
  const { darkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on page load
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Define site structure for the sitemap
  const siteStructure = [
    {
      id: "main",
      title: "Main Pages",
      icon: faHome,
      links: [
        { name: "Home", url: "/", icon: faHome },
        { name: "Shop", url: "/shop", icon: faShoppingBag },
        { name: "Cart", url: "/cart", icon: faShoppingCart },
        { name: "Checkout", url: "/checkout", icon: faTag },
        { name: "My Account", url: "/account", icon: faUser },
      ],
    },
    {
      id: "categories",
      title: "Shop Categories",
      icon: faBoxOpen,
      links: [
        { name: "Electronics", url: "/electronics", icon: faLaptop },
        { name: "Clothing", url: "/clothing", icon: faTshirt },
        { name: "Home & Kitchen", url: "/home-kitchen", icon: faUtensils },
      ],
    },
    {
      id: "collections",
      title: "Collections",
      icon: faTags,
      links: [
        { name: "New Arrivals", url: "/new-arrivals", icon: faTag },
        { name: "Best Sellers", url: "/best-sellers", icon: faStar },
        { name: "Deals & Offers", url: "/deals", icon: faTags },
      ],
    },
    {
      id: "account",
      title: "Account",
      icon: faUser,
      links: [
        { name: "Login", url: "/login", icon: faUser },
        { name: "Register", url: "/register", icon: faUser },
        { name: "My Orders", url: "/account/orders", icon: faBoxOpen },
        { name: "Wishlist", url: "/account/wishlist", icon: faHeart },
      ],
    },
    {
      id: "info",
      title: "Information",
      icon: faInfoCircle,
      links: [
        { name: "About Us", url: "/about", icon: faInfoCircle },
        { name: "FAQ", url: "/faq", icon: faQuestionCircle },
        { name: "Contact Us", url: "/contact", icon: faEnvelope },
        { name: "Blog", url: "/blog", icon: faNewspaper },
      ],
    },
    {
      id: "policies",
      title: "Policies",
      icon: faShieldAlt,
      links: [
        { name: "Privacy Policy", url: "/privacy-policy", icon: faShieldAlt },
        {
          name: "Terms & Conditions",
          url: "/terms-conditions",
          icon: faFileAlt,
        },
        { name: "Shipping Policy", url: "/shipping-policy", icon: faTruck },
        { name: "Return Policy", url: "/return-policy", icon: faUndo },
      ],
    },
  ];

  return (
    <div className={`sitemap-page ${darkMode ? "dark-theme" : ""}`}>
      {/* Hero Section */}
      <div className={`sitemap-hero ${isVisible ? "visible" : ""}`}>
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8} className="text-center">
              <div className="hero-icon">
                <FontAwesomeIcon icon={faSitemap} />
              </div>
              <h1>Sitemap</h1>
              <p className="lead">
                Find your way around our website with this complete overview of
                all pages
              </p>
              <div className="hero-divider">
                <span></span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row>
          {/* Intro text */}
          <Col lg={12} className="mb-5">
            <div className={`sitemap-intro ${isVisible ? "animate" : ""}`}>
              <p>
                Welcome to our sitemap. This page provides a comprehensive
                overview of all sections and pages available on our website. Use
                this page to quickly navigate to your desired destination or
                discover new areas of our site.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="sitemap-grid">
          {siteStructure.map((section, index) => (
            <Col lg={4} md={6} sm={12} key={section.id} className="mb-4">
              <Card
                className={`sitemap-card ${isVisible ? "animate" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card.Body>
                  <div className="section-header">
                    <div className="section-icon">
                      <FontAwesomeIcon icon={section.icon} />
                    </div>
                    <h2>{section.title}</h2>
                  </div>
                  <ul className="sitemap-links">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="sitemap-link-item">
                        <Link to={link.url} className="sitemap-link">
                          <div className="link-icon">
                            <FontAwesomeIcon icon={link.icon} />
                          </div>
                          <span>{link.name}</span>
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="arrow-icon"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Additional navigation help */}
        <Row className="mt-5">
          <Col lg={12}>
            <div
              className={`sitemap-help-card ${
                isVisible ? "animate-delayed" : ""
              }`}
            >
              <div className="help-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <div className="help-content">
                <h3>Can't find what you're looking for?</h3>
                <p>
                  If you can't find the page you're looking for or need
                  assistance navigating our website, please don't hesitate to
                  contact our customer support team.
                </p>
                <Link to="/contact" className="contact-link">
                  Contact Us <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SitemapPage;
