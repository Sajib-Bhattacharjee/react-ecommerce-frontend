import React, { useState, useEffect } from "react";
import { Card, Badge, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faHeart,
  faShoppingCart,
  faEye,
  faExchangeAlt,
  faBox,
  faInfoCircle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import "./ProductCard.css";
import { useWishlist } from "../contexts/WishlistContext";
import { useCompare } from "../contexts/CompareContext";
import ProductQuickView from "./product/ProductQuickView";
import CompareProducts from "./product/CompareProducts";

interface ProductCardProps {
  product: {
    id: string | number;
    name: string;
    price: number;
    discountPrice?: number;
    images: string[];
    rating?: number;
    ratingCount?: number;
    discount?: number;
    isNew?: boolean;
    isFeatured?: boolean;
    inStock: boolean;
    description?: string;
    brand?: string;
    category?: string;
    features?: string[];
  };
  layout?: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  layout = "grid",
}) => {
  const {
    id,
    name,
    price,
    discountPrice,
    images,
    rating = 0,
    ratingCount = 0,
    discount,
    isNew,
    isFeatured,
    inStock,
    description,
    brand,
    category,
    features,
  } = product;

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isInCompare, addToCompare } = useCompare();
  const inWishlist = isInWishlist(id);
  const inCompare = isInCompare(id);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    // Set the initial product image, fallback to a placeholder if needed
    if (images && images.length > 0 && images[0]) {
      setCurrentImage(images[0]);
    } else {
      setCurrentImage("https://via.placeholder.com/300x300?text=No+Image");
    }
  }, [images]);

  const handleImageError = () => {
    // If the image fails to load, use a placeholder
    setCurrentImage("https://via.placeholder.com/300x300?text=Image+Error");
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    // Show the second image on hover if available
    if (images && images.length > 1) {
      setCurrentImage(images[1]);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Revert to first image when not hovering
    if (images && images.length > 0) {
      setCurrentImage(images[0]);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!inCompare) {
      addToCompare({
        id,
        name,
        price,
        image:
          images && images.length > 0
            ? images[0]
            : "https://via.placeholder.com/300x300?text=No+Image",
        discount,
        rating,
      });
    }

    setShowCompare(true);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`star-${i}`}
          icon={faStar}
          className="star-filled"
        />
      );
    }

    if (halfStar) {
      stars.push(
        <FontAwesomeIcon
          key="star-half"
          icon={faStarHalfAlt}
          className="star-half"
        />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`star-empty-${i}`}
          icon={faStar}
          className="star-empty"
        />
      );
    }

    return stars;
  };

  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Create a short description for grid view
  const shortDescription = description
    ? description.length > 60
      ? `${description.substring(0, 60)}...`
      : description
    : "No description available";

  if (layout === "list") {
    return (
      <>
        <Card
          className="product-card product-card-list animate-on-scroll"
          data-animation="fadeInUp"
        >
          <div className="product-card-inner">
            <div
              className="product-card-image"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link to={`/product/${id}`}>
                {!imageLoaded && (
                  <div className="product-image-placeholder">Loading...</div>
                )}
                <Card.Img
                  variant="top"
                  src={currentImage}
                  alt={name}
                  className={imageLoaded ? "" : "d-none"}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
                {discount && (
                  <Badge className="discount-badge">{discount}% OFF</Badge>
                )}
                {isNew && <Badge className="new-badge">NEW</Badge>}
                {isFeatured && (
                  <Badge className="featured-badge">FEATURED</Badge>
                )}
              </Link>
              <div className="product-card-actions">
                <button
                  className={`wishlist-button ${inWishlist ? "active" : ""}`}
                  onClick={handleWishlistToggle}
                  title={
                    inWishlist ? "Remove from Wishlist" : "Add to Wishlist"
                  }
                >
                  <FontAwesomeIcon icon={inWishlist ? faHeart : farHeart} />
                </button>
                <button
                  className="quick-view-button"
                  onClick={handleQuickViewClick}
                  title="Quick View"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                  className={`compare-button ${inCompare ? "active" : ""}`}
                  onClick={handleCompareClick}
                  title="Compare"
                >
                  <FontAwesomeIcon icon={faExchangeAlt} />
                </button>
              </div>
            </div>
            <div className="product-card-details">
              <Card.Body>
                <div className="product-meta">
                  {brand && <span className="product-brand">{brand}</span>}
                  {category && (
                    <span className="product-category">{category}</span>
                  )}
                </div>

                <Card.Title>
                  <Link to={`/product/${id}`}>{name}</Link>
                </Card.Title>

                <div className="product-rating">
                  <div className="stars">{renderStars(rating)}</div>
                  <span className="rating-count">({ratingCount} reviews)</span>
                </div>

                <div className="product-price">
                  <span className="price">${formatPrice(price)}</span>
                  {discountPrice && (
                    <span className="price-old">
                      ${formatPrice(discountPrice)}
                    </span>
                  )}
                  {discount && (
                    <span className="price-save">
                      Save ${formatPrice((discountPrice || price) - price)}
                    </span>
                  )}
                </div>

                <div className="product-stock">
                  {inStock ? (
                    <Badge className="in-stock">
                      <FontAwesomeIcon icon={faCheck} className="me-1" /> In
                      Stock
                    </Badge>
                  ) : (
                    <Badge className="out-of-stock">Out of Stock</Badge>
                  )}
                </div>

                <Card.Text className="product-description">
                  {description || "No description available"}
                </Card.Text>

                {features && features.length > 0 && (
                  <div className="product-features">
                    <h6 className="features-title">Key Features:</h6>
                    <ul className="features-list">
                      {features.slice(0, 3).map((feature, index) => (
                        <li key={index}>
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="feature-icon"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="product-actions">
                  <button
                    className="btn btn-primary btn-add-to-cart"
                    disabled={!inStock}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                    {inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button
                    className={`btn btn-outline-secondary btn-wishlist ${
                      inWishlist ? "active" : ""
                    }`}
                    onClick={handleWishlistToggle}
                  >
                    <FontAwesomeIcon icon={inWishlist ? faHeart : farHeart} />
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-quick-view"
                    onClick={handleQuickViewClick}
                  >
                    <FontAwesomeIcon icon={faEye} className="me-2" />
                    Quick View
                  </button>
                  <button
                    className={`btn btn-outline-secondary btn-compare ${
                      inCompare ? "active" : ""
                    }`}
                    onClick={handleCompareClick}
                  >
                    <FontAwesomeIcon icon={faExchangeAlt} className="me-2" />
                    Compare
                  </button>
                </div>
              </Card.Body>
            </div>
          </div>
        </Card>
        {showQuickView && (
          <ProductQuickView
            product={product}
            show={showQuickView}
            onHide={() => setShowQuickView(false)}
          />
        )}
        {showCompare && (
          <CompareProducts
            show={showCompare}
            onClose={() => setShowCompare(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Card
        className="product-card animate-on-scroll"
        data-animation="fadeInUp"
      >
        <div
          className="product-image-wrapper"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to={`/product/${id}`}>
            {!imageLoaded && (
              <div className="product-image-placeholder">Loading...</div>
            )}
            <Card.Img
              variant="top"
              src={currentImage}
              alt={name}
              className={`product-image ${imageLoaded ? "loaded" : "loading"}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            {discount && (
              <Badge className="discount-badge">{discount}% OFF</Badge>
            )}
            {isNew && <Badge className="new-badge">NEW</Badge>}
            {isFeatured && <Badge className="featured-badge">FEATURED</Badge>}
          </Link>
          <div className="product-card-actions">
            <button
              className={`wishlist-button ${inWishlist ? "active" : ""}`}
              onClick={handleWishlistToggle}
              title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <FontAwesomeIcon icon={inWishlist ? faHeart : farHeart} />
            </button>
            <button
              className="quick-view-button"
              onClick={handleQuickViewClick}
              title="Quick View"
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
            <button
              className={`compare-button ${inCompare ? "active" : ""}`}
              onClick={handleCompareClick}
              title="Compare"
            >
              <FontAwesomeIcon icon={faExchangeAlt} />
            </button>
          </div>
          {images && images.length > 1 && (
            <div className="image-count">
              <FontAwesomeIcon icon={faInfoCircle} className="me-1" />
              {images.length} images
            </div>
          )}
        </div>

        <Card.Body>
          <div className="product-meta">
            {brand && <span className="product-brand">{brand}</span>}
            {category && <span className="product-category">{category}</span>}
          </div>

          <Card.Title>
            <Link to={`/product/${id}`}>{name}</Link>
          </Card.Title>

          <div className="product-rating">
            <div className="stars">{renderStars(rating)}</div>
            <span className="rating-count">({ratingCount})</span>
          </div>

          <div className="product-price">
            <span className="price">${formatPrice(price)}</span>
            {discountPrice && (
              <span className="price-old">${formatPrice(discountPrice)}</span>
            )}
          </div>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`tooltip-desc-${id}`}>{description}</Tooltip>}
          >
            <p className="product-short-description">{shortDescription}</p>
          </OverlayTrigger>

          <div className="product-stock-indicator">
            {inStock ? (
              <span className="in-stock-text">
                <FontAwesomeIcon icon={faCheck} className="me-1" /> In Stock
              </span>
            ) : (
              <span className="out-of-stock-text">Out of Stock</span>
            )}
          </div>

          <button
            className="btn btn-primary btn-add-to-cart"
            disabled={!inStock}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </Card.Body>
      </Card>

      {showQuickView && (
        <ProductQuickView
          product={product}
          show={showQuickView}
          onHide={() => setShowQuickView(false)}
        />
      )}
      {showCompare && (
        <CompareProducts
          show={showCompare}
          onClose={() => setShowCompare(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
