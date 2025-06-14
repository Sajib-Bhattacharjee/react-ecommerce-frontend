import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRecentlyViewed } from "../../contexts/RecentlyViewedContext";
import "./RecentlyViewed.css";

interface RecentlyViewedProps {
  title?: string;
  cols?: number;
  maxItems?: number;
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  title = "Recently Viewed",
  cols = 4,
  maxItems = 4,
}) => {
  const { viewedItems } = useRecentlyViewed();

  // If no viewed items, don't render anything
  if (viewedItems.length === 0) {
    return null;
  }

  // Take only the requested number of items
  const items = viewedItems.slice(0, maxItems);

  return (
    <div className="recently-viewed-section">
      <h3 className="section-title">{title}</h3>

      <Row>
        {items.map((product) => (
          <Col key={product.id} xs={6} md={12 / cols}>
            <Card className="recently-viewed-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image">
                  <Card.Img src={product.image} alt={product.name} />
                </div>
                <Card.Body>
                  <Card.Title className="product-title">
                    {product.name}
                  </Card.Title>
                  <div className="product-price">
                    {product.discount ? (
                      <>
                        <span className="price">
                          $
                          {(
                            product.price -
                            (product.price * product.discount) / 100
                          ).toFixed(2)}
                        </span>
                        <span className="price-old">
                          ${product.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="price">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RecentlyViewed;
