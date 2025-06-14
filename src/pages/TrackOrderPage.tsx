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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBoxOpen,
  faShippingFast,
  faCheckCircle,
  faTruckLoading,
  faWarehouse,
  faMapMarkerAlt,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../components/PageHeader";
import "../styles/InfoPages.css";

// Mock order status data for demonstration
interface OrderStatus {
  orderNumber: string;
  orderDate: string;
  status: "processing" | "shipped" | "out_for_delivery" | "delivered";
  estimatedDelivery: string;
  trackingNumber: string;
  carrier: string;
  items: {
    name: string;
    quantity: number;
    image: string;
  }[];
  timeline: {
    status: string;
    date: string;
    time: string;
    location?: string;
    description: string;
  }[];
}

const TrackOrderPage: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock function to track order
  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate inputs
    if (!orderNumber.trim() || !email.trim()) {
      setError("Please enter both order number and email address.");
      setIsLoading(false);
      return;
    }

    // For demo purposes, we'll simulate an API call and return mock data
    setTimeout(() => {
      // Demo: Only show results for this specific order number
      if (orderNumber === "SBC12345") {
        setOrderStatus({
          orderNumber: "SBC12345",
          orderDate: "June 15, 2023",
          status: "shipped",
          estimatedDelivery: "June 20, 2023",
          trackingNumber: "1Z999AA10123456784",
          carrier: "UPS",
          items: [
            {
              name: "Wireless Bluetooth Headphones",
              quantity: 1,
              image: "/images/public/images/products/headphones.jpg",
            },
            {
              name: "Smartphone Charging Cable",
              quantity: 2,
              image: "/images/public/images/products/cable.jpg",
            },
          ],
          timeline: [
            {
              status: "Order Placed",
              date: "June 15, 2023",
              time: "10:23 AM",
              description:
                "Your order has been received and is being processed.",
            },
            {
              status: "Payment Confirmed",
              date: "June 15, 2023",
              time: "10:25 AM",
              description: "Your payment has been successfully processed.",
            },
            {
              status: "Order Processing",
              date: "June 16, 2023",
              time: "9:45 AM",
              description: "Your order is being prepared for shipping.",
            },
            {
              status: "Shipped",
              date: "June 17, 2023",
              time: "2:30 PM",
              location: "Distribution Center, Atlanta GA",
              description: "Your order has been shipped and is on its way.",
            },
            {
              status: "In Transit",
              date: "June 18, 2023",
              time: "8:15 AM",
              location: "Sorting Facility, Charlotte NC",
              description: "Your package is in transit to its destination.",
            },
          ],
        });
      } else {
        setError(
          "No order found with the provided information. Please check your order number and email address."
        );
        setOrderStatus(null);
      }
      setIsLoading(false);
    }, 1500);
  };

  // Function to render status icon based on order status
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "Order Placed":
        return <FontAwesomeIcon icon={faBoxOpen} />;
      case "Payment Confirmed":
        return <FontAwesomeIcon icon={faCheckCircle} />;
      case "Order Processing":
        return <FontAwesomeIcon icon={faWarehouse} />;
      case "Shipped":
        return <FontAwesomeIcon icon={faShippingFast} />;
      case "In Transit":
        return <FontAwesomeIcon icon={faTruckLoading} />;
      case "Out for Delivery":
        return <FontAwesomeIcon icon={faTruck} />;
      case "Delivered":
        return <FontAwesomeIcon icon={faMapMarkerAlt} />;
      default:
        return <FontAwesomeIcon icon={faBoxOpen} />;
    }
  };

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "#f0ad4e"; // orange
      case "shipped":
        return "#5bc0de"; // blue
      case "out_for_delivery":
        return "#5cb85c"; // green
      case "delivered":
        return "#4361ee"; // primary color
      default:
        return "#6c757d"; // gray
    }
  };

  return (
    <>
      <PageHeader
        title="Track Your Order"
        description="Stay updated on the status and location of your order."
        bgImage="/images/public/images/track-order-header.jpg"
      />

      <div className="info-page">
        <Container>
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <h2 className="info-title">Where's My Order?</h2>
              <p className="info-text">
                Enter your order number and email address to track your order.
                You can find your order number in your order confirmation email.
              </p>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={8} className="mx-auto">
              <Card className="info-card">
                <Card.Body>
                  <Form onSubmit={handleTrackOrder}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Row>
                      <Col md={5} className="mb-3">
                        <Form.Group controlId="orderNumber">
                          <Form.Label>Order Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="e.g., SBC12345"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            required
                          />
                          <Form.Text className="text-muted">
                            Found in your order confirmation email
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={5} className="mb-3">
                        <Form.Group controlId="email">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email used for order"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <Form.Text className="text-muted">
                            Email address used when placing the order
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={2} className="mb-3 d-flex align-items-end">
                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : (
                            <FontAwesomeIcon icon={faSearch} className="me-2" />
                          )}
                          {isLoading ? "Tracking..." : "Track"}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Demo Note */}
          <Row className="mb-5">
            <Col lg={8} className="mx-auto">
              <Alert variant="info">
                <strong>Demo:</strong> Use order number "SBC12345" with any
                email to see a sample tracking result.
              </Alert>
            </Col>
          </Row>

          {orderStatus && (
            <>
              <Row className="mb-4">
                <Col lg={12}>
                  <Card className="info-card">
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <h3 className="mb-0">Order Summary</h3>
                        <span
                          className="badge"
                          style={{
                            backgroundColor: getStatusColor(orderStatus.status),
                            color: "#fff",
                            padding: "0.5rem 1rem",
                            fontSize: "0.9rem",
                          }}
                        >
                          {orderStatus.status === "processing"
                            ? "Processing"
                            : orderStatus.status === "shipped"
                            ? "Shipped"
                            : orderStatus.status === "out_for_delivery"
                            ? "Out for Delivery"
                            : "Delivered"}
                        </span>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6} className="mb-4">
                          <h5 className="info-step-title">Order Details</h5>
                          <p className="info-step-text">
                            <strong>Order Number:</strong>{" "}
                            {orderStatus.orderNumber}
                          </p>
                          <p className="info-step-text">
                            <strong>Order Date:</strong> {orderStatus.orderDate}
                          </p>
                          <p className="info-step-text">
                            <strong>Estimated Delivery:</strong>{" "}
                            {orderStatus.estimatedDelivery}
                          </p>
                        </Col>
                        <Col md={6} className="mb-4">
                          <h5 className="info-step-title">
                            Shipping Information
                          </h5>
                          <p className="info-step-text">
                            <strong>Carrier:</strong> {orderStatus.carrier}
                          </p>
                          <p className="info-step-text">
                            <strong>Tracking Number:</strong>{" "}
                            {orderStatus.trackingNumber}
                          </p>
                          <a
                            href={`https://www.ups.com/track?tracknum=${orderStatus.trackingNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-primary"
                          >
                            Track on {orderStatus.carrier} Website
                          </a>
                        </Col>
                      </Row>

                      <h5 className="info-step-title mb-3">Order Items</h5>
                      <div className="d-flex flex-wrap">
                        {orderStatus.items.map((item, index) => (
                          <div
                            key={index}
                            className="d-flex align-items-center me-4 mb-3"
                          >
                            <div
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                marginRight: "10px",
                                border: "1px solid #eee",
                              }}
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <div>
                              <p className="mb-0 info-step-title">
                                {item.name}
                              </p>
                              <small className="text-muted">
                                Qty: {item.quantity}
                              </small>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="mb-5">
                <Col lg={12}>
                  <Card className="info-card">
                    <Card.Header>Tracking Timeline</Card.Header>
                    <Card.Body>
                      <div className="position-relative">
                        {/* Timeline line */}
                        <div
                          style={{
                            position: "absolute",
                            left: "20px",
                            top: "0",
                            bottom: "0",
                            width: "2px",
                            backgroundColor: "#e9ecef",
                          }}
                        ></div>

                        {/* Timeline events */}
                        {orderStatus.timeline.map((event, index) => (
                          <div
                            key={index}
                            className="d-flex mb-4 position-relative"
                          >
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor:
                                  index === 0 ? "#4361ee" : "#e9ecef",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: index === 0 ? "#fff" : "#6c757d",
                                marginRight: "20px",
                                zIndex: 1,
                              }}
                            >
                              {renderStatusIcon(event.status)}
                            </div>
                            <div>
                              <h5 className="info-step-title">
                                {event.status}
                              </h5>
                              <p className="info-step-text mb-1">
                                {event.date} at {event.time}
                              </p>
                              {event.location && (
                                <p className="info-step-text mb-1">
                                  <strong>Location:</strong> {event.location}
                                </p>
                              )}
                              <p className="info-step-text">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}

          <Row className="mt-5">
            <Col lg={8} className="mx-auto text-center">
              <h3 className="info-subtitle">Need Help with Your Order?</h3>
              <p className="info-text">
                If you have any questions about your order or need assistance,
                our customer service team is here to help.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <a href="/contact" className="btn btn-primary">
                  Contact Us
                </a>
                <a href="/faq" className="btn btn-outline-primary">
                  View FAQs
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default TrackOrderPage;
