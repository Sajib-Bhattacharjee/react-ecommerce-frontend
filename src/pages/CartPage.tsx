import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faArrowLeft,
  faArrowRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatters";
import "./CartPage.css";

const CartPage: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  // Handle coupon code application
  const handleApplyCoupon = () => {
    // In a real application, this would call an API to validate the coupon
    // Here we'll just simulate a valid coupon for demo purposes
    if (couponCode.toLowerCase() === "discount10") {
      setAppliedCoupon({ code: couponCode, discount: 10 });
      setCouponCode("");
    } else if (couponCode.toLowerCase() === "save20") {
      setAppliedCoupon({ code: couponCode, discount: 20 });
      setCouponCode("");
    } else {
      alert("Invalid coupon code");
    }
  };

  // Remove applied coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculate totals
  const subtotal = getTotalPrice();
  const discountAmount = appliedCoupon
    ? (subtotal * appliedCoupon.discount) / 100
    : 0;
  const estimatedTax = subtotal * 0.07; // 7% tax rate
  const estimatedShipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const grandTotal =
    subtotal - discountAmount + estimatedTax + estimatedShipping;

  return (
    <div className="cart-page">
      <Container>
        <h1 className="cart-title">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-content">
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <Link to="/shop" className="btn btn-primary">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <Row>
            <Col lg={8}>
              <div className="cart-items">
                <div className="cart-header">
                  <div className="row align-items-center">
                    <div className="col-md-6">Product</div>
                    <div className="col-md-2">Price</div>
                    <div className="col-md-2">Quantity</div>
                    <div className="col-md-2">Total</div>
                  </div>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <div className="cart-product">
                          <div className="cart-product-img">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <div className="cart-product-details">
                            <h3>
                              <Link to={`/product/${item.id}`}>
                                {item.name}
                              </Link>
                            </h3>
                            {item.color && (
                              <p className="product-color">
                                Color: {item.color}
                              </p>
                            )}
                            {item.size && (
                              <p className="product-size">Size: {item.size}</p>
                            )}
                            <button
                              className="remove-btn"
                              onClick={() => removeFromCart(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="cart-price">
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
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="cart-quantity">
                          <div className="quantity-control">
                            <button
                              className="quantity-btn"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span className="quantity-value">
                              {item.quantity}
                            </span>
                            <button
                              className="quantity-btn"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              aria-label="Increase quantity"
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="cart-item-total">
                          {formatPrice(
                            item.discount
                              ? (item.price -
                                  (item.price * item.discount) / 100) *
                                  item.quantity
                              : item.price * item.quantity
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="cart-actions">
                  <Link to="/shop" className="btn btn-outline">
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Continue Shopping
                  </Link>
                  <button
                    className="btn btn-outline-danger"
                    onClick={clearCart}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
                    Clear Cart
                  </button>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="cart-summary">
                <h2>Order Summary</h2>

                <div className="summary-item">
                  <span className="summary-label">
                    Subtotal ({getTotalItems()} items)
                  </span>
                  <span className="summary-value">{formatPrice(subtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="summary-item discount">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="summary-label">
                        Discount ({appliedCoupon.code} -{" "}
                        {appliedCoupon.discount}%)
                      </span>
                      <span className="summary-value discount-value">
                        -{formatPrice(discountAmount)}
                      </span>
                    </div>
                    <button
                      className="remove-coupon-btn"
                      onClick={handleRemoveCoupon}
                      aria-label="Remove coupon"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} className="me-1" />
                      Remove
                    </button>
                  </div>
                )}

                <div className="summary-item">
                  <span className="summary-label">Estimated Tax</span>
                  <span className="summary-value">
                    {formatPrice(estimatedTax)}
                  </span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Estimated Shipping</span>
                  <span className="summary-value">
                    {estimatedShipping === 0
                      ? "Free"
                      : formatPrice(estimatedShipping)}
                  </span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-item grand-total">
                  <span className="summary-label">Grand Total</span>
                  <span className="summary-value">
                    {formatPrice(grandTotal)}
                  </span>
                </div>

                {!appliedCoupon && (
                  <div className="coupon-section">
                    <h3>Apply Coupon</h3>
                    <Form>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button
                          variant="outline-primary"
                          onClick={handleApplyCoupon}
                          disabled={!couponCode}
                        >
                          Apply
                        </Button>
                      </InputGroup>
                    </Form>
                    <div className="available-coupons">
                      <p>Available coupons: DISCOUNT10, SAVE20</p>
                    </div>
                  </div>
                )}

                <div className="checkout-btn-wrapper">
                  <Link to="/checkout" className="btn btn-primary w-100">
                    Checkout
                    <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                  </Link>
                </div>

                <div className="secure-checkout">
                  <p>
                    <i className="fa fa-lock"></i> Secure Checkout
                  </p>
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
              </div>
            </Col>
          </Row>
        )}

        {cartItems.length > 0 && (
          <div className="saved-for-later mt-5">
            <h2>Recommended For You</h2>
            <Row className="mt-3">
              {/* Here you would map through recommended products */}
              <Col sm={6} md={4} lg={3}>
                <Card className="product-card">
                  <div className="product-image-wrapper">
                    <img
                      src="https://via.placeholder.com/300x300/f8f9fa/6c757d?text=Product"
                      alt="Recommended product"
                      className="card-img-top"
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>Recommended Product</Card.Title>
                    <div className="product-price">
                      <span className="price">$49.99</span>
                    </div>
                    <Button variant="primary" size="sm" className="mt-2 w-100">
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
