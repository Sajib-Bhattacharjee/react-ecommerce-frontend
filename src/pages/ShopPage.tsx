import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Pagination,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faTh,
  faList,
  faArrowUp,
  faArrowDown,
  faStar,
  faStarHalfAlt,
  faTimes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  getProducts,
  getCategories,
  getBrands,
  Product,
  Category,
  Brand,
  productToComponentFormat,
} from "../utils/mockData";
import ProductCard from "../components/product/ProductCard";
import ProductGrid from "../components/product/ProductGrid";
import ProductQuickView from "../components/product/ProductQuickView";
import "./ShopPage.css";

// Available colors for filtering
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

const ShopPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // State for filters
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [view, setView] = useState<"grid" | "list">(
    queryParams.get("view") === "list" ? "list" : "grid"
  );
  const [sort, setSort] = useState(queryParams.get("sort") || "popularity");
  const [currentPage, setCurrentPage] = useState(
    parseInt(queryParams.get("page") || "1")
  );
  const [priceRange, setPriceRange] = useState({
    min: parseInt(queryParams.get("min") || "0"),
    max: parseInt(queryParams.get("max") || "1000"),
  });
  const [selectedCategory, setSelectedCategory] = useState(
    queryParams.get("category") || ""
  );
  const [selectedBrand, setSelectedBrand] = useState(
    queryParams.get("brand") || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    queryParams.get("color") || ""
  );
  const [selectedRating, setSelectedRating] = useState(
    parseInt(queryParams.get("rating") || "0")
  );
  const [searchTerm, setSearchTerm] = useState(queryParams.get("search") || "");
  const [showFilters, setShowFilters] = useState(false);

  // Quick view modal state
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [showQuickView, setShowQuickView] = useState(false);

  const productsPerPage = 12;
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Fetch data from mock API
  useEffect(() => {
    // Get products with filter
    const filteredProducts = getProducts();
    setProducts(filteredProducts);

    // Get categories and brands
    setCategories(getCategories());
    setBrands(getBrands());
  }, []);

  // Apply filters and update URL when filter changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (view === "list") params.append("view", "list");
    if (sort !== "popularity") params.append("sort", sort);
    if (currentPage > 1) params.append("page", currentPage.toString());
    if (priceRange.min > 0) params.append("min", priceRange.min.toString());
    if (priceRange.max < 1000) params.append("max", priceRange.max.toString());
    if (selectedCategory) params.append("category", selectedCategory);
    if (selectedBrand) params.append("brand", selectedBrand);
    if (selectedColor) params.append("color", selectedColor);
    if (selectedRating > 0) params.append("rating", selectedRating.toString());
    if (searchTerm) params.append("search", searchTerm);

    navigate({ search: params.toString() }, { replace: true });

    // Filter products based on selected filters
    let filtered = getProducts();

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      const categoryObj = categories.find(
        (cat) => cat.slug === selectedCategory
      );
      if (categoryObj) {
        filtered = filtered.filter(
          (product) => product.category_id === categoryObj.id
        );
      }
    }

    // Apply brand filter
    if (selectedBrand) {
      const brandObj = brands.find((brand) => brand.slug === selectedBrand);
      if (brandObj) {
        filtered = filtered.filter(
          (product) => product.brand_id === brandObj.id
        );
      }
    }

    // Apply color filter
    if (selectedColor) {
      filtered = filtered.filter(
        (product) =>
          product.colors &&
          product.colors.some(
            (color: string) =>
              color.toLowerCase() === selectedColor.toLowerCase()
          )
      );
    }

    // Apply rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter(
        (product) => product.ratings >= selectedRating
      );
    }

    // Apply price range filter
    filtered = filtered.filter((product) => {
      const price = product.discount_price
        ? product.discount_price
        : product.price;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Apply sort
    switch (sort) {
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = a.discount_price ? a.discount_price : a.price;
          const priceB = b.discount_price ? b.discount_price : b.price;
          return priceA - priceB;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = a.discount_price ? a.discount_price : a.price;
          const priceB = b.discount_price ? b.discount_price : b.price;
          return priceB - priceA;
        });
        break;
      case "newest":
        filtered.sort((a, b) =>
          b.new_arrival === a.new_arrival ? 0 : b.new_arrival ? 1 : -1
        );
        break;
      case "rating":
        filtered.sort((a, b) => b.ratings - a.ratings);
        break;
      case "bestselling":
        filtered.sort((a, b) =>
          b.bestseller === a.bestseller ? 0 : b.bestseller ? 1 : -1
        );
        break;
      default: // popularity
        filtered.sort((a, b) => b.reviews_count - a.reviews_count);
    }

    setProducts(filtered);
  }, [
    sort,
    currentPage,
    selectedCategory,
    selectedBrand,
    selectedColor,
    selectedRating,
    searchTerm,
    priceRange,
    view,
    navigate,
  ]);

  // Calculate current products based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedColor("");
    setSelectedRating(0);
    setPriceRange({ min: 0, max: 1000 });
    setSearchTerm("");
    setSort("popularity");
    setCurrentPage(1);
  };

  // Toggle filter sidebar on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Quick view handlers
  const handleQuickView = (product: any) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  const handleCloseQuickView = () => {
    setShowQuickView(false);
    setQuickViewProduct(null);
  };

  // Generate pagination items
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  // Render stars for rating filter
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

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

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
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

  return (
    <div className="shop-page">
      <Container>
        <div className="shop-header">
          <h1 className="shop-title">Shop</h1>
          <div className="shop-actions d-flex justify-content-between align-items-center flex-wrap">
            <div className="shop-filter-toggle d-md-none">
              <Button variant="outline-primary" onClick={toggleFilters}>
                <FontAwesomeIcon icon={faFilter} /> Filters
              </Button>
            </div>
            <div className="shop-search">
              <Form onSubmit={handleSearch}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" variant="primary">
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </InputGroup>
              </Form>
            </div>
            <div className="shop-view-options d-flex align-items-center">
              <span className="me-2">View:</span>
              <div className="btn-group">
                <Button
                  variant={view === "grid" ? "primary" : "outline-primary"}
                  onClick={() => setView("grid")}
                >
                  <FontAwesomeIcon icon={faTh} />
                </Button>
                <Button
                  variant={view === "list" ? "primary" : "outline-primary"}
                  onClick={() => setView("list")}
                >
                  <FontAwesomeIcon icon={faList} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Row>
          {/* Sidebar Filters */}
          <Col md={3} className={`shop-sidebar ${showFilters ? "show" : ""}`}>
            {showFilters && (
              <Button
                variant="link"
                className="d-md-none close-filter-btn position-absolute top-0 end-0 p-3"
                onClick={toggleFilters}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            )}

            <div className="filter-section">
              <h4>Sort By</h4>
              <Form.Select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Average Rating</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="bestselling">Best Selling</option>
              </Form.Select>
            </div>

            <div className="filter-section">
              <h4>Categories</h4>
              <div className="filter-list">
                {categories.map((category) => (
                  <Form.Check
                    key={category.id}
                    type="radio"
                    id={`category-${category.id}`}
                    label={category.name}
                    name="category"
                    checked={selectedCategory === category.slug}
                    onChange={() => setSelectedCategory(category.slug)}
                  />
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Brands</h4>
              <div className="filter-list">
                {brands.map((brand) => (
                  <Form.Check
                    key={brand.id}
                    type="radio"
                    id={`brand-${brand.id}`}
                    label={brand.name}
                    name="brand"
                    checked={selectedBrand === brand.slug}
                    onChange={() => setSelectedBrand(brand.slug)}
                  />
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Colors</h4>
              <div className="color-filter-list">
                {availableColors.map((color) => (
                  <div
                    key={color.value}
                    className={`color-filter-item ${
                      selectedColor === color.name.toLowerCase() ? "active" : ""
                    }`}
                    onClick={() =>
                      setSelectedColor(
                        selectedColor === color.name.toLowerCase()
                          ? ""
                          : color.name.toLowerCase()
                      )
                    }
                  >
                    <div
                      className="color-swatch"
                      style={{ backgroundColor: color.value }}
                    >
                      {selectedColor === color.name.toLowerCase() && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="check-icon"
                        />
                      )}
                    </div>
                    <span className="color-name">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Price Range</h4>
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
            </div>

            <div className="filter-section">
              <h4>Rating</h4>
              <div className="filter-list">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div
                    key={rating}
                    className={`rating-item ${
                      selectedRating === rating ? "active" : ""
                    }`}
                    onClick={() =>
                      setSelectedRating(selectedRating === rating ? 0 : rating)
                    }
                  >
                    <div className="rating-stars">{renderStars(rating)}</div>
                    <span className="rating-text">& Up</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline-secondary"
              className="w-100 mt-3"
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          </Col>

          {/* Product Grid */}
          <Col md={9}>
            <div className="shop-results">
              <div className="results-count">
                <p>
                  Showing {indexOfFirstProduct + 1}-
                  {Math.min(indexOfLastProduct, products.length)} of{" "}
                  {products.length} products
                </p>
              </div>

              {products.length === 0 ? (
                <div className="no-results">
                  <h3>No products found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <>
                  {view === "grid" ? (
                    <ProductGrid
                      products={currentProducts.map(productToComponentFormat)}
                      cols={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                      onQuickView={handleQuickView}
                    />
                  ) : (
                    <div className="product-list">
                      {currentProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={productToComponentFormat(product)}
                          layout="list"
                          onQuickView={handleQuickView}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              {totalPages > 1 && (
                <div className="shop-pagination">
                  <Pagination>
                    <Pagination.Prev
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    />
                    {paginationItems}
                    <Pagination.Next
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          show={showQuickView}
          onHide={handleCloseQuickView}
        />
      )}

      {/* Overlay for mobile filters */}
      {showFilters && (
        <div className="filter-overlay d-md-none" onClick={toggleFilters}></div>
      )}
    </div>
  );
};

export default ShopPage;
