import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Breadcrumb,
  Tabs,
  Tab,
  Form,
  Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faHeart,
  faShareAlt,
  faShoppingCart,
  faTruck,
  faUndo,
  faCreditCard,
  faShieldAlt,
  faPlus,
  faMinus,
  faEye,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faStar as faStarRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
  getProductById,
  getCategories,
  getBrands,
  getProducts,
  productToCartItem,
  productToWishlistItem,
  productToComponentFormat,
  Product as ProductType,
  getCategoryById,
  getBrandById,
} from "../utils/mockData";
import Layout from "../components/layout/Layout";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { useRecentlyViewed } from "../contexts/RecentlyViewedContext";
import ProductGrid from "../components/product/ProductGrid";
import RecentlyViewed from "../components/product/RecentlyViewed";
import "./ProductDetailsPage.css";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  images: string[];
  discount?: number;
  inStock?: boolean;
}

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState<string>("");
  const [reviewName, setReviewName] = useState<string>("");
  const [reviewEmail, setReviewEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const cartContext = useContext(CartContext);
  const wishlistContext = useContext(WishlistContext);
  const { addToRecentlyViewed } = useRecentlyViewed();

  // Calculate discounted price
  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  };

  // Fetch product data when ID changes
  useEffect(() => {
    setLoading(true);
    try {
      const fetchedProduct = getProductById(Number(productId));

      if (!fetchedProduct) {
        setError("Product not found");
        setLoading(false);
        return;
      }

      // Use the product directly since it's already in the right format
      setProduct(fetchedProduct);
      setSelectedImage(fetchedProduct.images[0]);

      if (fetchedProduct.colors && fetchedProduct.colors.length > 0) {
        setSelectedColor(fetchedProduct.colors[0]);
      }

      if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
        setSelectedSize(fetchedProduct.sizes[0]);
      }

      // Save to recently viewed
      addToRecentlyViewed({
        id: fetchedProduct.id,
        name: fetchedProduct.name,
        price: fetchedProduct.price,
        image: fetchedProduct.images[0],
        discount: fetchedProduct.discount_price
          ? Math.round(
              ((fetchedProduct.price - fetchedProduct.discount_price) /
                fetchedProduct.price) *
                100
            )
          : undefined,
        rating: fetchedProduct.ratings,
      });

      setLoading(false);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Error loading product");
      setLoading(false);
    }
  }, [productId, addToRecentlyViewed]);

  // Handle quantity change
  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Add to cart
  const handleAddToCart = () => {
    if (product) {
      const cartItem = productToCartItem(product, quantity, {
        color: selectedColor,
        size: selectedSize,
      });
      cartContext.addToCart(cartItem);
    }
  };

  // Toggle wishlist
  const handleToggleWishlist = () => {
    if (product) {
      const wishlistItem = productToWishlistItem(product);

      if (wishlistContext.isInWishlist(product.id)) {
        wishlistContext.removeFromWishlist(product.id);
      } else {
        wishlistContext.addToWishlist(wishlistItem);
      }
    }
  };

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`star-${i}`}
          icon={faStar}
          className="star-filled"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon
          key="star-half"
          icon={faStarHalfAlt}
          className="star-half"
        />
      );
    }

    const emptyStars = 5 - stars.length;
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

  // Submit review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    alert("Review submitted successfully!");
    // Reset form
    setReviewRating(5);
    setReviewText("");
    setReviewName("");
    setReviewEmail("");
  };

  // Get related products
  const getRelatedProducts = () => {
    if (!product) return [];

    // Use category_id directly
    const categoryId = product.category_id;
    if (!categoryId) return [];

    // Get products from the same category and convert to component format
    return getProducts(4, { category_id: categoryId })
      .filter((p) => p.id !== Number(productId))
      .map(productToComponentFormat);
  };

  if (loading) {
    return (
      <Layout>
        <Container className="py-5 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container className="py-5">
          <div className="alert alert-danger">
            <h4 className="alert-heading">Error</h4>
            <p>{error}</p>
            <hr />
            <Link to="/shop" className="btn btn-primary">
              Return to Shop
            </Link>
          </div>
        </Container>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <Container className="py-5">
          <div className="alert alert-warning">
            <h4 className="alert-heading">Product Not Found</h4>
            <p>The product you are looking for could not be found.</p>
            <hr />
            <Link to="/shop" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="py-4">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/products" }}>
            Products
          </Breadcrumb.Item>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{
              to: `/category/${getCategoryById(product.category_id)?.slug}`,
            }}
          >
            {getCategoryById(product.category_id)?.name || "Category"}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        {/* Product Details */}
        <Row className="mb-5">
          <Col md={6} className="product-images mb-4 mb-md-0">
            <div className="product-image-gallery">
              <div className="main-image-container">
                {/* Image loading placeholder */}
                {!selectedImage && (
                  <div className="image-placeholder">
                    Loading product image...
                  </div>
                )}

                {/* Main product image with zoom effect */}
                <div className="main-image-wrapper">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="img-fluid rounded main-product-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/600x600?text=Product+Image+Not+Available";
                    }}
                    loading="lazy"
                  />
                  <div className="image-zoom-lens"></div>

                  {/* Discount badge on main image */}
                  {product.discount_price && (
                    <div className="product-badge discount-badge">
                      {Math.round(
                        ((product.price - product.discount_price) /
                          product.price) *
                          100
                      )}
                      % OFF
                    </div>
                  )}

                  {/* New product badge */}
                  {product.isNew && (
                    <div className="product-badge new-badge">NEW</div>
                  )}
                </div>
              </div>

              {/* Image thumbnails with scroll for many images */}
              <div className="thumbnails-container">
                <div className="thumbnails-scroller">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`thumbnail-wrapper ${
                        selectedImage === image ? "active" : ""
                      }`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="thumbnail-image"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/100x100?text=Thumbnail";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Image counter */}
              <div className="image-counter">
                {product.images.indexOf(selectedImage) + 1} /{" "}
                {product.images.length}
              </div>
            </div>

            {/* Product image features */}
            <div className="image-features">
              <div className="feature">
                <FontAwesomeIcon icon={faEye} />
                <span>Zoom on hover</span>
              </div>
              {product.images.length > 1 && (
                <div className="feature">
                  <FontAwesomeIcon icon={faImages} />
                  <span>{product.images.length} product views</span>
                </div>
              )}
            </div>
          </Col>

          <Col md={6} className="product-info">
            <h1 className="product-title mb-2">{product.name}</h1>
            <div className="product-meta mb-3">
              <div className="product-rating d-flex align-items-center mb-3">
                <div className="stars">{renderStars(product.ratings)}</div>
                <span className="rating-text ms-2">
                  {product.ratings.toFixed(1)} out of 5
                </span>
                <span className="rating-count ms-2">
                  ({product.reviews_count} reviews)
                </span>
              </div>

              <div className="availability mt-2">
                <span
                  className={`stock-badge ${
                    product.inStock ? "in-stock" : "out-of-stock"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="product-price mb-3">
              {product.discount_price ? (
                <>
                  <span className="original-price">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="discounted-price">
                    ${product.discount_price.toFixed(2)}
                  </span>
                  <span className="discount-badge">
                    {Math.round(
                      ((product.price - product.discount_price) /
                        product.price) *
                        100
                    )}
                    % OFF
                  </span>
                </>
              ) : (
                <span className="regular-price">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="product-description mb-4">
              <p>{product.description}</p>
            </div>

            {/* Product Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="product-colors mb-3">
                <h5>Colors</h5>
                <div className="color-options">
                  {product.colors.map((color, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedColor === color ? "primary" : "outline-primary"
                      }
                      className="color-option me-2 mb-2"
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="product-sizes mb-3">
                <h5>Sizes</h5>
                <div className="size-options">
                  {product.sizes.map((size, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedSize === size ? "primary" : "outline-primary"
                      }
                      className="size-option me-2 mb-2"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="quantity-selector mb-4">
              <h5>Quantity</h5>
              <div className="d-flex align-items-center">
                <Button
                  variant="outline-secondary"
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <span className="quantity mx-3">{quantity}</span>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleQuantityChange("increase")}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions mb-4">
              <Button
                variant="primary"
                className="btn-add-to-cart me-2"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                Add to Cart
              </Button>
              <Button
                variant={
                  wishlistContext.isInWishlist(product.id)
                    ? "danger"
                    : "outline-secondary"
                }
                className="btn-wishlist"
                onClick={handleToggleWishlist}
              >
                <FontAwesomeIcon
                  icon={
                    wishlistContext.isInWishlist(product.id)
                      ? faHeart
                      : faHeartRegular
                  }
                />
                {wishlistContext.isInWishlist(product.id)
                  ? " Remove from Wishlist"
                  : " Add to Wishlist"}
              </Button>
            </div>

            {/* Product Info */}
            <div className="product-info-extra mb-4">
              <p className="sku">
                <strong>SKU:</strong> {product.sku || "N/A"}
              </p>
              <p className="categories">
                <strong>Category:</strong>{" "}
                {getCategoryById(product.category_id)?.name || "Unknown"}
              </p>
              <p className="brand">
                <strong>Brand:</strong>{" "}
                {getBrandById(product.brand_id)?.name || "Unknown"}
              </p>
            </div>

            {/* Shipping & Returns */}
            <div className="shipping-returns mb-4">
              <div className="product-guarantee">
                <div className="guarantee-item mb-2">
                  <FontAwesomeIcon icon={faShieldAlt} />
                  <span>2 Year Warranty</span>
                </div>
                <div className="guarantee-item mb-2">
                  <FontAwesomeIcon icon={faTruck} />
                  <span>Free Shipping</span>
                </div>
                <div className="guarantee-item mb-2">
                  <FontAwesomeIcon icon={faUndo} />
                  <span>30 Days Return</span>
                </div>
                <div className="guarantee-item mb-2">
                  <FontAwesomeIcon icon={faCreditCard} />
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>

            {/* Social Share */}
            <div className="social-share">
              <p className="mb-2">Share this product:</p>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <FontAwesomeIcon icon={faShareAlt} />
                </a>
              </div>
            </div>
          </Col>
        </Row>

        {/* Product Tabs */}
        <div className="product-tabs mb-5">
          <Tabs
            defaultActiveKey="description"
            id="product-tabs"
            className="mb-3"
          >
            <Tab
              eventKey="description"
              title="Description"
              className="p-4 bg-white rounded shadow-sm"
            >
              <p>{product.description}</p>
            </Tab>
            <Tab
              eventKey="specifications"
              title="Specifications"
              className="p-4 bg-white rounded shadow-sm"
            >
              <p>No specifications available for this product.</p>
            </Tab>
            <Tab
              eventKey="reviews"
              title={`Reviews (${product.reviews_count})`}
              className="p-4 bg-white rounded shadow-sm"
            >
              <div className="reviews-container">
                <div className="review-summary mb-4">
                  <h4>Customer Reviews</h4>
                  <div className="review-rating d-flex align-items-center">
                    <div className="stars">{renderStars(product.ratings)}</div>
                    <span className="ms-2">
                      {product.ratings.toFixed(1)} out of 5
                    </span>
                  </div>
                  <p className="text-muted">
                    Based on {product.reviews_count} reviews
                  </p>
                </div>

                <div className="review-form mb-4">
                  <h4>Write a Review</h4>
                  <form onSubmit={handleSubmitReview}>
                    <div className="mb-3">
                      <label className="form-label">Rating</label>
                      <div className="rating-select">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FontAwesomeIcon
                            key={star}
                            icon={star <= reviewRating ? faStar : faStarRegular}
                            className={`rating-star ${
                              star <= reviewRating ? "active" : ""
                            }`}
                            onClick={() => setReviewRating(star)}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="reviewName" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="reviewName"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="reviewEmail" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="reviewEmail"
                        value={reviewEmail}
                        onChange={(e) => setReviewEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="reviewText" className="form-label">
                        Your Review
                      </label>
                      <textarea
                        className="form-control"
                        id="reviewText"
                        rows={4}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit Review
                    </button>
                  </form>
                </div>

                <div className="reviews-list">
                  <p>No reviews yet. Be the first to review this product.</p>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="related-products mb-5">
          <h2 className="section-title mb-4">Related Products</h2>
          <ProductGrid products={getRelatedProducts()} />
        </div>

        {/* Recently Viewed */}
        <div className="recently-viewed">
          <h2 className="section-title mb-4">Recently Viewed</h2>
          <RecentlyViewed />
        </div>
      </Container>
    </Layout>
  );
};

export default ProductDetailsPage;
