import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Form,
  Spinner,
  Image,
  Dropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faTrashAlt,
  faHeart,
  faStore,
  faSearch,
  faSortAmountDown,
  faStar,
  faEye,
  faTimesCircle,
  faFilter,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../contexts/CartContext";
import "./WishlistPage.css";

type SortOption = "name" | "price-low" | "price-high" | "newest";

// Extend the Product interface to include specifications
interface Product {
  id: string | number;
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
  rating?: number;
  ratingCount?: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
  description?: string;
  specifications?: Record<string, string | number | boolean>;
}

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [displayItems, setDisplayItems] = useState<Product[]>(wishlist);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickView, setShowQuickView] = useState<number | string | null>(
    null
  );
  const [imgLoadError, setImgLoadError] = useState<Record<string, boolean>>({});
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(false);

  // Effect for filtering and sorting wishlist items
  useEffect(() => {
    setIsLoading(true);

    // Apply search filter
    let filteredItems = wishlist.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply sorting
    let sortedItems = [...filteredItems];
    switch (sortBy) {
      case "name":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        sortedItems.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case "price-high":
        sortedItems.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      case "newest":
        // Assuming newest items are at the end of the array in this demo
        // In a real app, you would sort by a date field
        break;
    }

    // Simulate loading state for smoother transitions
    setTimeout(() => {
      setDisplayItems(sortedItems);
      setIsLoading(false);
    }, 300);
  }, [wishlist, searchQuery, sortBy]);

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = useCallback(
    (product: Product) => {
      // Convert from wishlist item to cart item format and ensure id is a number
      const cartItem: CartItem = {
        id:
          typeof product.id === "string"
            ? parseInt(product.id, 10)
            : (product.id as number),
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0],
        discount: product.discount,
      };
      addToCart(cartItem);
      removeFromWishlist(product.id);
    },
    [addToCart, removeFromWishlist]
  );

  const calculatePrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  };

  const toggleQuickView = useCallback((id: string | number | null) => {
    setShowQuickView(id);
  }, []);

  const handleImageError = useCallback(
    (itemId: string | number, imageIndex: number) => {
      setImgLoadError((prev) => ({
        ...prev,
        [`${itemId}-${imageIndex}`]: true,
      }));
    },
    []
  );

  const toggleMobileFilters = () => {
    setMobileFiltersVisible(!mobileFiltersVisible);
  };

  const renderSortDropdown = () => (
    <Dropdown className="sort-dropdown">
      <Dropdown.Toggle
        variant="light"
        id="sort-dropdown"
        className="sort-toggle"
      >
        <FontAwesomeIcon icon={faSortAmountDown} className="me-2" />
        <span className="d-none d-sm-inline">Sort By:</span>
        {sortBy === "newest" && "Newest"}
        {sortBy === "name" && "Name (A-Z)"}
        {sortBy === "price-low" && "Price (Low to High)"}
        {sortBy === "price-high" && "Price (High to Low)"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          active={sortBy === "newest"}
          onClick={() => setSortBy("newest")}
        >
          Newest
        </Dropdown.Item>
        <Dropdown.Item
          active={sortBy === "name"}
          onClick={() => setSortBy("name")}
        >
          Name (A-Z)
        </Dropdown.Item>
        <Dropdown.Item
          active={sortBy === "price-low"}
          onClick={() => setSortBy("price-low")}
        >
          Price (Low to High)
        </Dropdown.Item>
        <Dropdown.Item
          active={sortBy === "price-high"}
          onClick={() => setSortBy("price-high")}
        >
          Price (High to Low)
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <div className="wishlist-page py-4">
      <Container fluid="xxl">
        <div className="wishlist-header d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
          <div className="d-flex align-items-center mb-3 mb-md-0">
            <div className="wishlist-icon-container me-3">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-danger wishlist-icon"
              />
            </div>
            <div>
              <h3 className="mb-0">My Wishlist</h3>
              <p className="text-muted mb-0">{wishlist.length} saved items</p>
            </div>
          </div>

          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              className="d-md-none filter-toggle-btn"
              onClick={toggleMobileFilters}
            >
              <FontAwesomeIcon icon={faFilter} className="me-2" />
              Filters
            </Button>

            <Button
              variant="outline-primary"
              href="/shop"
              className="d-none d-md-flex shop-more-btn"
            >
              <FontAwesomeIcon icon={faStore} className="me-2" />
              Continue Shopping
            </Button>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <Card className="wishlist-empty text-center p-5">
            <Card.Body>
              <div className="empty-wishlist-icon mb-4">
                <FontAwesomeIcon icon={faHeart} className="text-muted" />
              </div>
              <h5>Your wishlist is empty</h5>
              <p className="text-muted">
                Add items to your wishlist to save them for later.
              </p>
              <Button variant="primary" href="/shop" className="mt-3">
                <FontAwesomeIcon icon={faStore} className="me-2" />
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <>
            <div
              className={`wishlist-tools ${
                mobileFiltersVisible ? "show-mobile" : ""
              }`}
            >
              <div className="d-flex justify-content-between align-items-center mb-3 d-md-none">
                <h5 className="mb-0">Filters</h5>
                <Button
                  variant="link"
                  className="p-0 close-filters"
                  onClick={toggleMobileFilters}
                >
                  &times;
                </Button>
              </div>

              <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-3">
                <div className="search-container flex-grow-1">
                  <div className="search-input-wrapper">
                    <Form.Control
                      type="text"
                      placeholder="Search wishlist items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  </div>
                </div>

                <div className="sort-container">{renderSortDropdown()}</div>
              </div>
            </div>

            {mobileFiltersVisible && (
              <div
                className="filter-backdrop"
                onClick={toggleMobileFilters}
              ></div>
            )}

            <div
              className={`wishlist-items-container ${
                isLoading ? "loading" : ""
              }`}
            >
              {isLoading && (
                <div className="wishlist-loading">
                  <Spinner animation="border" variant="primary" />
                </div>
              )}

              <Row className="g-4">
                {displayItems.length === 0 && !isLoading ? (
                  <Col xs={12}>
                    <div className="no-results text-center py-5">
                      <p className="mb-0">
                        No items match your search criteria.
                      </p>
                    </div>
                  </Col>
                ) : (
                  displayItems.map((item) => (
                    <Col
                      xs={12}
                      sm={6}
                      md={4}
                      xl={3}
                      key={item.id}
                      className="mb-3"
                    >
                      <Card
                        className={`wishlist-item ${
                          showQuickView === item.id ? "show-quick-view" : ""
                        }`}
                      >
                        <div className="wishlist-badges">
                          {item.isNew && (
                            <Badge bg="success" className="product-badge">
                              New
                            </Badge>
                          )}
                          {item.discount && (
                            <Badge bg="danger" className="product-badge ms-2">
                              {item.discount}% OFF
                            </Badge>
                          )}
                        </div>

                        <div className="wishlist-item-img">
                          {!imgLoadError[`${item.id}-0`] ? (
                            <Image
                              src={item.images[0]}
                              alt={item.name}
                              className="product-image"
                              onError={() => handleImageError(item.id, 0)}
                            />
                          ) : (
                            <div className="image-placeholder">
                              <FontAwesomeIcon icon={faTimesCircle} size="2x" />
                              <span>Image unavailable</span>
                            </div>
                          )}

                          {item.images.length > 1 &&
                            !imgLoadError[`${item.id}-1`] && (
                              <Image
                                src={item.images[1]}
                                alt={`${item.name} - alternate view`}
                                className="product-image-hover"
                                onError={() => handleImageError(item.id, 1)}
                              />
                            )}

                          <div className="wishlist-item-actions">
                            <Button
                              variant="light"
                              className="action-btn view-btn"
                              onClick={() =>
                                toggleQuickView(
                                  showQuickView === item.id ? null : item.id
                                )
                              }
                              aria-label="Quick view"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                            <Button
                              variant="danger"
                              className="action-btn remove-btn"
                              onClick={() => removeFromWishlist(item.id)}
                              aria-label="Remove from wishlist"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                          </div>
                        </div>

                        <Card.Body className="d-flex flex-column">
                          {item.rating !== undefined && (
                            <div className="product-rating mb-2">
                              <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                  <FontAwesomeIcon
                                    key={i}
                                    icon={faStar}
                                    className={
                                      i < Math.floor(item.rating || 0)
                                        ? "star-filled"
                                        : "star-empty"
                                    }
                                  />
                                ))}
                              </div>
                              <span className="rating-count">
                                ({item.ratingCount || 0})
                              </span>
                            </div>
                          )}

                          <Card.Title className="product-title">
                            {item.name}
                          </Card.Title>

                          {item.description && (
                            <Card.Text className="product-description">
                              {item.description.substring(0, 60)}
                              {item.description.length > 60 ? "..." : ""}
                            </Card.Text>
                          )}

                          <div className="price-box mt-auto mb-3">
                            {item.discount ? (
                              <>
                                <span className="sale-price">
                                  $
                                  {calculatePrice(
                                    item.price,
                                    item.discount
                                  ).toFixed(2)}
                                </span>
                                <span className="regular-price">
                                  ${item.price.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="regular-price">
                                ${item.price.toFixed(2)}
                              </span>
                            )}
                          </div>

                          <Button
                            variant="primary"
                            className="add-to-cart-btn w-100"
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.inStock}
                          >
                            <FontAwesomeIcon
                              icon={faShoppingCart}
                              className="me-2"
                            />
                            {item.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </Card.Body>

                        {showQuickView === item.id && (
                          <div className="quick-view-panel">
                            <div className="quick-view-content">
                              <h5 className="mb-3">Product Details</h5>
                              <p className="mb-3">{item.description}</p>

                              {item.specifications && (
                                <div className="specifications mb-3">
                                  <h6>Specifications:</h6>
                                  <ul className="specs-list">
                                    {Object.entries(item.specifications).map(
                                      ([key, value]) => (
                                        <li key={key}>
                                          <span className="spec-name">
                                            {key}:
                                          </span>
                                          <span className="spec-value">
                                            {String(value)}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}

                              <Button
                                variant="outline-secondary"
                                size="sm"
                                className="close-quick-view mt-2"
                                onClick={() => toggleQuickView(null)}
                              >
                                Close
                              </Button>
                            </div>
                          </div>
                        )}
                      </Card>
                    </Col>
                  ))
                )}
              </Row>

              <div className="d-block d-md-none text-center mt-4 mb-2">
                <Button
                  variant="outline-primary"
                  href="/shop"
                  className="shop-more-btn-mobile"
                >
                  <FontAwesomeIcon icon={faStore} className="me-2" />
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </Container>

      {/* Scroll to top button */}
      {scrollToTop && (
        <Button
          className="scroll-to-top-btn"
          variant="primary"
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </Button>
      )}
    </div>
  );
};

export default WishlistPage;
