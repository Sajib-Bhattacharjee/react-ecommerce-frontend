import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShippingFast,
  faGlobeAmericas,
  faBoxOpen,
  faMapMarkerAlt,
  faTruck,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../components/PageHeader";
import "../styles/InfoPages.css";

const ShippingPage: React.FC = () => {
  // Domestic shipping rates
  const domesticRates = [
    {
      method: "Standard Shipping",
      time: "5-7 business days",
      cost: "Free over $50 / $5.99",
    },
    {
      method: "Express Shipping",
      time: "2-3 business days",
      cost: "$12.99",
    },
    {
      method: "Next Day Delivery",
      time: "Next business day",
      cost: "$19.99",
    },
  ];

  // International shipping rates by region
  const internationalRates = [
    {
      region: "Canada",
      standard: "$9.99 (7-10 days)",
      express: "$24.99 (3-5 days)",
    },
    {
      region: "Europe",
      standard: "$14.99 (10-14 days)",
      express: "$34.99 (5-7 days)",
    },
    {
      region: "Asia & Pacific",
      standard: "$16.99 (14-21 days)",
      express: "$39.99 (7-10 days)",
    },
    {
      region: "Latin America",
      standard: "$18.99 (14-21 days)",
      express: "$44.99 (7-10 days)",
    },
    {
      region: "Middle East & Africa",
      standard: "$19.99 (21+ days)",
      express: "$49.99 (10-14 days)",
    },
  ];

  // Shipping process steps
  const shippingSteps = [
    {
      icon: faBoxOpen,
      title: "Order Processing",
      description:
        "Once your order is placed, it typically takes 1-2 business days to process. During busy periods like holidays, processing may take up to 3 business days.",
    },
    {
      icon: faShippingFast,
      title: "Shipping",
      description:
        "After processing, your order is packaged and handed over to our shipping partners. You'll receive a confirmation email with tracking information.",
    },
    {
      icon: faTruck,
      title: "In Transit",
      description:
        "Your package is on its way! Use the tracking number provided to monitor your shipment's progress through our website or the carrier's site.",
    },
    {
      icon: faMapMarkerAlt,
      title: "Delivery",
      description:
        "Your order will be delivered to the shipping address provided. For some items, a signature may be required upon delivery.",
    },
  ];

  return (
    <>
      <PageHeader
        title="Shipping Information"
        description="Everything you need to know about our shipping policies, rates, and delivery times."
        bgImage="/images/public/images/shipping-header.jpg"
      />

      <div className="info-page">
        <Container>
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <h2 className="info-title">Our Shipping Policy</h2>
              <p className="info-text">
                We strive to deliver your orders quickly and reliably. Below
                you'll find detailed information about our shipping methods,
                rates, and policies to help you make informed decisions when
                shopping with us.
              </p>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={4} className="mb-4">
              <Card className="info-card h-100">
                <Card.Body className="text-center">
                  <FontAwesomeIcon
                    icon={faShippingFast}
                    className="info-icon"
                  />
                  <h3 className="info-subtitle">Fast Delivery</h3>
                  <p className="info-text">
                    We partner with reliable shipping carriers to ensure your
                    orders arrive as quickly as possible. Choose from standard,
                    express, or next-day delivery options.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className="mb-4">
              <Card className="info-card h-100">
                <Card.Body className="text-center">
                  <FontAwesomeIcon
                    icon={faGlobeAmericas}
                    className="info-icon"
                  />
                  <h3 className="info-subtitle">Global Shipping</h3>
                  <p className="info-text">
                    We ship to most countries worldwide. International customers
                    can enjoy our products with transparent shipping rates and
                    delivery estimates.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className="mb-4">
              <Card className="info-card h-100">
                <Card.Body className="text-center">
                  <FontAwesomeIcon icon={faCalendarAlt} className="info-icon" />
                  <h3 className="info-subtitle">Order Tracking</h3>
                  <p className="info-text">
                    Track your order every step of the way. We provide tracking
                    information for all shipments so you always know where your
                    package is.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={12}>
              <Card className="info-card">
                <Card.Header>Domestic Shipping Rates & Times</Card.Header>
                <Card.Body>
                  <p className="info-text">
                    We offer free standard shipping on all domestic orders over
                    $50. For orders under $50, shipping rates are as follows:
                  </p>
                  <Table responsive className="mb-0">
                    <thead>
                      <tr>
                        <th>Shipping Method</th>
                        <th>Delivery Time</th>
                        <th>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {domesticRates.map((rate, index) => (
                        <tr key={index}>
                          <td>{rate.method}</td>
                          <td>{rate.time}</td>
                          <td>{rate.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={12}>
              <Card className="info-card">
                <Card.Header>International Shipping Rates & Times</Card.Header>
                <Card.Body>
                  <p className="info-text">
                    International shipping rates vary by destination. Please
                    note that additional customs duties, taxes, and fees may
                    apply depending on your country's import regulations. These
                    charges are the responsibility of the recipient.
                  </p>
                  <Table responsive className="mb-0">
                    <thead>
                      <tr>
                        <th>Region</th>
                        <th>Standard Shipping</th>
                        <th>Express Shipping</th>
                      </tr>
                    </thead>
                    <tbody>
                      {internationalRates.map((rate, index) => (
                        <tr key={index}>
                          <td>{rate.region}</td>
                          <td>{rate.standard}</td>
                          <td>{rate.express}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={12}>
              <h3 className="info-subtitle mb-4">Shipping Process</h3>
              {shippingSteps.map((step, index) => (
                <div key={index} className="info-step">
                  <div className="info-step-number">{index + 1}</div>
                  <div className="info-step-content">
                    <h4 className="info-step-title">
                      <FontAwesomeIcon
                        icon={step.icon}
                        className="me-2"
                        style={{ color: "#4361ee" }}
                      />
                      {step.title}
                    </h4>
                    <p className="info-step-text">{step.description}</p>
                  </div>
                </div>
              ))}
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={12}>
              <Card className="info-card">
                <Card.Header>Shipping Policies</Card.Header>
                <Card.Body>
                  <h4 className="info-subtitle">Order Processing Times</h4>
                  <p className="info-text">
                    Most orders are processed within 1-2 business days. During
                    peak seasons or promotional periods, processing may take up
                    to 3 business days. Pre-orders and backorders may have
                    different processing times, which will be indicated on the
                    product page.
                  </p>

                  <h4 className="info-subtitle">Shipping Restrictions</h4>
                  <p className="info-text">
                    Some products cannot be shipped to certain locations due to
                    regulatory restrictions. If this applies to your order,
                    we'll notify you as soon as possible. We also cannot ship to
                    P.O. boxes for certain large items.
                  </p>

                  <h4 className="info-subtitle">Address Accuracy</h4>
                  <p className="info-text">
                    Please ensure your shipping address is accurate and
                    complete. We are not responsible for packages delivered to
                    incorrect addresses provided by customers. If a package is
                    returned to us due to an incorrect address, you may be
                    charged for reshipping.
                  </p>

                  <h4 className="info-subtitle">Delivery Issues</h4>
                  <p className="info-text">
                    If your package is lost, damaged, or significantly delayed,
                    please contact our customer service team within 7 days of
                    the expected delivery date. We'll work with our shipping
                    partners to resolve the issue as quickly as possible.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={8} className="mx-auto text-center">
              <h3 className="info-subtitle">Need More Information?</h3>
              <p className="info-text">
                If you have specific questions about shipping to your location
                or need assistance with an existing order, our customer service
                team is ready to help.
              </p>
              <a href="/contact" className="btn btn-primary btn-lg">
                Contact Us
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ShippingPage;
