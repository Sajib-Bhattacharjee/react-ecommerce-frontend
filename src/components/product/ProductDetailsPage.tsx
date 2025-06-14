import React from "react";
import { Badge } from "react-bootstrap";
import { Product } from "../../utils/mockData";

interface ProductBadgesProps {
  product: Product;
}

const ProductBadges: React.FC<ProductBadgesProps> = ({ product }) => {
  return (
    <div className="product-badges mb-3">
      {product.discount_price && (
        <Badge bg="danger" className="me-2">
          {Math.round(
            ((product.price - product.discount_price) / product.price) * 100
          )}
          % OFF
        </Badge>
      )}
      {product.new_arrival && (
        <Badge bg="info" className="me-2">
          New
        </Badge>
      )}
      {product.bestseller && (
        <Badge bg="success" className="me-2">
          Best Seller
        </Badge>
      )}
    </div>
  );
};

export default ProductBadges;
