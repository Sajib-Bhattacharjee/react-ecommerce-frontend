import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faClock,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../components/product/ProductCard";
import { getDeals, Product, productToComponentFormat } from "../utils/mockData";
import DarkModeToggle from "../components/DarkModeToggle";
import "../styles/darkMode.css";
import "./DealsPage.css";

const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Fetch deals
      const products = getDeals();
      const formattedProducts = products.map((product: Product) => ({
        ...productToComponentFormat(product),
        category_name: "Deal",
        reviews_count: product.reviews_count,
        discount_price: product.discount_price,
      }));
      setDeals(formattedProducts);
    } catch (err) {
      setError("Failed to load deals. Please try again later.");
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
    <div className="deals-page">
      <DarkModeToggle />
      <div className="hero-section">
        <Container>
          <div className="hero-content">
            <h1>Hot Deals</h1>
            <p>Limited time offers and exclusive discounts</p>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        {/* Featured Deals */}
        <div className="featured-deals mb-5">
          <h2 className="section-title">Featured Deals</h2>
          <Row className="g-4">
            {deals.slice(0, 3).map((deal) => (
              <Col key={deal.id} md={4}>
                <div className="featured-deal-card">
                  <div className="deal-badge">
                    <Badge bg="danger">
                      <FontAwesomeIcon icon={faTag} />{" "}
                      {deal.discount_percentage}% OFF
                    </Badge>
                  </div>
                  <div className="deal-image">
                    <img src={deal.image} alt={deal.name} />
                  </div>
                  <div className="deal-content">
                    <h3>{deal.name}</h3>
                    <div className="price">
                      <span className="original-price">${deal.price}</span>
                      <span className="discount-price">
                        ${deal.discount_price}
                      </span>
                    </div>
                    <div className="timer">
                      <FontAwesomeIcon icon={faClock} /> Ends in 24:00:00
                    </div>
                    <Button variant="primary" className="mt-3">
                      Shop Now <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* All Deals */}
        <div className="all-deals">
          <h2 className="section-title">All Deals</h2>
          <Row className="g-4">
            {deals.map((deal) => (
              <Col key={deal.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  product={deal}
                  onQuickView={(p) => console.log("Quick view:", p)}
                />
              </Col>
            ))}
          </Row>
        </div>

        {deals.length === 0 && (
          <div className="text-center py-5">
            <h3>No deals available at the moment</h3>
            <p>Check back later for exciting offers</p>
            <Button variant="primary" href="/shop">
              Continue Shopping <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default DealsPage;
