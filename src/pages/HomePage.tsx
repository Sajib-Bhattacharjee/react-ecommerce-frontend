import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faTruck,
  faMoneyBillWave,
  faHeadset,
  faShieldAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import ProductCard from "../components/ProductCard";
import {
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  getFeaturedCategories,
  Product,
  Category,
  productToComponentFormat,
} from "../utils/mockData";
import "./HomePage.css";

// Category and brand images
const categoryImages = {
  clothing: "/images/categories/clothing.jpg",
  electronics: "/images/categories/electronics.jpg",
  home: "/images/categories/home.jpg",
  beauty: "/images/categories/beauty.jpg",
  sports: "/images/categories/sports.jpg",
  books: "/images/categories/books.jpg",
  toys: "/images/categories/toys.jpg",
  jewelry: "/images/categories/jewelry.jpg",
};

const brandLogos = [
  "/images/brands/brand1.png",
  "/images/brands/brand2.png",
  "/images/brands/brand3.png",
  "/images/brands/brand4.png",
  "/images/brands/brand5.png",
  "/images/brands/brand6.png",
];

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [featuredCategories, setFeaturedCategories] = useState<Category[]>([]);
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 10,
    minutes: 30,
    seconds: 0,
  });

  // Fetch mock data
  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts(8));
    setNewArrivals(getNewArrivals(4));
    setBestSellers(getBestSellers(4));
    setFeaturedCategories(getFeaturedCategories());

    // Countdown timer
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = { ...prevTime };

        if (newTime.seconds > 0) {
          newTime.seconds -= 1;
        } else {
          newTime.seconds = 59;

          if (newTime.minutes > 0) {
            newTime.minutes -= 1;
          } else {
            newTime.minutes = 59;

            if (newTime.hours > 0) {
              newTime.hours -= 1;
            } else {
              newTime.hours = 23;

              if (newTime.days > 0) {
                newTime.days -= 1;
              } else {
                clearInterval(interval);
              }
            }
          }
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <div className="home-page">
      {/* Hero Section with Carousel */}
      <section className="hero-section">
        <Carousel fade>
          <Carousel.Item>
            <div
              className="hero-slide"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1529720317453-c8da503f2051?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
              }}
            >
              <Container>
                <div className="hero-content">
                  <h1>New Summer Collection</h1>
                  <p>Discover the latest trends for the season</p>
                  <Link to="/shop" className="btn btn-primary">
                    Shop Now <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
              </Container>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="hero-slide"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
              }}
            >
              <Container>
                <div className="hero-content">
                  <h1>Special Offers</h1>
                  <p>Up to 50% off on selected items</p>
                  <Link to="/shop" className="btn btn-primary">
                    Shop Now <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
              </Container>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="hero-slide"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
              }}
            >
              <Container>
                <div className="hero-content">
                  <h1>New Arrivals</h1>
                  <p>Check out our latest products</p>
                  <Link to="/shop" className="btn btn-primary">
                    Shop Now <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
              </Container>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories section">
        <Container>
          <h2 className="section-title">Shop By Category</h2>
          <Row>
            {featuredCategories.map((category, index) => (
              <Col key={category.id} xs={6} md={4} lg={3}>
                <Link
                  to={`/shop?category=${category.slug}`}
                  className="category-card"
                  style={{ "--animation-index": index } as React.CSSProperties}
                >
                  <div className="category-image">
                    <img
                      src={
                        categoryImages[
                          category.slug as keyof typeof categoryImages
                        ] || category.image
                      }
                      alt={category.name}
                    />
                  </div>
                  <h3 className="category-title">{category.name}</h3>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="featured-products section">
        <Container>
          <h2 className="section-title">Featured Products</h2>
          <Row>
            {featuredProducts.map((product) => (
              <Col
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <ProductCard product={productToComponentFormat(product)} />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Link to="/shop" className="btn btn-outline">
              View All Products <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Special Deal with countdown */}
      <section className="special-deal section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="deal-content">
                <h2>Special Deal of the Week</h2>
                <p>
                  Get our premium collection at an unbeatable price. Limited
                  time offer!
                </p>
                <div className="countdown">
                  <div className="countdown-item">
                    <span className="countdown-number">{timeLeft.days}</span>
                    <span className="countdown-label">Days</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-number">{timeLeft.hours}</span>
                    <span className="countdown-label">Hours</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-number">{timeLeft.minutes}</span>
                    <span className="countdown-label">Minutes</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-number">{timeLeft.seconds}</span>
                    <span className="countdown-label">Seconds</span>
                  </div>
                </div>
                <Link to="/shop" className="btn btn-primary mt-4">
                  Shop Now <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </Col>
            <Col md={6}>
              <div className="deal-image">
                <img
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Special Deal"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* New Arrivals and Best Sellers */}
      <section className="new-best-section section">
        <Container>
          <Row>
            <Col lg={6}>
              <h2 className="section-title">New Arrivals</h2>
              <Row>
                {newArrivals.map((product) => (
                  <Col key={product.id} xs={12} sm={6} className="mb-4">
                    <ProductCard product={productToComponentFormat(product)} />
                  </Col>
                ))}
              </Row>
              <div className="text-center mt-3">
                <Link to="/shop?sort=newest" className="btn btn-outline btn-sm">
                  View All New Arrivals <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </Col>
            <Col lg={6}>
              <h2 className="section-title">Best Sellers</h2>
              <Row>
                {bestSellers.map((product) => (
                  <Col key={product.id} xs={12} sm={6} className="mb-4">
                    <ProductCard product={productToComponentFormat(product)} />
                  </Col>
                ))}
              </Row>
              <div className="text-center mt-3">
                <Link
                  to="/shop?sort=bestselling"
                  className="btn btn-outline btn-sm"
                >
                  View All Best Sellers <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="testimonials section">
        <Container>
          <h2 className="section-title">What Our Customers Say</h2>
          <Carousel indicators={false} className="testimonial-carousel">
            <Carousel.Item>
              <Row className="justify-content-center">
                <Col md={8} lg={6}>
                  <div className="testimonial-item">
                    <div className="testimonial-content">
                      <p>
                        "I absolutely love this store! The products are high
                        quality and the customer service is exceptional. Will
                        definitely be ordering again."
                      </p>
                      <div className="testimonial-author">
                        <img
                          src="https://randomuser.me/api/portraits/women/32.jpg"
                          alt="Jane Doe"
                        />
                        <div>
                          <h4>Jane Doe</h4>
                          <span>Regular Customer</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row className="justify-content-center">
                <Col md={8} lg={6}>
                  <div className="testimonial-item">
                    <div className="testimonial-content">
                      <p>
                        "Fast shipping and the product was exactly as described.
                        The website is so easy to navigate and find what I'm
                        looking for."
                      </p>
                      <div className="testimonial-author">
                        <img
                          src="https://randomuser.me/api/portraits/men/46.jpg"
                          alt="John Smith"
                        />
                        <div>
                          <h4>John Smith</h4>
                          <span>Happy Shopper</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row className="justify-content-center">
                <Col md={8} lg={6}>
                  <div className="testimonial-item">
                    <div className="testimonial-content">
                      <p>
                        "The quality of the products exceeded my expectations.
                        Great prices and even better service. Highly recommend!"
                      </p>
                      <div className="testimonial-author">
                        <img
                          src="https://randomuser.me/api/portraits/women/65.jpg"
                          alt="Sarah Johnson"
                        />
                        <div>
                          <h4>Sarah Johnson</h4>
                          <span>Verified Buyer</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>
          </Carousel>
        </Container>
      </section>

      {/* Services */}
      <section className="services-section section">
        <Container>
          <Row>
            <Col md={3} sm={6}>
              <div className="service-item">
                <FontAwesomeIcon icon={faTruck} className="service-icon" />
                <h4>Free Shipping</h4>
                <p>On orders over $50</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="service-item">
                <FontAwesomeIcon
                  icon={faMoneyBillWave}
                  className="service-icon"
                />
                <h4>Money Back</h4>
                <p>30 days guarantee</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="service-item">
                <FontAwesomeIcon icon={faHeadset} className="service-icon" />
                <h4>24/7 Support</h4>
                <p>Dedicated support</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="service-item">
                <FontAwesomeIcon icon={faShieldAlt} className="service-icon" />
                <h4>Secure Payment</h4>
                <p>100% secure checkout</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Brand Logos */}
      <section className="brands-section section">
        <Container>
          <h2 className="section-title">Our Trusted Brands</h2>
          <div className="brand-logos">
            {brandLogos.map((logo, index) => (
              <div
                key={logo}
                className="brand-logo"
                style={{ "--index": index } as React.CSSProperties}
              >
                <img src={logo} alt={`Brand ${index + 1}`} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="newsletter-content">
                <h2>Subscribe to Our Newsletter</h2>
                <p>Stay updated with our latest offers, products, and news.</p>
                <Form onSubmit={handleEmailSubmit} className="newsletter-form">
                  <div className="d-flex">
                    <Form.Control
                      type="email"
                      placeholder="Your email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant="primary" type="submit">
                      <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                      Subscribe
                    </Button>
                  </div>
                </Form>
                <div className="newsletter-social">
                  <h4>Follow Us:</h4>
                  <div className="social-icons">
                    <a href="#" aria-label="Facebook">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" aria-label="Twitter">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#" aria-label="Instagram">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="#" aria-label="YouTube">
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="newsletter-image">
                <img
                  src="https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Newsletter"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
