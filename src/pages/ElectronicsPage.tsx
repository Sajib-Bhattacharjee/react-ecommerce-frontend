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
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faSortAmountDown,
  faTh,
  faList,
  faArrowUp,
  faChevronUp,
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
import "./ElectronicsPage.css";

const ElectronicsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const productsPerPage = 12;

  // Fetch initial data
  useEffect(() => {
    setIsLoading(true);

    // Get all products
    const allProducts = getProducts();

    // Filter to only electronics (category_id: 1)
    const electronicsProducts = allProducts.filter(
      (product) => product.category_id === 1
    );

    setProducts(electronicsProducts);
    setFilteredProducts(electronicsProducts);

    // Get all brands
    const allBrands = getBrands();
    setBrands(allBrands);

    setIsLoading(false);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    setIsLoading(true);

    let result = [...products];

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
  }, [products, searchQuery, selectedBrands, priceRange, sortBy]);

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
    setPriceRange({ min: 0, max: 2000 });
    setSortBy("popularity");
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

  return (
    <div className="electronics-page py-4">
      <Container fluid="xxl">
        <div className="category-header mb-4">
          <div className="category-title-wrapper">
            <h1 className="category-title">Electronics</h1>
            <p className="category-description">
              Discover the latest in technology and electronics - from
              smartphones and laptops to TVs, audio equipment, and smart home
              devices.
            </p>
          </div>

          <div className="category-banner">
            <img
              src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Electronics department"
              className="img-fluid rounded"
            />
          </div>
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
                      max={2000}
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
                              max: parseInt(e.target.value) || 2000,
                            })
                          }
                        />
                      </Col>
                    </Row>
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
                        placeholder="Search electronics..."
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

        {/* Featured electronics */}
        <div className="featured-products mt-5">
          <h2 className="section-title">Featured Electronics</h2>
          <Row>
            {products
              .filter((product) => product.featured)
              .slice(0, 4)
              .map((product) => (
                <Col key={product.id} md={6} lg={3} className="mb-4">
                  <ProductCard product={productToComponentFormat(product)} />
                </Col>
              ))}
          </Row>
        </div>

        {/* Popular categories */}
        <div className="popular-categories mt-5">
          <h2 className="section-title">Popular Electronics Categories</h2>
          <Row>
            {[
              {
                id: 1,
                name: "Smartphones",
                image:
                  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                url: "/electronics/smartphones",
              },
              {
                id: 2,
                name: "Laptops",
                image:
                  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                url: "/electronics/laptops",
              },
              {
                id: 3,
                name: "Smart TVs",
                image:
                  "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                url: "/electronics/televisions",
              },
              {
                id: 4,
                name: "Audio & Headphones",
                image:
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                url: "/electronics/audio",
              },
            ].map((category) => (
              <Col key={category.id} md={6} lg={3} className="mb-4">
                <Link to={category.url} className="text-decoration-none">
                  <Card className="category-card h-100">
                    <div className="category-img-container">
                      <Card.Img
                        variant="top"
                        src={category.image}
                        alt={category.name}
                      />
                    </div>
                    <Card.Body className="text-center">
                      <Card.Title>{category.name}</Card.Title>
                    </Card.Body>
                  </Card>
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

export default ElectronicsPage;
