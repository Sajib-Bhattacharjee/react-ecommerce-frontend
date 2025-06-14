import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faUser,
  faTruck,
  faCreditCard,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatters";
import "./CheckoutPage.css";

// Step interfaces
interface AddressInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  saveAddress: boolean;
}

interface ShippingInfo {
  method: "standard" | "express" | "nextDay";
}

interface PaymentInfo {
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  saveCard: boolean;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);

  // Step form states
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    saveAddress: false,
  });

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    method: "standard",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    saveCard: false,
  });

  // Form validations
  const [validated, setValidated] = useState(false);

  // Calculate totals
  const subtotal = getTotalPrice();
  const shippingCost =
    shippingInfo.method === "express"
      ? 15
      : shippingInfo.method === "nextDay"
      ? 25
      : subtotal > 100
      ? 0
      : 7; // Standard shipping: free over $100, otherwise $7
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shippingCost + tax;

  // Handle navigation between steps
  const nextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setCurrentStep(currentStep + 1);
    setValidated(false);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    setValidated(false);
    window.scrollTo(0, 0);
  };

  // Handle form changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setAddressInfo({
      ...addressInfo,
      [name]: newValue,
    });
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      method: e.target.value as "standard" | "express" | "nextDay",
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setPaymentInfo({
      ...paymentInfo,
      [name]: newValue,
    });
  };

  // Handle order submission
  const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // In a real app, this would submit the order to an API
    // For demo purposes, we'll just clear the cart and navigate
    alert("Your order has been placed successfully!");
    clearCart();
    navigate("/");
  };

  // Render step based on current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form noValidate validated={validated} onSubmit={nextStep}>
            <h3 className="step-title">
              <FontAwesomeIcon icon={faUser} className="step-icon" />
              Shipping Information
            </h3>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={addressInfo.firstName}
                    onChange={handleAddressChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your first name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={addressInfo.lastName}
                    onChange={handleAddressChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your last name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={addressInfo.email}
                    onChange={handleAddressChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={addressInfo.phone}
                    onChange={handleAddressChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your phone number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={addressInfo.address}
                onChange={handleAddressChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your address.
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={addressInfo.city}
                    onChange={handleAddressChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your city.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={addressInfo.state}
                    onChange={handleAddressChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your state.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="zipCode"
                    value={addressInfo.zipCode}
                    onChange={handleAddressChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your zip code.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Select
                    name="country"
                    value={addressInfo.country}
                    onChange={(e) =>
                      setAddressInfo({
                        ...addressInfo,
                        country: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="USA">United States</option>
                    <option value="CAN">Canada</option>
                    <option value="MEX">Mexico</option>
                    <option value="UK">United Kingdom</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select your country.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="saveAddress"
                label="Save this address for future purchases"
                checked={addressInfo.saveAddress}
                onChange={handleAddressChange}
              />
            </Form.Group>

            <div className="step-actions">
              <Link to="/cart" className="btn btn-outline">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Back to Cart
              </Link>
              <Button type="submit" variant="primary">
                Continue to Shipping
                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </Button>
            </div>
          </Form>
        );

      case 2:
        return (
          <Form noValidate validated={validated} onSubmit={nextStep}>
            <h3 className="step-title">
              <FontAwesomeIcon icon={faTruck} className="step-icon" />
              Shipping Method
            </h3>

            <div className="shipping-options">
              <div
                className={`shipping-option ${
                  shippingInfo.method === "standard" ? "selected" : ""
                }`}
              >
                <div className="shipping-option-input">
                  <Form.Check
                    type="radio"
                    id="shipping-standard"
                    name="method"
                    value="standard"
                    checked={shippingInfo.method === "standard"}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="shipping-option-content">
                  <div className="shipping-info">
                    <h4>Standard Shipping</h4>
                    <p>Delivery in 3-5 business days</p>
                  </div>
                  <div className="shipping-price">
                    {subtotal > 100 ? "FREE" : formatPrice(7)}
                  </div>
                </div>
              </div>

              <div
                className={`shipping-option ${
                  shippingInfo.method === "express" ? "selected" : ""
                }`}
              >
                <div className="shipping-option-input">
                  <Form.Check
                    type="radio"
                    id="shipping-express"
                    name="method"
                    value="express"
                    checked={shippingInfo.method === "express"}
                    onChange={handleShippingChange}
                  />
                </div>
                <div className="shipping-option-content">
                  <div className="shipping-info">
                    <h4>Express Shipping</h4>
                    <p>Delivery in 1-2 business days</p>
                  </div>
                  <div className="shipping-price">{formatPrice(15)}</div>
                </div>
              </div>

              <div
                className={`shipping-option ${
                  shippingInfo.method === "nextDay" ? "selected" : ""
                }`}
              >
                <div className="shipping-option-input">
                  <Form.Check
                    type="radio"
                    id="shipping-nextDay"
                    name="method"
                    value="nextDay"
                    checked={shippingInfo.method === "nextDay"}
                    onChange={handleShippingChange}
                  />
                </div>
                <div className="shipping-option-content">
                  <div className="shipping-info">
                    <h4>Next Day Delivery</h4>
                    <p>Order today, receive tomorrow</p>
                  </div>
                  <div className="shipping-price">{formatPrice(25)}</div>
                </div>
              </div>
            </div>

            <div className="step-actions">
              <Button variant="outline" onClick={prevStep}>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Back to Shipping Info
              </Button>
              <Button type="submit" variant="primary">
                Continue to Payment
                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </Button>
            </div>
          </Form>
        );

      case 3:
        return (
          <Form noValidate validated={validated} onSubmit={nextStep}>
            <h3 className="step-title">
              <FontAwesomeIcon icon={faCreditCard} className="step-icon" />
              Payment Information
            </h3>

            <Form.Group className="mb-3">
              <Form.Label>Name on Card</Form.Label>
              <Form.Control
                type="text"
                name="cardName"
                value={paymentInfo.cardName}
                onChange={handlePaymentChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter the name on your card.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
                placeholder="XXXX XXXX XXXX XXXX"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid card number.
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardExpiry"
                    value={paymentInfo.cardExpiry}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the expiration date.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Security Code (CVV)</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardCvv"
                    value={paymentInfo.cardCvv}
                    onChange={handlePaymentChange}
                    placeholder="XXX"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the CVV code.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="saveCard"
                label="Save this card for future purchases"
                checked={paymentInfo.saveCard}
                onChange={handlePaymentChange}
              />
            </Form.Group>

            <div className="payment-security">
              <FontAwesomeIcon icon={faShieldAlt} className="security-icon" />
              <p>
                Your payment information is secure. We use industry-standard
                encryption to protect your data.
              </p>
            </div>

            <div className="step-actions">
              <Button variant="outline" onClick={prevStep}>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Back to Shipping Method
              </Button>
              <Button type="submit" variant="primary">
                Review Order
                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </Button>
            </div>
          </Form>
        );

      case 4:
        return (
          <Form noValidate validated={validated} onSubmit={handlePlaceOrder}>
            <h3 className="step-title">
              <FontAwesomeIcon icon={faCheck} className="step-icon" />
              Review Your Order
            </h3>

            <div className="order-review">
              <div className="review-section">
                <h4>Shipping Information</h4>
                <div className="review-content">
                  <p>
                    <strong>
                      {addressInfo.firstName} {addressInfo.lastName}
                    </strong>
                    <br />
                    {addressInfo.address}
                    <br />
                    {addressInfo.city}, {addressInfo.state}{" "}
                    {addressInfo.zipCode}
                    <br />
                    {addressInfo.country}
                    <br />
                    {addressInfo.phone}
                    <br />
                    {addressInfo.email}
                  </p>
                  <Button
                    variant="link"
                    className="edit-link"
                    onClick={() => setCurrentStep(1)}
                  >
                    Edit
                  </Button>
                </div>
              </div>

              <div className="review-section">
                <h4>Shipping Method</h4>
                <div className="review-content">
                  <p>
                    {shippingInfo.method === "standard" &&
                      "Standard Shipping (3-5 business days)"}
                    {shippingInfo.method === "express" &&
                      "Express Shipping (1-2 business days)"}
                    {shippingInfo.method === "nextDay" && "Next Day Delivery"}
                  </p>
                  <Button
                    variant="link"
                    className="edit-link"
                    onClick={() => setCurrentStep(2)}
                  >
                    Edit
                  </Button>
                </div>
              </div>

              <div className="review-section">
                <h4>Payment Method</h4>
                <div className="review-content">
                  <p>
                    Credit Card ending in {paymentInfo.cardNumber.slice(-4)}
                    <br />
                    {paymentInfo.cardName}
                  </p>
                  <Button
                    variant="link"
                    className="edit-link"
                    onClick={() => setCurrentStep(3)}
                  >
                    Edit
                  </Button>
                </div>
              </div>

              <div className="review-section">
                <h4>Order Items ({getTotalItems()})</h4>
                <div className="review-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="review-item">
                      <div className="review-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="review-item-details">
                        <h5>{item.name}</h5>
                        <p>Quantity: {item.quantity}</p>
                        <p className="item-price">
                          {formatPrice(
                            item.discount
                              ? (item.price -
                                  (item.price * item.discount) / 100) *
                                  item.quantity
                              : item.price * item.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>
                  {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="step-actions">
              <Button variant="outline" onClick={prevStep}>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Back to Payment
              </Button>
              <Button type="submit" variant="primary">
                Place Order
                <FontAwesomeIcon icon={faCheck} className="ms-2" />
              </Button>
            </div>
          </Form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="checkout-page">
      <Container>
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-steps">
          <div
            className={`checkout-step ${currentStep >= 1 ? "active" : ""} ${
              currentStep > 1 ? "completed" : ""
            }`}
          >
            <div className="step-number">1</div>
            <div className="step-label">Shipping</div>
          </div>
          <div
            className={`checkout-step ${currentStep >= 2 ? "active" : ""} ${
              currentStep > 2 ? "completed" : ""
            }`}
          >
            <div className="step-number">2</div>
            <div className="step-label">Delivery</div>
          </div>
          <div
            className={`checkout-step ${currentStep >= 3 ? "active" : ""} ${
              currentStep > 3 ? "completed" : ""
            }`}
          >
            <div className="step-number">3</div>
            <div className="step-label">Payment</div>
          </div>
          <div className={`checkout-step ${currentStep >= 4 ? "active" : ""}`}>
            <div className="step-number">4</div>
            <div className="step-label">Review</div>
          </div>
        </div>

        <Row>
          <Col lg={8}>
            <div className="checkout-form">{renderStep()}</div>
          </Col>
          <Col lg={4}>
            <div className="checkout-sidebar">
              <div className="checkout-summary">
                <h3>Order Summary</h3>

                <div className="summary-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="summary-item">
                      <div className="summary-item-img">
                        <img src={item.image} alt={item.name} />
                        <span className="item-quantity">{item.quantity}</span>
                      </div>
                      <div className="summary-item-info">
                        <h4>{item.name}</h4>
                        <p className="item-price">
                          {item.discount ? (
                            <>
                              <span className="current-price">
                                {formatPrice(
                                  item.price -
                                    (item.price * item.discount) / 100
                                )}
                              </span>
                              <span className="original-price">
                                {formatPrice(item.price)}
                              </span>
                            </>
                          ) : (
                            <span className="current-price">
                              {formatPrice(item.price)}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>
                      {currentStep < 2
                        ? "Calculated at next step"
                        : shippingCost === 0
                        ? "FREE"
                        : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <div className="secure-checkout">
                <div className="secure-icons">
                  <FontAwesomeIcon icon={faShieldAlt} />
                  <span>Secure Checkout</span>
                </div>
                <div className="payment-methods">
                  <img
                    src="https://via.placeholder.com/40x25/f8f9fa/6c757d?text=VISA"
                    alt="Visa"
                  />
                  <img
                    src="https://via.placeholder.com/40x25/f8f9fa/6c757d?text=MC"
                    alt="Mastercard"
                  />
                  <img
                    src="https://via.placeholder.com/40x25/f8f9fa/6c757d?text=AMEX"
                    alt="American Express"
                  />
                  <img
                    src="https://via.placeholder.com/40x25/f8f9fa/6c757d?text=PP"
                    alt="PayPal"
                  />
                </div>
              </div>

              <div className="need-help">
                <h4>Need Help?</h4>
                <p>
                  Call our customer support at <strong>1-800-123-4567</strong>
                </p>
                <p>9am - 8pm EST, Monday to Friday</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckoutPage;
