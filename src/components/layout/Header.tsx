import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
  Badge,
  Offcanvas,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
  faBars,
  faMoon,
  faSun,
  faHeart,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { searchProducts } from "../../utils/mockData";
import { getInitials } from "../../utils/formatters";
import WishlistCounter from "../WishlistCounter";

import "./Header.css";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showOffcanvas, setShowOffcanvas] = useState<boolean>(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const { darkMode, toggleDarkMode } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems, getTotalItems } = useCart();
  const { wishlistItems } = useWishlist();

  const cartItemCount = getTotalItems();
  const wishlistItemCount = wishlistItems.length;

  // Handle scroll event for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle click outside search results to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = searchProducts(searchQuery);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(false);
      // In a real app, we would redirect to search results page
      // history.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  return (
    <header
      className={`site-header ${scrolled ? "scrolled" : ""} ${
        darkMode ? "dark-theme" : ""
      }`}
    >
      {/* Top bar with shipping info, language selector, etc. */}
      <div className="top-bar">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div className="top-bar-left">
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="top-bar-right">
              <NavDropdown title="USD" id="currency-dropdown">
                <NavDropdown.Item>EUR</NavDropdown.Item>
                <NavDropdown.Item>GBP</NavDropdown.Item>
                <NavDropdown.Item>CAD</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="English" id="language-dropdown">
                <NavDropdown.Item>Français</NavDropdown.Item>
                <NavDropdown.Item>Español</NavDropdown.Item>
                <NavDropdown.Item>Deutsch</NavDropdown.Item>
              </NavDropdown>
            </div>
          </div>
        </Container>
      </div>

      {/* Main navbar */}
      <Navbar expand="lg" className={`main-navbar ${scrolled ? "sticky" : ""}`}>
        <Container fluid="md">
          <div className="d-flex align-items-center justify-content-between w-100">
            <Navbar.Brand
              as={Link}
              to="/"
              className="d-flex align-items-center"
            >
              <div className="d-flex align-items-center">
                <img
                  src="/images/public/images/logo.png"
                  alt="SBC Express Logo"
                  className="logo"
                  style={{
                    height: "36px",
                    width: "36px",
                    objectFit: "contain",
                  }}
                />
                <span className="logo-text ms-2">SBC Express</span>
              </div>
            </Navbar.Brand>

            <div className="d-flex align-items-center">
              <Button
                variant="link"
                className="nav-icon theme-toggle-btn d-flex d-lg-none"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
              </Button>

              <WishlistCounter className="nav-icon d-flex d-lg-none" />

              <Link
                to="/cart"
                className="nav-icon position-relative d-flex d-lg-none"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                {cartItemCount > 0 && (
                  <Badge pill bg="danger" className="icon-badge">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>

              <Button
                variant="link"
                className="d-lg-none nav-icon menu-toggle"
                onClick={handleOffcanvasShow}
                aria-label="Toggle menu"
              >
                <FontAwesomeIcon icon={faBars} />
              </Button>
            </div>
          </div>

          <Navbar.Collapse id="main-navbar" className="mt-2 mt-lg-0">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              <NavDropdown title="Shop" id="shop-dropdown">
                <NavDropdown.Item as={Link} to="/shop">
                  All Products
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/electronics">
                  Electronics
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/clothing">
                  Clothing
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/home-kitchen">
                  Home & Kitchen
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={Link} to="/new-arrivals">
                New Arrivals
              </Nav.Link>
              <Nav.Link as={Link} to="/best-sellers">
                Best Sellers
              </Nav.Link>
              <Nav.Link as={Link} to="/deals">
                Deals
              </Nav.Link>
              <Nav.Link as={Link} to="/blog">
                Blog
              </Nav.Link>

              <NavDropdown
                title="Customer Service"
                id="customer-service-dropdown"
              >
                <NavDropdown.Item as={Link} to="/faq">
                  FAQ
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/shipping">
                  Shipping Info
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/returns">
                  Returns & Refunds
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/track-order">
                  Track Order
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/contact">
                  Contact Us
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about">
                  About Us
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <div className="d-none d-lg-flex align-items-center">
              <Button
                variant="link"
                className="nav-icon theme-toggle-btn"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
              </Button>

              <WishlistCounter className="nav-icon" />

              <Link to="/cart" className="nav-icon position-relative">
                <FontAwesomeIcon icon={faShoppingCart} />
                {cartItemCount > 0 && (
                  <Badge pill bg="danger" className="icon-badge">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>

              {isAuthenticated ? (
                <NavDropdown
                  title={
                    <div className="user-avatar">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <span>{getInitials(user?.name || "")}</span>
                      )}
                    </div>
                  }
                  id="user-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/account">
                    My Account
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/orders">
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/account/wishlist">
                    Wishlist
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div className="auth-buttons d-none d-lg-flex">
                  <Link
                    to="/login"
                    className="btn btn-sm btn-outline-primary me-2 d-flex align-items-center justify-content-center"
                    style={{ padding: "0.375rem 0.75rem", height: "32px" }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-sm btn-primary d-flex align-items-center justify-content-center"
                    style={{ padding: "0.375rem 0.75rem", height: "32px" }}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            <div
              className="search-container w-100 mt-3 mt-lg-0"
              ref={searchRef}
            >
              <Form className="d-flex search-form" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search products..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search"
                />
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="search-btn"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </Form>

              {showSearchResults && searchResults.length > 0 && (
                <div className="search-results">
                  <h6 className="search-results-title">Products</h6>
                  <ul className="search-results-list">
                    {searchResults.slice(0, 5).map((product) => (
                      <li key={product.id} className="search-result-item">
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={() => setShowSearchResults(false)}
                        >
                          <div className="search-result-img">
                            <img src={product.images[0]} alt={product.name} />
                          </div>
                          <div className="search-result-info">
                            <h6>{product.name}</h6>
                            <p className="price">${product.price.toFixed(2)}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {searchResults.length > 5 && (
                    <div className="search-results-more">
                      <Link
                        to={`/search?query=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setShowSearchResults(false)}
                      >
                        View all {searchResults.length} results
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas
        show={showOffcanvas}
        onHide={handleOffcanvasClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mobile-search mb-4">
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
              <Button type="submit" variant="outline-primary">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
          </div>

          <Nav className="flex-column mobile-nav">
            <Nav.Link as={Link} to="/" onClick={handleOffcanvasClose}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/shop" onClick={handleOffcanvasClose}>
              Shop
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/electronics"
              onClick={handleOffcanvasClose}
            >
              Electronics
            </Nav.Link>
            <Nav.Link as={Link} to="/clothing" onClick={handleOffcanvasClose}>
              Clothing
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/home-kitchen"
              onClick={handleOffcanvasClose}
            >
              Home & Kitchen
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/new-arrivals"
              onClick={handleOffcanvasClose}
            >
              New Arrivals
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/best-sellers"
              onClick={handleOffcanvasClose}
            >
              Best Sellers
            </Nav.Link>
            <Nav.Link as={Link} to="/deals" onClick={handleOffcanvasClose}>
              Deals
            </Nav.Link>
            <Nav.Link as={Link} to="/blog" onClick={handleOffcanvasClose}>
              Blog
            </Nav.Link>

            <div className="mobile-nav-divider">Customer Service</div>

            <Nav.Link as={Link} to="/faq" onClick={handleOffcanvasClose}>
              FAQ
            </Nav.Link>
            <Nav.Link as={Link} to="/shipping" onClick={handleOffcanvasClose}>
              Shipping Info
            </Nav.Link>
            <Nav.Link as={Link} to="/returns" onClick={handleOffcanvasClose}>
              Returns & Refunds
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/track-order"
              onClick={handleOffcanvasClose}
            >
              Track Order
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={handleOffcanvasClose}>
              Contact Us
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleOffcanvasClose}>
              About Us
            </Nav.Link>
          </Nav>

          <hr />

          <div className="mobile-account">
            {isAuthenticated ? (
              <>
                <div className="user-info d-flex align-items-center mb-3">
                  <div className="user-avatar me-3">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <span>{getInitials(user?.name || "")}</span>
                    )}
                  </div>
                  <div>
                    <h6 className="mb-0">{user?.name}</h6>
                    <small>{user?.email}</small>
                  </div>
                </div>
                <Nav className="flex-column">
                  <Nav.Link
                    as={Link}
                    to="/account"
                    onClick={handleOffcanvasClose}
                  >
                    My Account
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/orders"
                    onClick={handleOffcanvasClose}
                  >
                    Orders
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/account/wishlist"
                    onClick={handleOffcanvasClose}
                  >
                    Wishlist
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      logout();
                      handleOffcanvasClose();
                    }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Log Out
                  </Nav.Link>
                </Nav>
              </>
            ) : (
              <div className="d-grid gap-2">
                <Link
                  to="/login"
                  className="btn btn-primary d-flex align-items-center justify-content-center"
                  onClick={handleOffcanvasClose}
                  style={{ height: "38px" }}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                  onClick={handleOffcanvasClose}
                  style={{ height: "38px" }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <hr />

          <div className="mobile-settings">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span>Dark Mode</span>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="darkModeSwitch"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <span>Currency</span>
              <select className="form-select w-auto">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default Header;
