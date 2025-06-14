import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  InputGroup,
  Form,
  Spinner,
  Pagination,
  Badge,
  Nav,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faSortAmountDown,
  faTh,
  faList,
  faChevronUp,
  faHome,
  faUtensils,
  faCouch,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProductGrid from "../components/product/ProductGrid";
import ProductCard from "../components/product/ProductCard";
import {
  getProducts,
  getBrands,
  Product,
  Brand,
  productToComponentFormat,
} from "../utils/mockData";
import "./HomeKitchenPage.css";

const HomeKitchenPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const productsPerPage = 12;

  // Categories for the Home & Kitchen department
  const subCategories = [
    { id: "all", name: "All Categories", icon: faHome },
    { id: "kitchen", name: "Kitchen", icon: faUtensils },
    { id: "living", name: "Living Room", icon: faCouch },
    { id: "bedroom", name: "Bedroom", icon: faBed },
  ];

  // Fetch initial data
  useEffect(() => {
    setIsLoading(true);

    // Get all products
    const allProducts = getProducts();

    // Filter to only Home & Kitchen (category_id: 3)
    const homeKitchenProducts = allProducts.filter(
      (product) => product.category_id === 3
    );

    setProducts(homeKitchenProducts);
    setFilteredProducts(homeKitchenProducts);

    // Get all brands
    const allBrands = getBrands();
    setBrands(allBrands);

    setIsLoading(false);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    setIsLoading(true);

    let result = [...products];

    // Apply subcategory filter
    if (activeCategory !== "all") {
      // This is a simplified implementation
      // In a real app, we would filter by actual subcategory IDs
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(activeCategory) ||
          product.description.toLowerCase().includes(activeCategory)
      );
    }

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand_id)
      );
    }

    // Apply price range filter
    result = result.filter((product) => {
      const price = product.discount_price || product.price;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => {
          const priceA = a.discount_price || a.price;
          const priceB = b.discount_price || b.price;
          return priceA - priceB;
        });
        break;
      case "price-high":
        result.sort((a, b) => {
          const priceA = a.discount_price || a.price;
          const priceB = b.discount_price || b.price;
          return priceB - priceA;
        });
        break;
      case "newest":
        result.sort((a, b) =>
          b.new_arrival === a.new_arrival ? 0 : b.new_arrival ? 1 : -1
        );
        break;
      case "rating":
        result.sort((a, b) => b.ratings - a.ratings);
        break;
      default: // popularity
        result.sort((a, b) => b.reviews_count - a.reviews_count);
    }

    setFilteredProducts(result);
    setCurrentPage(1);

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [
    products,
    searchQuery,
    selectedBrands,
    priceRange,
    sortBy,
    activeCategory,
  ]);

  // Handle scroll to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle brand selection
  const toggleBrand = (brandId: number) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already applied via the useEffect
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedBrands([]);
    setPriceRange({ min: 0, max: 1000 });
    setSortBy("popularity");
    setActiveCategory("all");
  };

  // Handle pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render pagination items
  const renderPaginationItems = () => {
    const items = [];

    // Previous button
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      />
    );

    // First page
    if (currentPage > 2) {
      items.push(
        <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );

      if (currentPage > 3) {
        items.push(<Pagination.Ellipsis key="ellipsis1" />);
      }
    }

    // Pages around current page
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Last page
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        items.push(<Pagination.Ellipsis key="ellipsis2" />);
      }

      items.push(
        <Pagination.Item
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    // Next button
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  // Handle top deals section - show discounted items
  const topDeals = products
    .filter((product) => product.discount_price)
    .sort((a, b) => {
      const discountA = ((a.price - (a.discount_price || 0)) / a.price) * 100;
      const discountB = ((b.price - (b.discount_price || 0)) / b.price) * 100;
      return discountB - discountA;
    })
    .slice(0, 4);

  return (
    <div className="home-kitchen-page py-4">
      <Container fluid="xxl">
        <div className="category-header mb-4">
          <div className="category-title-wrapper">
            <h1 className="category-title">Home & Kitchen</h1>
            <p className="category-description">
              Discover quality products for every room in your home - from
              kitchen essentials and appliances to furniture, decor, and
              organization solutions.
            </p>
          </div>

          <Row className="category-banners">
            <Col md={8} className="mb-4 mb-md-0">
              <div className="main-banner">
                <img
                  src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Modern kitchen interior"
                  className="img-fluid rounded"
                />
                <div className="banner-content">
                  <h2>Up to 40% Off Kitchen Essentials</h2>
                  <Link to="/home-kitchen/kitchen" className="btn btn-light">
                    Shop Now
                  </Link>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <div className="sub-banner">
                    <img
                      src="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      alt="Cozy living room"
                      className="img-fluid rounded"
                    />
                    <div className="banner-content small">
                      <h3>Living Room Furniture</h3>
                      <Link to="/home-kitchen/living-room" className="btn-link">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col xs={12}>
                  <div className="sub-banner">
                    <img
                      src="https://images.unsplash.com/photo-1617325710236-4fe4c31db5f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      alt="Bedroom decor"
                      className="img-fluid rounded"
                    />
                    <div className="banner-content small">
                      <h3>Bedroom Essentials</h3>
                      <Link to="/home-kitchen/bedroom" className="btn-link">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        {/* Category Navigation */}
        <div className="category-nav mb-4">
          <Nav
            variant="pills"
            className="category-tabs"
            activeKey={activeCategory}
            onSelect={(key) => setActiveCategory(key || "all")}
          >
            {subCategories.map((category) => (
              <Nav.Item key={category.id}>
                <Nav.Link eventKey={category.id} className="category-tab">
                  <FontAwesomeIcon icon={category.icon} className="me-2" />
                  {category.name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        <Row>
          {/* Sidebar Filters */}
          <Col lg={3} md={4}>
            <div
              className={`category-filters ${showFilters ? "show-mobile" : ""}`}
            >
              <div className="d-flex justify-content-between align-items-center d-md-none mb-3">
                <h4 className="mb-0">Filters</h4>
                <Button
                  variant="link"
                  className="p-0 close-filters"
                  onClick={() => setShowFilters(false)}
                >
                  &times;
                </Button>
              </div>

              <Card className="filter-card mb-4">
                <Card.Header>
                  <h5 className="mb-0">Sort By</h5>
                </Card.Header>
                <Card.Body>
                  <Form.Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popularity">Popularity</option>
                    <option value="rating">Average Rating</option>
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </Form.Select>
                </Card.Body>
              </Card>

              <Card className="filter-card mb-4">
                <Card.Header>
                  <h5 className="mb-0">Price Range</h5>
                </Card.Header>
                <Card.Body>
                  <div className="price-slider">
                    <div className="d-flex justify-content-between mb-2">
                      <span>${priceRange.min}</span>
                      <span>${priceRange.max}</span>
                    </div>
                    <Form.Range
                      min={0}
                      max={1000}
                      step={10}
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="price-inputs mt-2">
                    <Row>
                      <Col xs={6}>
                        <Form.Control
                          type="number"
                          placeholder="Min"
                          value={priceRange.min}
                          onChange={(e) =>
                            setPriceRange({
                              ...priceRange,
                              min: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </Col>
                      <Col xs={6}>
                        <Form.Control
                          type="number"
                          placeholder="Max"
                          value={priceRange.max}
                          onChange={(e) =>
                            setPriceRange({
                              ...priceRange,
                              max: parseInt(e.target.value) || 1000,
                            })
                          }
                        />
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>

              <Card className="filter-card mb-4">
                <Card.Header>
                  <h5 className="mb-0">Brands</h5>
                </Card.Header>
                <Card.Body>
                  <div className="filter-list">
                    {brands.map((brand) => (
                      <Form.Check
                        key={brand.id}
                        type="checkbox"
                        id={`brand-${brand.id}`}
                        label={brand.name}
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => toggleBrand(brand.id)}
                        className="mb-2"
                      />
                    ))}
                  </div>
                </Card.Body>
              </Card>

              <Card className="filter-card mb-4">
                <Card.Header>
                  <h5 className="mb-0">On Sale</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid">
                    <Button
                      variant="outline-danger"
                      onClick={() => setSortBy("price-low")}
                    >
                      View Sale Items
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              <Button
                variant="outline-secondary"
                className="w-100"
                onClick={handleResetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </Col>

          {/* Product Listing */}
          <Col lg={9} md={8}>
            <div className="category-tools mb-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="d-flex align-items-center mb-3 mb-md-0">
                  <Button
                    variant="outline-secondary"
                    className="d-md-none me-2"
                    onClick={() => setShowFilters(true)}
                  >
                    <FontAwesomeIcon icon={faFilter} className="me-2" />
                    Filters
                  </Button>

                  <div className="results-count">
                    <p className="mb-0">
                      Showing {indexOfFirstProduct + 1}-
                      {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                      {filteredProducts.length} products
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <Form onSubmit={handleSearch} className="me-3">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Search home & kitchen..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button type="submit" variant="primary">
                        <FontAwesomeIcon icon={faSearch} />
                      </Button>
                    </InputGroup>
                  </Form>

                  <div className="view-options d-none d-md-flex">
                    <div className="btn-group">
                      <Button
                        variant={
                          view === "grid" ? "primary" : "outline-primary"
                        }
                        onClick={() => setView("grid")}
                      >
                        <FontAwesomeIcon icon={faTh} />
                      </Button>
                      <Button
                        variant={
                          view === "list" ? "primary" : "outline-primary"
                        }
                        onClick={() => setView("list")}
                      >
                        <FontAwesomeIcon icon={faList} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Display */}
            <div className="category-products">
              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-5">
                  <h4>No products found</h4>
                  <p>Try adjusting your filters or search term</p>
                </div>
              ) : (
                <>
                  {view === "grid" ? (
                    <ProductGrid
                      products={currentProducts.map(productToComponentFormat)}
                      cols={{ xs: 12, sm: 6, md: 6, lg: 4 }}
                    />
                  ) : (
                    <div className="product-list">
                      {currentProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={productToComponentFormat(product)}
                          layout="list"
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Pagination */}
              {filteredProducts.length > 0 && totalPages > 1 && (
                <div className="pagination-container mt-4">
                  <Pagination className="justify-content-center">
                    {renderPaginationItems()}
                  </Pagination>
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* Top Deals Section */}
        <div className="top-deals-section mt-5">
          <div className="section-header d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title mb-0">Top Deals</h2>
            <Link to="/deals" className="btn btn-link text-decoration-none">
              View All Deals
            </Link>
          </div>

          <Row>
            {topDeals.map((product) => (
              <Col key={product.id} md={6} lg={3} className="mb-4">
                <Card className="deal-card h-100">
                  <div className="deal-badge">
                    <span>
                      {Math.round(
                        ((product.price - (product.discount_price || 0)) /
                          product.price) *
                          100
                      )}
                      % OFF
                    </span>
                  </div>
                  <div className="deal-img-container">
                    <Card.Img
                      variant="top"
                      src={product.images[0]}
                      alt={product.name}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="deal-title">
                      {product.name}
                    </Card.Title>
                    <div className="deal-price">
                      <span className="current-price">
                        ${product.discount_price?.toFixed(2)}
                      </span>
                      <span className="original-price">
                        ${product.price?.toFixed(2)}
                      </span>
                    </div>
                    <Link
                      to={`/product/${product.slug}`}
                      className="btn btn-primary w-100 mt-3"
                    >
                      View Deal
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Popular Categories */}
        <div className="popular-categories mt-5">
          <h2 className="section-title">Shop by Room</h2>
          <Row>
            {[
              {
                id: 1,
                name: "Kitchen Appliances",
                image:
                  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                url: "/home-kitchen/kitchen-appliances",
              },
              {
                id: 2,
                name: "Dining",
                image:
                  "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                url: "/home-kitchen/dining",
              },
              {
                id: 3,
                name: "Bedroom",
                image:
                  "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                url: "/home-kitchen/bedroom",
              },
              {
                id: 4,
                name: "Bathroom",
                image:
                  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                url: "/home-kitchen/bathroom",
              },
            ].map((category) => (
              <Col key={category.id} md={6} lg={3} className="mb-4">
                <Link to={category.url} className="room-category-card">
                  <div className="room-img-container">
                    <img src={category.image} alt={category.name} />
                    <div className="room-overlay">
                      <h3>{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Container>

      {/* Mobile filter overlay */}
      {showFilters && (
        <div
          className="filter-overlay d-md-none"
          onClick={() => setShowFilters(false)}
        ></div>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          className="scroll-top-btn"
          variant="primary"
          onClick={scrollToTop}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </Button>
      )}
    </div>
  );
};

export default HomeKitchenPage;
