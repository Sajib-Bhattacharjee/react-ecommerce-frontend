import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../components/product/ProductCard";
import {
  getBestSellers,
  Product,
  productToComponentFormat,
} from "../utils/mockData";
import DarkModeToggle from "../components/DarkModeToggle";
import "../styles/darkMode.css";
import "./BestSellersPage.css";

const BestSellersPage: React.FC = () => {
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Fetch best sellers
      const products = getBestSellers();
      const formattedProducts = products.map((product: Product) => ({
        ...productToComponentFormat(product),
        category_name: "Best Seller",
        reviews_count: product.reviews_count,
        discount_price: product.discount_price,
      }));
      setBestSellers(formattedProducts);
    } catch (err) {
      setError("Failed to load best sellers. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Button variant="primary" href="/shop">
          Continue Shopping <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </Container>
    );
  }

  return (
    <div className="best-sellers-page">
      <DarkModeToggle />
      <div className="hero-section">
        <Container>
          <div className="hero-content">
            <h1>Best Sellers</h1>
            <p>Our most popular products loved by customers</p>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        {/* Stats Section */}
        <div className="stats-section mb-5">
          <Row className="g-4">
            <Col md={3} sm={6}>
              <div className="stat-card">
                <h3>5000+</h3>
                <p>Happy Customers</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="stat-card">
                <h3>4.8</h3>
                <p>Average Rating</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="stat-card">
                <h3>98%</h3>
                <p>Satisfaction Rate</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="stat-card">
                <h3>24/7</h3>
                <p>Customer Support</p>
              </div>
            </Col>
          </Row>
        </div>

        {/* Products Grid */}
        <Row className="g-4">
          {bestSellers.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                product={product}
                onQuickView={(p) => console.log("Quick view:", p)}
              />
            </Col>
          ))}
        </Row>

        {bestSellers.length === 0 && (
          <div className="text-center py-5">
            <h3>No best sellers found</h3>
            <p>Check back later for our most popular products</p>
            <Button variant="primary" href="/shop">
              Continue Shopping <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default BestSellersPage;
