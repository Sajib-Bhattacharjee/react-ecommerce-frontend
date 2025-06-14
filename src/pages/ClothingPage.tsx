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
  Tabs,
  Tab,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faSortAmountDown,
  faTh,
  faList,
  faChevronUp,
  faTshirt,
  faMale,
  faFemale,
  faChild,
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
import "./ClothingPage.css";

// Available sizes for clothing
const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

// Available colors with hex values
const availableColors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#ffffff" },
  { name: "Red", value: "#ff0000" },
  { name: "Blue", value: "#0000ff" },
  { name: "Green", value: "#008000" },
  { name: "Yellow", value: "#ffff00" },
  { name: "Purple", value: "#800080" },
  { name: "Pink", value: "#ffc0cb" },
  { name: "Brown", value: "#a52a2a" },
  { name: "Gray", value: "#808080" },
];

const ClothingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");

  const productsPerPage = 12;

  // Fetch initial data
  useEffect(() => {
    setIsLoading(true);

    // Get all products
    const allProducts = getProducts();

    // Filter to only clothing (category_id: 2)
    const clothingProducts = allProducts.filter(
      (product) => product.category_id === 2
    );

    setProducts(clothingProducts);
    setFilteredProducts(clothingProducts);

    // Get all brands
    const allBrands = getBrands();
    setBrands(allBrands);

    setIsLoading(false);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    setIsLoading(true);

    let result = [...products];

    // Apply gender/category filter based on tab
    if (activeTab !== "all") {
      // We would normally filter by subcategory here
      // This is a simplified implementation
      if (activeTab === "men") {
        result = result.filter(
          (product) =>
            product.name.toLowerCase().includes("men") ||
            product.description.toLowerCase().includes("men")
        );
      } else if (activeTab === "women") {
        result = result.filter(
          (product) =>
            product.name.toLowerCase().includes("women") ||
            product.description.toLowerCase().includes("women")
        );
      } else if (activeTab === "kids") {
        result = result.filter(
          (product) =>
            product.name.toLowerCase().includes("kid") ||
            product.description.toLowerCase().includes("kid") ||
            product.name.toLowerCase().includes("children") ||
            product.description.toLowerCase().includes("children")
        );
      }
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

    // Apply color filter
    if (selectedColors.length > 0) {
      result = result.filter(
        (product) =>
          product.colors &&
          product.colors.some((color) =>
            selectedColors.includes(color.toLowerCase())
          )
      );
    }

    // Apply size filter
    if (selectedSizes.length > 0) {
      result = result.filter(
        (product) =>
          product.sizes &&
          product.sizes.some((size) => selectedSizes.includes(size))
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
    selectedColors,
    selectedSizes,
    priceRange,
    sortBy,
    activeTab,
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

  // Toggle brand selection
  const toggleBrand = (brandId: number) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  // Toggle color selection
  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color.toLowerCase())
        ? prev.filter((c) => c !== color.toLowerCase())
        : [...prev, color.toLowerCase()]
    );
  };

  // Toggle size selection
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
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
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange({ min: 0, max: 500 });
    setSortBy("popularity");
    setActiveTab("all");
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

  // Render pagination
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
    <div className="clothing-page py-4">
      <Container fluid="xxl">
        <div className="category-header mb-4">
          <div className="category-title-wrapper">
            <h1 className="category-title">Clothing</h1>
            <p className="category-description">
              Explore our extensive collection of clothing for men, women, and
              kids - from casual everyday wear to elegant formal attire.
            </p>
          </div>

          <div className="category-banner">
            <img
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Clothing collection"
              className="img-fluid rounded"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs mb-4">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k || "all")}
            className="mb-3"
            fill
          >
            <Tab
              eventKey="all"
              title={
                <span>
                  <FontAwesomeIcon icon={faTshirt} className="me-2" />
                  All Clothing
                </span>
              }
            />
            <Tab
              eventKey="men"
              title={
                <span>
                  <FontAwesomeIcon icon={faMale} className="me-2" />
                  Men
                </span>
              }
            />
            <Tab
              eventKey="women"
              title={
                <span>
                  <FontAwesomeIcon icon={faFemale} className="me-2" />
                  Women
                </span>
              }
            />
            <Tab
              eventKey="kids"
              title={
                <span>
                  <FontAwesomeIcon icon={faChild} className="me-2" />
                  Kids
                </span>
              }
            />
          </Tabs>
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
                  <h5 className="mb-0">Size</h5>
                </Card.Header>
                <Card.Body>
                  <div className="size-filter">
                    {availableSizes.map((size) => (
                      <Button
                        key={size}
                        variant={
                          selectedSizes.includes(size)
                            ? "primary"
                            : "outline-secondary"
                        }
                        className="size-btn"
                        onClick={() => toggleSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              <Card className="filter-card mb-4">
                <Card.Header>
                  <h5 className="mb-0">Colors</h5>
                </Card.Header>
                <Card.Body>
                  <div className="color-filter">
                    {availableColors.map((color) => (
                      <Button
                        key={color.name}
                        variant="link"
                        className={`color-btn ${
                          selectedColors.includes(color.name.toLowerCase())
                            ? "active"
                            : ""
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => toggleColor(color.name)}
                        title={color.name}
                      >
                        {selectedColors.includes(color.name.toLowerCase()) && (
                          <span className="color-check">✓</span>
                        )}
                      </Button>
                    ))}
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
                      max={500}
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
                              max: parseInt(e.target.value) || 500,
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
                        placeholder="Search clothing..."
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

            {/* Applied Filters */}
            {(selectedBrands.length > 0 ||
              selectedColors.length > 0 ||
              selectedSizes.length > 0) && (
              <div className="applied-filters mb-4">
                <div className="d-flex flex-wrap gap-2 align-items-center">
                  <span className="filter-label">Applied Filters:</span>

                  {selectedBrands.length > 0 && (
                    <div className="applied-filter-group">
                      <span className="filter-group-label">Brands:</span>
                      {selectedBrands.map((brandId) => {
                        const brand = brands.find((b) => b.id === brandId);
                        return brand ? (
                          <Badge
                            key={brand.id}
                            bg="light"
                            text="dark"
                            className="filter-badge"
                            onClick={() => toggleBrand(brand.id)}
                          >
                            {brand.name} &times;
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  )}

                  {selectedColors.length > 0 && (
                    <div className="applied-filter-group">
                      <span className="filter-group-label">Colors:</span>
                      {selectedColors.map((color) => {
                        const colorObj = availableColors.find(
                          (c) => c.name.toLowerCase() === color
                        );
                        return colorObj ? (
                          <Badge
                            key={color}
                            bg="light"
                            text="dark"
                            className="filter-badge"
                            onClick={() => toggleColor(colorObj.name)}
                          >
                            <span
                              className="color-dot"
                              style={{ backgroundColor: colorObj.value }}
                            ></span>
                            {colorObj.name} &times;
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  )}

                  {selectedSizes.length > 0 && (
                    <div className="applied-filter-group">
                      <span className="filter-group-label">Sizes:</span>
                      {selectedSizes.map((size) => (
                        <Badge
                          key={size}
                          bg="light"
                          text="dark"
                          className="filter-badge"
                          onClick={() => toggleSize(size)}
                        >
                          {size} &times;
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Button
                    variant="link"
                    className="btn-sm clear-all"
                    onClick={handleResetFilters}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}

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

        {/* Featured Collections */}
        <div className="featured-collections mt-5">
          <h2 className="section-title">Featured Collections</h2>
          <Row>
            {[
              {
                id: 1,
                name: "Summer Essentials",
                image:
                  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                url: "/clothing/collections/summer",
              },
              {
                id: 2,
                name: "Formal Wear",
                image:
                  "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                url: "/clothing/collections/formal",
              },
              {
                id: 3,
                name: "Activewear",
                image:
                  "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                url: "/clothing/collections/activewear",
              },
            ].map((collection) => (
              <Col key={collection.id} md={4} className="mb-4">
                <Link to={collection.url} className="text-decoration-none">
                  <Card className="collection-card h-100">
                    <div className="collection-img-container">
                      <Card.Img
                        variant="top"
                        src={collection.image}
                        alt={collection.name}
                      />
                      <div className="collection-overlay">
                        <h3 className="collection-title">{collection.name}</h3>
                        <span className="btn btn-outline-light mt-2">
                          Shop Now
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>

        {/* Featured products */}
        <div className="featured-products mt-5">
          <h2 className="section-title">Trending Now</h2>
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

export default ClothingPage;
