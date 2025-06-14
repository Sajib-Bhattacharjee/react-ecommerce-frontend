import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExchangeAlt,
  faBoxOpen,
  faMoneyBillWave,
  faClipboardCheck,
  faTimesCircle,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../components/PageHeader";
import "../styles/InfoPages.css";

const ReturnsPage: React.FC = () => {
  // Return process steps
  const returnSteps = [
    {
      title: "Initiate Return",
      description:
        "Log into your account, go to your order history, and select the 'Return Item' option for the product you wish to return. Follow the instructions to complete the return request form.",
    },
    {
      title: "Return Approval",
      description:
        "Once your return request is submitted, our team will review it. You'll receive an email confirmation with a return authorization number and shipping instructions within 1-2 business days.",
    },
    {
      title: "Package Your Return",
      description:
        "Pack the item(s) securely in the original packaging if possible. Include all accessories, manuals, and free gifts that came with the product. Attach the provided return label to the outside of the package.",
    },
    {
      title: "Ship Your Return",
      description:
        "Drop off your package at the designated shipping carrier location. We recommend getting a tracking number for your return shipment to ensure it can be tracked.",
    },
    {
      title: "Return Processing",
      description:
        "Once we receive your return, our team will inspect the item(s) to ensure they meet our return policy requirements. This process typically takes 3-5 business days.",
    },
    {
      title: "Refund Issued",
      description:
        "After your return is approved, we'll issue a refund to your original payment method. Depending on your financial institution, it may take 5-10 business days for the refund to appear in your account.",
    },
  ];

  // Return eligibility rules
  const eligibilityRules = [
    {
      icon: faClipboardCheck,
      title: "Eligible Items",
      description:
        "Most items can be returned within 30 days of delivery. Items must be unused, in their original condition, and include all original packaging, tags, and accessories.",
    },
    {
      icon: faTimesCircle,
      title: "Non-Returnable Items",
      description:
        "For hygiene and safety reasons, certain items cannot be returned, including intimate apparel, earrings, personalized products, digital downloads, and gift cards.",
    },
    {
      icon: faBoxOpen,
      title: "Damaged or Defective Items",
      description:
        "If you receive a damaged or defective item, please contact us within 48 hours of delivery. We'll arrange for a return or replacement at no cost to you.",
    },
    {
      icon: faQuestionCircle,
      title: "Special Circumstances",
      description:
        "If you have a special circumstance not covered by our standard policy, please contact our customer service team. We evaluate these situations on a case-by-case basis.",
    },
  ];

  return (
    <>
      <PageHeader
        title="Returns & Refunds"
        description="Our hassle-free return policy and process to ensure your satisfaction."
        bgImage="/images/public/images/returns-header.jpg"
      />

      <div className="info-page">
        <Container>
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <h2 className="info-title">Our Return Policy</h2>
              <p className="info-text">
                We want you to be completely satisfied with your purchase. If
                you're not happy with an item for any reason, you can return it
                within 30 days of delivery for a full refund or exchange.
              </p>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col md={4} className="mb-4">
              <Card className="info-card h-100">
                <Card.Body className="text-center">
                  <FontAwesomeIcon icon={faExchangeAlt} className="info-icon" />
                  <h3 className="info-subtitle">Easy Returns</h3>
                  <p className="info-text">
                    Our streamlined return process makes it simple to return or
                    exchange items that don't meet your expectations.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="info-card h-100">
                <Card.Body className="text-center">
                  <FontAwesomeIcon
                    icon={faMoneyBillWave}
                    className="info-icon"
                  />
                  <h3 className="info-subtitle">Full Refunds</h3>
                  <p className="info-text">
                    Receive a full refund to your original payment method for
                    eligible returns. No hidden fees or restocking charges.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="info-card h-100">
                <Card.Body className="text-center">
                  <FontAwesomeIcon icon={faBoxOpen} className="info-icon" />
                  <h3 className="info-subtitle">Free Return Shipping</h3>
                  <p className="info-text">
                    For defective or incorrectly shipped items, we provide free
                    return shipping labels to make the process hassle-free.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={12}>
              <Card className="info-card">
                <Card.Header>Return Eligibility</Card.Header>
                <Card.Body>
                  <Row>
                    {eligibilityRules.map((rule, index) => (
                      <Col md={6} key={index} className="mb-4">
                        <div className="d-flex">
                          <div
                            className="me-3"
                            style={{
                              color: "#4361ee",
                              fontSize: "1.5rem",
                              marginTop: "0.25rem",
                            }}
                          >
                            <FontAwesomeIcon icon={rule.icon} />
                          </div>
                          <div>
                            <h4 className="info-step-title">{rule.title}</h4>
                            <p className="info-step-text">{rule.description}</p>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={12}>
              <h3 className="info-subtitle mb-4">Return Process</h3>
              <p className="info-text mb-4">
                Follow these steps to return an item. The entire process
                typically takes 7-14 business days from the time you ship your
                return until you receive your refund.
              </p>

              {returnSteps.map((step, index) => (
                <div key={index} className="info-step">
                  <div className="info-step-number">{index + 1}</div>
                  <div className="info-step-content">
                    <h4 className="info-step-title">{step.title}</h4>
                    <p className="info-step-text">{step.description}</p>
                  </div>
                </div>
              ))}
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={12}>
              <Card className="info-card">
                <Card.Header>Refund Information</Card.Header>
                <Card.Body>
                  <h4 className="info-subtitle">Refund Methods</h4>
                  <p className="info-text">
                    Refunds are issued to your original payment method. For
                    credit card payments, refunds typically take 5-10 business
                    days to appear on your statement. PayPal refunds are usually
                    processed within 2-3 business days. Store credit refunds are
                    applied immediately to your account.
                  </p>

                  <h4 className="info-subtitle">Partial Refunds</h4>
                  <p className="info-text">
                    In some cases, we may issue a partial refund if the returned
                    item shows signs of use, damage, or if parts or accessories
                    are missing. We'll notify you before processing a partial
                    refund and explain the reason.
                  </p>

                  <h4 className="info-subtitle">Return Shipping Costs</h4>
                  <p className="info-text">
                    For standard returns, customers are responsible for return
                    shipping costs unless the item was defective, damaged during
                    shipping, or incorrectly shipped. In these cases, we'll
                    provide a prepaid return shipping label.
                  </p>

                  <h4 className="info-subtitle">International Returns</h4>
                  <p className="info-text">
                    International customers are responsible for return shipping
                    costs, customs duties, and taxes associated with returning
                    items. Please note that original shipping charges and import
                    fees are non-refundable.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={12}>
              <Card className="info-card">
                <Card.Header>Exchanges</Card.Header>
                <Card.Body>
                  <p className="info-text">
                    If you'd like to exchange an item for a different size,
                    color, or model, you can request an exchange instead of a
                    return. The process is similar:
                  </p>
                  <ol className="info-list">
                    <li>
                      Start a return request and select "Exchange" as your
                      preferred option.
                    </li>
                    <li>
                      Specify the item you'd like to receive in exchange
                      (including size, color, or model).
                    </li>
                    <li>
                      If the new item costs more than your original purchase,
                      you'll need to pay the difference. If it costs less, we'll
                      refund the difference.
                    </li>
                    <li>
                      Ship your original item back following the same return
                      process.
                    </li>
                    <li>
                      Once we receive and approve your return, we'll ship the
                      exchange item to you.
                    </li>
                  </ol>
                  <p className="info-text">
                    Please note that exchanges are subject to product
                    availability. If the requested exchange item is out of
                    stock, we'll contact you to discuss alternatives.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={8} className="mx-auto text-center">
              <h3 className="info-subtitle">Need Help with a Return?</h3>
              <p className="info-text">
                Our customer service team is here to assist you with any
                questions or issues regarding returns and refunds. Contact us
                for personalized support.
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

export default ReturnsPage;
