import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

interface ColProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

interface ProductGridProps {
  products: any[];
  cols?: number | ColProps;
  onQuickView?: (product: any) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  cols = 4,
  onQuickView,
}) => {
  if (!products || products.length === 0) {
    return <p className="text-center my-5">No products found.</p>;
  }

  // Handle both number and object configurations for columns
  const colProps: ColProps =
    typeof cols === "number"
      ? { xs: 12, sm: 6, md: 4, lg: 12 / cols }
      : { xs: 12, ...cols }; // Ensure xs is always 12 for mobile unless explicitly set

  return (
    <Row className="product-grid g-3 g-md-4">
      {products.map((product) => (
        <Col
          key={product.id}
          xs={colProps.xs}
          sm={colProps.sm}
          md={colProps.md}
          lg={colProps.lg}
          xl={colProps.xl}
          className="mb-4"
        >
          <ProductCard product={product} onQuickView={onQuickView} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;
