import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faHandshake,
  faLeaf,
  faUsers,
  faGlobe,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import PageHeader from "../components/PageHeader";
import "../styles/InfoPages.css";
import { useTheme } from "../hooks/useTheme";

const AboutPage: React.FC = () => {
  const { darkMode } = useTheme();

  // Company values
  const values = [
    {
      icon: faShieldAlt,
      title: "Quality",
      description:
        "We are committed to offering only the highest quality products that meet our rigorous standards for performance, durability, and value.",
    },
    {
      icon: faHandshake,
      title: "Integrity",
      description:
        "We conduct our business with honesty, transparency, and ethical practices, building trust with our customers, partners, and employees.",
    },
    {
      icon: faLeaf,
      title: "Sustainability",
      description:
        "We strive to minimize our environmental footprint through responsible sourcing, eco-friendly packaging, and sustainable business practices.",
    },
    {
      icon: faUsers,
      title: "Customer Focus",
      description:
        "Our customers are at the center of everything we do. We listen to their needs and continuously improve our products and services to exceed their expectations.",
    },
    {
      icon: faGlobe,
      title: "Innovation",
      description:
        "We embrace innovation and technology to create better shopping experiences and bring cutting-edge products to our customers.",
    },
    {
      icon: faHeart,
      title: "Community",
      description:
        "We believe in giving back to the communities we serve through charitable initiatives, partnerships, and volunteer efforts.",
    },
  ];

  // Team members
  const teamMembers = [
    {
      name: "Sarah Johnson",
      position: "Chief Executive Officer",
      image: "/images/public/images/team/ceo.jpg",
      bio: "Sarah brings over 20 years of experience in retail and e-commerce leadership. She founded SBC Express with a vision to create a customer-centric shopping destination.",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Michael Chen",
      position: "Chief Technology Officer",
      image: "/images/public/images/team/cto.jpg",
      bio: "Michael leads our technology initiatives, focusing on creating seamless shopping experiences and implementing innovative solutions for our customers.",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "David Rodriguez",
      position: "Head of Operations",
      image: "/images/public/images/team/operations.jpg",
      bio: "David oversees our global supply chain and operations, ensuring efficient fulfillment and delivery of products to customers worldwide.",
      social: {
        linkedin: "#",
      },
    },
    {
      name: "Aisha Patel",
      position: "Creative Director",
      image: "/images/public/images/team/creative.jpg",
      bio: "Aisha leads our creative team, shaping the brand identity and ensuring a consistent and engaging visual experience across all touchpoints.",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
  ];

  // Company milestones
  const milestones = [
    {
      year: 2010,
      title: "Company Founded",
      description:
        "SBC Express was founded with a mission to provide quality products with exceptional customer service.",
    },
    {
      year: 2013,
      title: "First Physical Store",
      description:
        "We opened our first flagship store in downtown Seattle, bringing our online experience to a brick-and-mortar location.",
    },
    {
      year: 2015,
      title: "International Expansion",
      description:
        "We expanded our operations to serve customers in Canada, Europe, and Australia, marking our first step toward global presence.",
    },
    {
      year: 2018,
      title: "Sustainability Initiative",
      description:
        "We launched our comprehensive sustainability program, committing to reduce our carbon footprint and implement eco-friendly practices.",
    },
    {
      year: 2020,
      title: "Mobile App Launch",
      description:
        "Our award-winning mobile app was released, providing customers with a seamless shopping experience on the go.",
    },
    {
      year: 2023,
      title: "10 Million Customers",
      description:
        "We proudly reached the milestone of serving over 10 million customers worldwide, a testament to our commitment to excellence.",
    },
  ];

  return (
    <>
      <PageHeader
        title="About SBC Express"
        description="Learn about our story, mission, and the people behind our success."
        bgImage="/images/public/images/about-header.jpg"
      />

      <div className={`info-page ${darkMode ? "dark-theme" : ""}`}>
        <Container>
          <Row className="mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="info-title">Our Story</h2>
              <p className="info-text">
                Founded in 2010, SBC Express began as a small online store with
                a big vision: to create a shopping destination that combines
                quality products, competitive prices, and exceptional customer
                service. What started as a passion project in a small apartment
                has grown into a global e-commerce platform serving millions of
                customers worldwide.
              </p>
              <p className="info-text">
                Our journey has been driven by a relentless focus on customer
                satisfaction and continuous innovation. We've expanded our
                product range, improved our technology, and refined our
                operations to create a seamless shopping experience that keeps
                our customers coming back.
              </p>
              <p className="info-text">
                Today, SBC Express offers thousands of products across multiple
                categories, from electronics and home goods to fashion and
                beauty. Despite our growth, we remain committed to the core
                values that defined us from day one: quality, integrity, and
                customer focus.
              </p>
            </Col>
            <Col lg={6}>
              <div className="position-relative h-100">
                <img
                  src="/images/public/images/about-story.jpg"
                  alt="SBC Express Headquarters"
                  className="img-fluid rounded shadow-lg"
                  style={{ objectFit: "cover", height: "100%", width: "100%" }}
                />
                <div className="story-image-decoration"></div>
              </div>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={12} className="text-center mb-4">
              <h2 className="info-title">Our Mission</h2>
              <p className="info-text mx-auto" style={{ maxWidth: "800px" }}>
                At SBC Express, our mission is to empower consumers by providing
                access to quality products that enhance their lives, delivered
                with exceptional service and value. We strive to create a
                shopping experience that is not only convenient but also
                enjoyable and trustworthy.
              </p>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={12} className="text-center mb-4">
              <h2 className="info-title">Our Values</h2>
              <p className="info-text mx-auto" style={{ maxWidth: "800px" }}>
                These core values guide our decisions, shape our culture, and
                define how we interact with our customers, partners, and
                communities.
              </p>
            </Col>
            {values.map((value, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card className="info-card h-100">
                  <Card.Body className="text-center">
                    <FontAwesomeIcon icon={value.icon} className="info-icon" />
                    <h3 className="info-subtitle">{value.title}</h3>
                    <p className="info-text">{value.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="mb-5">
            <Col lg={12} className="text-center mb-4">
              <h2 className="info-title">Our Journey</h2>
              <p className="info-text mx-auto" style={{ maxWidth: "800px" }}>
                Key milestones in our growth from a small startup to a global
                e-commerce destination.
              </p>
            </Col>
            <Col lg={12}>
              <div className="position-relative">
                {/* Timeline line */}
                <div className="timeline-line"></div>

                {/* Timeline events */}
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`row mb-5 position-relative ${
                      index % 2 === 0 ? "" : "flex-row-reverse"
                    }`}
                  >
                    <div className="col-md-5">
                      <div
                        className={`timeline-card p-4 rounded shadow-sm ${
                          index % 2 === 0
                            ? "text-end me-md-4 timeline-right"
                            : "text-start ms-md-4 timeline-left"
                        }`}
                      >
                        <h3 className="info-subtitle">{milestone.title}</h3>
                        <p className="text-muted mb-2">{milestone.year}</p>
                        <p className="info-text mb-0">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-2 text-center">
                      <div className="timeline-year">{milestone.year}</div>
                    </div>
                    <div className="col-md-5"></div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={12} className="text-center mb-4">
              <h2 className="info-title">Our Leadership Team</h2>
              <p className="info-text mx-auto" style={{ maxWidth: "800px" }}>
                Meet the dedicated professionals who lead SBC Express, bringing
                diverse expertise and a shared passion for excellence.
              </p>
            </Col>
            {teamMembers.map((member, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="info-card team-member-card h-100">
                  <div
                    style={{
                      height: "200px",
                      overflow: "hidden",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="img-fluid w-100"
                      style={{ objectFit: "cover", height: "100%" }}
                    />
                  </div>
                  <Card.Body className="text-center">
                    <h3 className="info-subtitle mb-1">{member.name}</h3>
                    <p
                      className="text-muted team-member-position mb-3"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {member.position}
                    </p>
                    <p className="info-text">{member.bio}</p>
                    <div className="mt-3">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="me-2 text-muted"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon
                            icon={faLinkedin}
                            size="lg"
                            className="social-icon"
                          />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          className="me-2 text-muted"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon
                            icon={faTwitter}
                            size="lg"
                            className="social-icon"
                          />
                        </a>
                      )}
                      {member.social.instagram && (
                        <a
                          href={member.social.instagram}
                          className="me-2 text-muted"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon
                            icon={faInstagram}
                            size="lg"
                            className="social-icon"
                          />
                        </a>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="position-relative h-100">
                <img
                  src="/images/public/images/about-community.jpg"
                  alt="Community Involvement"
                  className="img-fluid rounded shadow-lg"
                  style={{ objectFit: "cover", height: "100%", width: "100%" }}
                />
                <div className="community-image-decoration"></div>
              </div>
            </Col>
            <Col lg={6}>
              <h2 className="info-title">Community & Sustainability</h2>
              <p className="info-text">
                We believe in the power of business to create positive change.
                That's why we're committed to giving back to the communities we
                serve and implementing sustainable practices throughout our
                operations.
              </p>
              <p className="info-text">
                Our community initiatives include partnerships with local
                charities, volunteer programs for our employees, and donation
                drives to support causes that align with our values. We also
                sponsor educational programs to help develop the next generation
                of entrepreneurs and innovators.
              </p>
              <p className="info-text">
                On the sustainability front, we're taking concrete steps to
                reduce our environmental impact. This includes transitioning to
                eco-friendly packaging, optimizing our logistics to reduce
                carbon emissions, and partnering with suppliers who share our
                commitment to sustainable practices.
              </p>
              <p className="info-text">
                We know we still have work to do, but we're dedicated to making
                progress every day toward a more sustainable and equitable
                future.
              </p>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={8} className="mx-auto text-center">
              <h3 className="info-subtitle">Join Our Team</h3>
              <p className="info-text">
                We're always looking for talented individuals who share our
                passion for excellence and innovation. Explore career
                opportunities at SBC Express and be part of our exciting
                journey.
              </p>
              <a href="/careers" className="btn btn-primary btn-lg">
                View Careers
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AboutPage;
