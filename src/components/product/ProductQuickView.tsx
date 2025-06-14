import React, { useState, useContext, useEffect } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  Nav,
  Tab,
  Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faStar,
  faStarHalfAlt,
  faShareAlt,
  faMinus,
  faPlus,
  faTruck,
  faShieldAlt,
  faCheckCircle,
  faSync,
  faInfoCircle,
  faArrowsAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { CartContext } from "../../contexts/CartContext";
import { WishlistContext } from "../../contexts/WishlistContext";
import { Product } from "../../utils/mockData";
import { productToCartItem, productToWishlistItem } from "../../utils/mockData";
import "./ProductQuickView.css";

interface ProductQuickViewProps {
  show: boolean;
  onHide: () => void;
  product: any;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  show,
  onHide,
  product,
}) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setImageLoaded(false);

      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }

      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }

      setQuantity(1);
      setActiveTab("details");
    }
  }, [product]);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    const cartItem = productToCartItem(product, quantity, {
      color: selectedColor,
      size: selectedSize,
    });
    addToCart(cartItem);
    onHide();
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      const wishlistItem = productToWishlistItem(product);
      addToWishlist(wishlistItem);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = e.target as HTMLImageElement;
    img.src = "https://via.placeholder.com/600x600?text=Image+Not+Available";
    setImageLoaded(true);
  };

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`star-${i}`}
          icon={faStar}
          className="text-warning"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon
          key="star-half"
          icon={faStarHalfAlt}
          className="text-warning"
        />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`star-empty-${i}`}
          icon={faStar}
          className="text-muted"
        />
      );
    }

    return stars;
  };

  if (!product) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="product-quick-view"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {product.name}
          {product.isNew && (
            <Badge bg="primary" className="ms-2">
              NEW
            </Badge>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6} className="product-images">
            <div className="main-image-container">
              {!imageLoaded && (
                <div className="image-loading-placeholder">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              <div className={`main-image ${imageLoaded ? "loaded" : ""}`}>
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="img-fluid"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />

                {product.discount_price && (
                  <div className="discount-badge">
                    {Math.round(
                      ((product.price - product.discount_price) /
                        product.price) *
                        100
                    )}
                    % OFF
                  </div>
                )}

                <div className="image-zoom-hint">
                  <FontAwesomeIcon icon={faArrowsAlt} />
                  <span>View full size</span>
                </div>
              </div>
            </div>

            <div className="image-thumbnails-container">
              <div className="image-thumbnails">
                {product.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className={`thumbnail-wrapper ${
                      selectedImage === image ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="img-fluid"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              <div className="image-counter">
                {product.images.indexOf(selectedImage) + 1} /{" "}
                {product.images.length}
              </div>
            </div>
          </Col>

          <Col md={6} className="product-info">
            <div className="product-header">
              <h2 className="product-title">{product.name}</h2>
              <div className="product-meta">
                {product.brand_id && (
                  <span className="product-brand">
                    Brand: {product.brand_id}
                  </span>
                )}
                <span className="product-sku">SKU: {product.sku}</span>
              </div>

              <div className="product-rating d-flex align-items-center mb-2">
                <div className="stars me-2">
                  {renderStars(product.rating || product.ratings)}
                </div>
                <span className="rating-count">
                  ({product.reviews_count} reviews)
                </span>
              </div>
            </div>

            <div className="product-price mb-3">
              {product.discount_price ? (
                <>
                  <span className="discounted-price me-2">
                    {formatPrice(product.discount_price)}
                  </span>
                  <span className="original-price text-decoration-line-through text-muted">
                    {formatPrice(product.price)}
                  </span>
                  <div className="discount-label">
                    Save {formatPrice(product.price - product.discount_price)}
                  </div>
                </>
              ) : (
                <span className="regular-price">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <div className="product-availability mb-3">
              <span className={product.inStock ? "in-stock" : "out-of-stock"}>
                <FontAwesomeIcon
                  icon={product.inStock ? faCheckCircle : faInfoCircle}
                  className="me-1"
                />
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
              {product.stock && product.stock < 10 && product.inStock && (
                <span className="low-stock ms-2">
                  Only {product.stock} left
                </span>
              )}
            </div>

            <Tab.Container
              id="product-info-tabs"
              activeKey={activeTab}
              onSelect={(k) => k && setActiveTab(k)}
            >
              <Nav variant="tabs" className="product-info-tabs mb-3">
                <Nav.Item>
                  <Nav.Link eventKey="details">Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="specs">Specifications</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="shipping">Shipping</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content className="pb-3">
                <Tab.Pane eventKey="details">
                  <div className="product-description mb-3">
                    <p>{product.description}</p>
                  </div>

                  {product.features && product.features.length > 0 && (
                    <div className="product-features">
                      <h5>Key Features:</h5>
                      <ul className="feature-list">
                        {product.features.map(
                          (feature: string, index: number) => (
                            <li key={index}>
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="feature-icon text-success me-2"
                              />
                              {feature}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </Tab.Pane>

                <Tab.Pane eventKey="specs">
                  {product.specifications ? (
                    <div className="product-specifications">
                      <table className="specs-table">
                        <tbody>
                          {Object.entries(product.specifications).map(
                            ([key, value]) => (
                              <tr key={key}>
                                <th>{key}</th>
                                <td>{String(value)}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-muted">
                      No specifications available for this product.
                    </p>
                  )}
                </Tab.Pane>

                <Tab.Pane eventKey="shipping">
                  <div className="shipping-info">
                    <div className="shipping-item">
                      <FontAwesomeIcon
                        icon={faTruck}
                        className="shipping-icon me-2"
                      />
                      <div>
                        <h6>Free Shipping</h6>
                        <p>On orders over $50</p>
                      </div>
                    </div>
                    <div className="shipping-item">
                      <FontAwesomeIcon
                        icon={faSync}
                        className="shipping-icon me-2"
                      />
                      <div>
                        <h6>30 Days Return</h6>
                        <p>Money back guarantee</p>
                      </div>
                    </div>
                    <div className="shipping-item">
                      <FontAwesomeIcon
                        icon={faShieldAlt}
                        className="shipping-icon me-2"
                      />
                      <div>
                        <h6>Secure Checkout</h6>
                        <p>100% Protected Payments</p>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>

            {product.colors && product.colors.length > 0 && (
              <div className="product-colors mb-3">
                <h5>Color:</h5>
                <div className="color-options d-flex flex-wrap">
                  {product.colors.map((color: string) => (
                    <div
                      key={color}
                      className={`color-option ${
                        selectedColor === color ? "selected" : ""
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                      onClick={() => handleColorSelect(color)}
                    >
                      {selectedColor === color && (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="check-icon"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="product-sizes mb-3">
                <h5>Size:</h5>
                <div className="size-options d-flex flex-wrap">
                  {product.sizes.map((size: string) => (
                    <div
                      key={size}
                      className={`size-option ${
                        selectedSize === size ? "selected" : ""
                      }`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="product-quantity mb-3">
              <h5>Quantity:</h5>
              <div className="quantity-selector d-flex align-items-center">
                <Button
                  variant="outline-secondary"
                  className="quantity-btn"
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <span className="quantity-value">{quantity}</span>
                <Button
                  variant="outline-secondary"
                  className="quantity-btn"
                  onClick={() => handleQuantityChange("increase")}
                  disabled={product.stock && quantity >= product.stock}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
            </div>

            <div className="product-actions d-flex flex-wrap">
              <Button
                variant="primary"
                className="btn-add-to-cart"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                Add to Cart
              </Button>
              <Button
                variant={
                  isInWishlist(product.id) ? "danger" : "outline-secondary"
                }
                className="btn-wishlist ms-2"
                onClick={handleWishlistToggle}
              >
                <FontAwesomeIcon
                  icon={isInWishlist(product.id) ? faHeart : faHeartRegular}
                />
              </Button>
              <Button variant="outline-secondary" className="btn-share ms-2">
                <FontAwesomeIcon icon={faShareAlt} />
              </Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ProductQuickView;
