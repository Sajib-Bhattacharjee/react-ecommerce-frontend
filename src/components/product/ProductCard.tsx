import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEye,
  faShoppingCart,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { productToCartItem, productToWishlistItem } from "../../utils/mockData";
import { calculateDiscountedPrice } from "../../utils/formatters";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

import "./ProductCard.css";

interface ProductCardProps {
  product: any;
  layout?: "grid" | "list";
  onQuickView?: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  layout = "grid",
  onQuickView,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  const price = calculateDiscountedPrice(product.price, product.discount);
  const productInCart = isInCart(product.id);
  const productInWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(productToCartItem(product));
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (productInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(productToWishlistItem(product));
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onQuickView) {
      onQuickView(product);
    }
  };

  // Render star ratings
  const renderStars = (rating: number) => {
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

    return (
      <div className="product-rating">
        <div className="stars">{stars}</div>
        <span className="rating-count">({product.reviews_count})</span>
      </div>
    );
  };

  return (
    <Card
      className={`product-card ${
        layout === "list" ? "product-card-list" : ""
      } ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card-img-wrapper">
        <Link to={`/product/${product.slug}`}>
          <Card.Img
            variant="top"
            src={product.images[0]}
            alt={product.name}
            className="product-image"
          />
          {product.images.length > 1 && (
            <Card.Img
              variant="top"
              src={product.images[1]}
              alt={product.name}
              className="product-image-hover"
            />
          )}
        </Link>

        {/* Product badges */}
        <div className="position-absolute top-0 start-0 p-2">
          {product.discount_price && (
            <span className="badge bg-danger mb-1 d-block">
              {Math.round(
                ((product.price - product.discount_price) / product.price) * 100
              )}
              % OFF
            </span>
          )}
          {product.new_arrival && (
            <span className="badge bg-success mb-1 d-block">New</span>
          )}
          {product.bestseller && (
            <span className="badge bg-primary mb-1 d-block">Best Seller</span>
          )}
        </div>

        {/* Quick action buttons */}
        <div className="product-actions">
          <button
            className={`action-button wishlist-button ${
              productInWishlist ? "active" : ""
            }`}
            onClick={handleWishlistToggle}
            aria-label={
              productInWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>

          <button
            className="action-button quickview-button"
            onClick={handleQuickView}
            aria-label="Quick view"
          >
            <FontAwesomeIcon icon={faEye} />
          </button>

          <button
            className={`action-button cart-button ${
              productInCart ? "active" : ""
            }`}
            onClick={handleAddToCart}
            aria-label={productInCart ? "Added to cart" : "Add to cart"}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
      </div>

      <Card.Body>
        {layout === "list" && (
          <div className="product-list-details">
            <Link to={`/product/${product.slug}`} className="product-category">
              {product.category_name}
            </Link>

            <Card.Title className="product-title">
              <Link to={`/product/${product.slug}`}>{product.name}</Link>
            </Card.Title>

            {renderStars(product.rating)}

            <div className="product-description mb-3">
              <p>{product.description.substring(0, 150)}...</p>
            </div>

            <div className="product-price">
              {price.isDiscounted ? (
                <>
                  <span className="price">{price.discountedFormatted}</span>
                  <span className="price-old">{price.originalFormatted}</span>
                </>
              ) : (
                <span className="price">{price.originalFormatted}</span>
              )}
            </div>

            <div className="product-colors">
              {product.colors &&
                product.colors.map((color: string, index: number) => (
                  <span
                    key={`${color}-${index}`}
                    className="color-dot"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
            </div>

            <div className="product-list-actions mt-3">
              <button
                className={`btn ${
                  productInCart ? "btn-success" : "btn-primary"
                }`}
                onClick={handleAddToCart}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                {productInCart ? "Added to Cart" : "Add to Cart"}
              </button>
              <button
                className={`btn ${
                  productInWishlist ? "btn-danger" : "btn-outline-secondary"
                } ms-2`}
                onClick={handleWishlistToggle}
              >
                <FontAwesomeIcon icon={faHeart} className="me-2" />
                {productInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
              <button
                className="btn btn-outline-secondary ms-2"
                onClick={handleQuickView}
              >
                <FontAwesomeIcon icon={faEye} className="me-2" />
                Quick View
              </button>
            </div>
          </div>
        )}

        {layout === "grid" && (
          <>
            <Link to={`/product/${product.slug}`} className="product-category">
              {product.category_name}
            </Link>

            <Card.Title className="product-title">
              <Link to={`/product/${product.slug}`}>{product.name}</Link>
            </Card.Title>

            {renderStars(product.rating)}

            <div className="product-price">
              {price.isDiscounted ? (
                <>
                  <span className="price">{price.discountedFormatted}</span>
                  <span className="price-old">{price.originalFormatted}</span>
                </>
              ) : (
                <span className="price">{price.originalFormatted}</span>
              )}
            </div>

            <div className="product-colors">
              {product.colors &&
                product.colors.map((color: string, index: number) => (
                  <span
                    key={`${color}-${index}`}
                    className="color-dot"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
