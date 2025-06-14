import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faStar,
  faStarHalfAlt,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { useCompare } from "../../contexts/CompareContext";
import { useCart } from "../../hooks/useCart";
import "./CompareProducts.css";

interface CompareProductsProps {
  show: boolean;
  onClose: () => void;
}

const CompareProducts: React.FC<CompareProductsProps> = ({ show, onClose }) => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  // Handle add to cart button
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      discount: product.discount,
    });
  };

  // Render star ratings
  const renderStars = (rating: number = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`star-${i}`}
          icon={faStar}
          className="star-filled"
        />
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon
          key="star-half"
          icon={faStarHalfAlt}
          className="star-half"
        />
      );
    }

    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`star-empty-${i}`}
          icon={farStar}
          className="star-empty"
        />
      );
    }

    return <div className="stars">{stars}</div>;
  };

  // Calculate discounted price
  const calculatePrice = (price: number, discount?: number) => {
    if (discount) {
      const discountedPrice = price - (price * discount) / 100;
      return (
        <>
          <span className="price">${discountedPrice.toFixed(2)}</span>
          <span className="price-old">${price.toFixed(2)}</span>
        </>
      );
    }
    return <span className="price">${price.toFixed(2)}</span>;
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      size="xl"
      centered
      className="compare-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Compare Products</Modal.Title>
        {compareItems.length > 0 && (
          <Button
            variant="link"
            className="ms-auto clear-all-btn"
            onClick={clearCompare}
          >
            Clear All
          </Button>
        )}
      </Modal.Header>

      <Modal.Body>
        {compareItems.length === 0 ? (
          <div className="text-center py-5">
            <p className="mb-4">No products added for comparison.</p>
            <Link to="/shop" className="btn btn-primary" onClick={onClose}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="compare-table-wrapper">
            <Table responsive className="compare-table">
              <thead>
                <tr>
                  <th>Product</th>
                  {compareItems.map((item) => (
                    <th key={`header-${item.id}`} className="text-center">
                      <div className="compare-product-header">
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCompare(item.id)}
                          aria-label={`Remove ${item.name} from comparison`}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <div className="product-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <h3 className="product-title">
                          <Link to={`/product/${item.id}`} onClick={onClose}>
                            {item.name}
                          </Link>
                        </h3>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Price</th>
                  {compareItems.map((item) => (
                    <td key={`price-${item.id}`} className="text-center">
                      <div className="product-price">
                        {calculatePrice(item.price, item.discount)}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Rating</th>
                  {compareItems.map((item) => (
                    <td key={`rating-${item.id}`} className="text-center">
                      {renderStars(item.rating)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Action</th>
                  {compareItems.map((item) => (
                    <td key={`action-${item.id}`} className="text-center">
                      <Button
                        variant="primary"
                        onClick={() => handleAddToCart(item)}
                        className="btn-sm"
                      >
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                          className="me-2"
                        />
                        Add to Cart
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CompareProducts;
