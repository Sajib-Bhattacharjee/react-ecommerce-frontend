import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Spinner,
  Badge,
  Form,
  ToggleButton,
  ButtonGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendar,
  faUser,
  faTags,
  faSearch,
  faFilter,
  faMoon,
  faSun,
  faSort,
  faListUl,
  faThLarge,
  faInfo,
  faEye,
  faFire,
  faHeart,
  faBookmark,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../hooks/useTheme";
import "./BlogPage.css";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  views?: number;
  likes?: number;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of E-commerce: Trends to Watch in 2024",
    excerpt:
      "Discover the latest trends shaping the e-commerce landscape and how they'll impact your business.",
    content: "Full blog post content here...",
    author: "John Doe",
    date: "2024-03-15",
    image:
      "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "E-commerce",
    tags: ["trends", "2024", "future"],
    views: 1250,
    likes: 84,
  },
  {
    id: 2,
    title: "Sustainable Shopping: How to Make Eco-Friendly Choices",
    excerpt:
      "Learn about sustainable shopping practices and how to make environmentally conscious decisions.",
    content: "Full blog post content here...",
    author: "Jane Smith",
    date: "2024-03-10",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827a52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Sustainability",
    tags: ["eco-friendly", "sustainability", "shopping"],
    views: 950,
    likes: 102,
  },
  {
    id: 3,
    title: "Top 10 Must-Have Products for Spring 2024",
    excerpt:
      "Check out our curated list of essential products for the upcoming spring season.",
    content: "Full blog post content here...",
    author: "Mike Johnson",
    date: "2024-03-05",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Seasonal",
    tags: ["spring", "2024", "must-have"],
    views: 1440,
    likes: 67,
  },
  {
    id: 4,
    title: "How to Build a Customer-Centric E-commerce Strategy",
    excerpt:
      "Learn effective strategies to put your customers at the center of your e-commerce business.",
    content: "Full blog post content here...",
    author: "Sarah Williams",
    date: "2024-02-28",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Business Strategy",
    tags: ["customer-centric", "strategy", "e-commerce"],
    views: 2100,
    likes: 156,
  },
  {
    id: 5,
    title: "Mobile Shopping Trends: What Consumers Want in 2024",
    excerpt:
      "Explore the latest mobile shopping trends and learn how to optimize your mobile experience.",
    content: "Full blog post content here...",
    author: "David Chen",
    date: "2024-02-20",
    image:
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Mobile",
    tags: ["mobile", "trends", "user-experience"],
    views: 1780,
    likes: 98,
  },
];

type SortOption = "newest" | "oldest" | "popular" | "trending";
type ViewMode = "grid" | "list";

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { darkMode, toggleDarkMode } = useTheme();
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);

  // Load liked and saved posts from localStorage
  useEffect(() => {
    const savedLikedPosts = localStorage.getItem("likedPosts");
    const savedSavedPosts = localStorage.getItem("savedPosts");

    if (savedLikedPosts) {
      setLikedPosts(JSON.parse(savedLikedPosts));
    }

    if (savedSavedPosts) {
      setSavedPosts(JSON.parse(savedSavedPosts));
    }
  }, []);

  // Save liked and saved posts to localStorage
  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
  }, [savedPosts]);

  // Fetch posts
  useEffect(() => {
    try {
      // Simulate API call
      setTimeout(() => {
        setPosts(mockBlogPosts);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to load blog posts. Please try again later.");
      setLoading(false);
    }
  }, []);

  // Animation when changing view mode or sorting
  useEffect(() => {
    if (posts.length > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [viewMode, sortBy, posts.length]);

  // Filter posts based on search term and category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory = selectedCategory
      ? post.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  // Sort posts based on selected option
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "popular":
        return (b.views || 0) - (a.views || 0);
      case "trending":
        return (b.likes || 0) - (a.likes || 0);
      default:
        return 0;
    }
  });

  // Get unique categories
  const categoriesSet = new Set<string>();
  posts.forEach((post) => categoriesSet.add(post.category));
  const categories = Array.from(categoriesSet);

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleSave = (postId: number) => {
    setSavedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    scrollToTop();
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center loader-container">
        <div className="loading-animation">
          <Spinner animation="border" role="status" className="custom-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 loading-text">Loading amazing blog posts...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center error-container">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Button
          variant="primary"
          className="pulse-button"
          onClick={() => (window.location.href = "/")}
        >
          Return Home <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </Container>
    );
  }

  return (
    <div
      className={`blog-page ${
        darkMode ? "dark-mode dark-theme" : "light-mode"
      }`}
      ref={topRef}
    >
      <div className="theme-toggle" onClick={toggleDarkMode}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
      </div>

      <div className="hero-section">
        <Container>
          <div className="hero-content">
            <h1 className="animated-title">Our Blog</h1>
            <p>Insights, trends, and stories from the world of e-commerce</p>

            <div className="search-container">
              <div className="search-bar">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-dropdown">
                <FontAwesomeIcon icon={faFilter} className="filter-icon" />
                <select
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="filter-select"
                  value={selectedCategory || ""}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-5 main-content">
        {sortedPosts.length > 0 && (
          <div className="blog-controls mb-4">
            <div className="view-options">
              <ButtonGroup>
                <ToggleButton
                  id="view-grid"
                  type="radio"
                  variant={darkMode ? "outline-light" : "outline-dark"}
                  name="view-mode"
                  value="grid"
                  checked={viewMode === "grid"}
                  onChange={() => handleViewModeChange("grid")}
                  className="view-btn"
                  aria-label="Grid view"
                >
                  <FontAwesomeIcon icon={faThLarge} />
                </ToggleButton>
                <ToggleButton
                  id="view-list"
                  type="radio"
                  variant={darkMode ? "outline-light" : "outline-dark"}
                  name="view-mode"
                  value="list"
                  checked={viewMode === "list"}
                  onChange={() => handleViewModeChange("list")}
                  className="view-btn"
                  aria-label="List view"
                >
                  <FontAwesomeIcon icon={faListUl} />
                </ToggleButton>
              </ButtonGroup>
            </div>
            <div className="sort-options">
              <span className="sort-label">
                <FontAwesomeIcon icon={faSort} className="sort-icon" /> Sort by:
              </span>
              <ButtonGroup className="sort-buttons">
                <ToggleButton
                  id="sort-newest"
                  type="radio"
                  variant={darkMode ? "outline-light" : "outline-dark"}
                  name="sort"
                  value="newest"
                  checked={sortBy === "newest"}
                  onChange={() => handleSortChange("newest")}
                  className="sort-btn"
                >
                  Newest
                </ToggleButton>
                <ToggleButton
                  id="sort-oldest"
                  type="radio"
                  variant={darkMode ? "outline-light" : "outline-dark"}
                  name="sort"
                  value="oldest"
                  checked={sortBy === "oldest"}
                  onChange={() => handleSortChange("oldest")}
                  className="sort-btn"
                >
                  Oldest
                </ToggleButton>
                <ToggleButton
                  id="sort-popular"
                  type="radio"
                  variant={darkMode ? "outline-light" : "outline-dark"}
                  name="sort"
                  value="popular"
                  checked={sortBy === "popular"}
                  onChange={() => handleSortChange("popular")}
                  className="sort-btn"
                >
                  Popular
                </ToggleButton>
                <ToggleButton
                  id="sort-trending"
                  type="radio"
                  variant={darkMode ? "outline-light" : "outline-dark"}
                  name="sort"
                  value="trending"
                  checked={sortBy === "trending"}
                  onChange={() => handleSortChange("trending")}
                  className="sort-btn"
                >
                  Trending
                </ToggleButton>
              </ButtonGroup>
            </div>
          </div>
        )}

        {/* Featured Post */}
        {sortedPosts.length > 0 && (
          <div className="featured-post mb-5">
            <h2 className="section-title">Featured Post</h2>
            <div className="featured-post-card">
              <Row className="g-0">
                <Col xs={12} md={6} className="featured-post-image">
                  <Badge className="category-badge">
                    {sortedPosts[0].category}
                  </Badge>
                  <img
                    src={sortedPosts[0].image}
                    alt={sortedPosts[0].title}
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </Col>
                <Col xs={12} md={6} className="featured-post-content">
                  <div className="post-meta flex-wrap">
                    <span className="me-3 mb-2">
                      <FontAwesomeIcon icon={faUser} /> {sortedPosts[0].author}
                    </span>
                    <span className="me-3 mb-2">
                      <FontAwesomeIcon icon={faCalendar} />{" "}
                      {new Date(sortedPosts[0].date).toLocaleDateString()}
                    </span>
                    {sortedPosts[0].views && (
                      <span className="mb-2">
                        <FontAwesomeIcon icon={faEye} /> {sortedPosts[0].views}{" "}
                        views
                      </span>
                    )}
                  </div>
                  <h2 className="post-title-large">{sortedPosts[0].title}</h2>
                  <p className="post-excerpt-large">{sortedPosts[0].excerpt}</p>
                  <div className="post-tags">
                    <FontAwesomeIcon icon={faTags} />
                    {sortedPosts[0].tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="action-buttons flex-wrap">
                    <a
                      href={`/blog/${sortedPosts[0].id}`}
                      className="btn btn-primary read-more-btn mb-2"
                    >
                      Read Full Article <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                    <div className="featured-interactions">
                      <button
                        className={`interaction-btn like-btn ${
                          likedPosts.includes(sortedPosts[0].id) ? "active" : ""
                        }`}
                        onClick={() => toggleLike(sortedPosts[0].id)}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                        <span className="count">
                          {sortedPosts[0].likes || 0}
                        </span>
                      </button>
                      <button
                        className={`interaction-btn save-btn ${
                          savedPosts.includes(sortedPosts[0].id) ? "active" : ""
                        }`}
                        onClick={() => toggleSave(sortedPosts[0].id)}
                      >
                        <FontAwesomeIcon icon={faBookmark} />
                      </button>
                      <button className="interaction-btn share-btn">
                        <FontAwesomeIcon icon={faShareAlt} />
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}

        {/* Blog Grid or List */}
        {sortedPosts.length > 1 && (
          <div className="blog-grid">
            <h2 className="section-title">Latest Posts</h2>
            <div className="blog-grid-container">
              <Row
                className={`blog-row ${isAnimating ? "animating" : ""} ${
                  viewMode === "list" ? "list-view" : ""
                }`}
              >
                {sortedPosts.slice(1).map((post) => (
                  <Col
                    key={post.id}
                    xs={12}
                    sm={viewMode === "list" ? 12 : 6}
                    lg={viewMode === "list" ? 12 : 4}
                    className={`blog-col mb-4 ${
                      viewMode === "list" ? "list-col" : ""
                    }`}
                  >
                    <div
                      className={`blog-post-card h-100 ${
                        viewMode === "list" ? "list-card" : ""
                      }`}
                    >
                      <div className="post-image">
                        <Badge className="category-badge">
                          {post.category}
                        </Badge>
                        <div className="hover-overlay">
                          <div className="hover-actions">
                            <button
                              onClick={() => toggleLike(post.id)}
                              className="hover-action-btn"
                            >
                              <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <button
                              onClick={() => toggleSave(post.id)}
                              className="hover-action-btn"
                            >
                              <FontAwesomeIcon icon={faBookmark} />
                            </button>
                            <a
                              href={`/blog/${post.id}`}
                              className="hover-action-btn"
                            >
                              <FontAwesomeIcon icon={faInfo} />
                            </a>
                          </div>
                        </div>
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          className="img-fluid w-100"
                        />
                      </div>
                      <div className="post-content">
                        <div className="post-meta flex-wrap">
                          <span className="me-2 mb-2">
                            <FontAwesomeIcon icon={faUser} /> {post.author}
                          </span>
                          <span className="me-2 mb-2">
                            <FontAwesomeIcon icon={faCalendar} />{" "}
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                          {post.views && (
                            <span className="view-count mb-2">
                              <FontAwesomeIcon icon={faEye} /> {post.views}
                            </span>
                          )}
                        </div>
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-excerpt">{post.excerpt}</p>
                        <div className="post-tags">
                          <FontAwesomeIcon icon={faTags} />
                          {post.tags.map((tag) => (
                            <span key={tag} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="card-footer">
                          <a
                            href={`/blog/${post.id}`}
                            className="btn btn-primary read-more-btn"
                          >
                            Read More <FontAwesomeIcon icon={faArrowRight} />
                          </a>
                          <div className="interaction-buttons">
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip>
                                  {likedPosts.includes(post.id)
                                    ? "Unlike"
                                    : "Like"}
                                </Tooltip>
                              }
                            >
                              <button
                                className={`icon-btn ${
                                  likedPosts.includes(post.id) ? "active" : ""
                                }`}
                                onClick={() => toggleLike(post.id)}
                              >
                                <FontAwesomeIcon icon={faHeart} />
                                <span className="count">{post.likes || 0}</span>
                              </button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip>
                                  {savedPosts.includes(post.id)
                                    ? "Unsave"
                                    : "Save"}
                                </Tooltip>
                              }
                            >
                              <button
                                className={`icon-btn ${
                                  savedPosts.includes(post.id) ? "active" : ""
                                }`}
                                onClick={() => toggleSave(post.id)}
                              >
                                <FontAwesomeIcon icon={faBookmark} />
                              </button>
                            </OverlayTrigger>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        )}

        {sortedPosts.length === 0 && (
          <div className="text-center py-5 no-results">
            <div className="no-results-icon">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <h3>No blog posts found</h3>
            <p>Try adjusting your search criteria or browse all posts</p>
            <Button
              variant="primary"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory(null);
              }}
              className="reset-filters-btn"
            >
              Reset Filters <FontAwesomeIcon icon={faFilter} />
            </Button>
          </div>
        )}
      </Container>

      {/* Back to top button */}
      <button className="back-to-top" onClick={scrollToTop}>
        <FontAwesomeIcon icon={faArrowRight} className="rotate-icon" />
      </button>
    </div>
  );
};

export default BlogPage;
