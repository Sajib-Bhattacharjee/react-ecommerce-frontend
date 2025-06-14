import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../components/product/ProductCard";
import {
  getNewArrivals,
  Product,
  productToComponentFormat,
} from "../utils/mockData";
import DarkModeToggle from "../components/DarkModeToggle";
import "../styles/darkMode.css";
import "./NewArrivalsPage.css";

const NewArrivalsPage: React.FC = () => {
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Fetch new arrivals
      const products = getNewArrivals();
      const formattedProducts = products.map((product: Product) => ({
        ...productToComponentFormat(product),
        category_name: "New Arrival", // Add category name for ProductCard
        reviews_count: product.reviews_count,
        discount_price: product.discount_price,
      }));
      setNewArrivals(formattedProducts);
    } catch (err) {
      setError("Failed to load new arrivals. Please try again later.");
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
    <div className="new-arrivals-page">
      <DarkModeToggle />
      <div className="hero-section">
        <Container>
          <div className="hero-content">
            <h1>New Arrivals</h1>
            <p>Discover our latest products and stay ahead of the trends</p>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="g-4">
          {newArrivals.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                product={product}
                onQuickView={(p) => console.log("Quick view:", p)}
              />
            </Col>
          ))}
        </Row>

        {newArrivals.length === 0 && (
          <div className="text-center py-5">
            <h3>No new arrivals found</h3>
            <p>Check back later for new products</p>
            <Button variant="primary" href="/shop">
              Continue Shopping <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default NewArrivalsPage;
