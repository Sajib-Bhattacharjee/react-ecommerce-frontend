import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faUserLock,
  faCreditCard,
  faExchangeAlt,
  faCommentAlt,
  faBan,
  faCopyright,
  faBalanceScale,
  faHandshake,
  faGavel,
  faCheck,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../hooks/useTheme";
import "./TermsPage.css";

const TermsPage: React.FC = () => {
  const { darkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Handle section visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger animation on page load
    setTimeout(() => setIsVisible(true), 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Track scroll position to highlight active section in table of contents
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = document.querySelectorAll(".policy-section");

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  // Terms sections with icons for visual appeal
  const sections = [
    { id: "introduction", title: "Introduction", icon: faHandshake },
    { id: "account", title: "Account Registration", icon: faUserLock },
    { id: "purchases", title: "Purchases", icon: faCreditCard },
    { id: "user-content", title: "User Content", icon: faCommentAlt },
    { id: "prohibited", title: "Prohibited Uses", icon: faBan },
    { id: "intellectual", title: "Intellectual Property", icon: faCopyright },
    { id: "disclaimers", title: "Disclaimers", icon: faShieldAlt },
    { id: "liability", title: "Limitation of Liability", icon: faBalanceScale },
    { id: "indemnification", title: "Indemnification", icon: faShieldAlt },
    { id: "dispute", title: "Dispute Resolution", icon: faGavel },
    { id: "termination", title: "Termination", icon: faBan },
    { id: "misc", title: "Miscellaneous", icon: faCheck },
  ];

  return (
    <div className={`terms-page ${darkMode ? "dark-theme" : ""}`}>
      {/* Hero Section with Animation */}
      <div className={`policy-hero ${isVisible ? "visible" : ""}`}>
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8} className="text-center">
              <h1>Terms and Conditions</h1>
              <p className="lead">Last Updated: April 15, 2023</p>
              <div className="hero-divider">
                <span></span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row>
          {/* Table of Contents Sidebar */}
          <Col lg={3} className="d-none d-lg-block">
            <div className="toc-container">
              <div className="toc-header">
                <h4>Contents</h4>
              </div>
              <ul className="toc-list">
                {sections.map((section) => (
                  <li
                    key={section.id}
                    className={activeSection === section.id ? "active" : ""}
                    onClick={() => scrollToSection(section.id)}
                  >
                    <FontAwesomeIcon icon={section.icon} className="me-2" />
                    <span>{section.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          {/* Main Content */}
          <Col lg={9}>
            <Card className="policy-card">
              <Card.Body>
                <section
                  id="introduction"
                  className={`policy-section ${isVisible ? "animate" : ""}`}
                >
                  <div className="section-icon-wrapper">
                    <FontAwesomeIcon
                      icon={faHandshake}
                      className="section-icon"
                    />
                  </div>
                  <h2>Introduction</h2>
                  <p>
                    These Terms and Conditions ("Terms") govern your access to
                    and use of our website, mobile applications, and services
                    (collectively, the "Services"). By accessing or using our
                    Services, you agree to be bound by these Terms. If you do
                    not agree to these Terms, do not access or use our Services.
                  </p>
                  <p>
                    We may modify these Terms at any time. If we make changes,
                    we will notify you by revising the date at the top of these
                    Terms and, in some cases, provide you with additional
                    notice. Your continued use of our Services after we make
                    changes confirms your acceptance of those changes.
                  </p>
                </section>

                <section id="account" className="policy-section">
                  <div className="section-icon-wrapper">
                    <FontAwesomeIcon
                      icon={faUserLock}
                      className="section-icon"
                    />
                  </div>
                  <h2>Account Registration</h2>
                  <p>
                    To access certain features of our Services, you may be
                    required to register for an account. When you register, you
                    must provide accurate and complete information and keep your
                    account information updated.
                  </p>
                  <p>
                    You are responsible for maintaining the confidentiality of
                    your account credentials and for all activities that occur
                    under your account. You agree to notify us immediately of
                    any unauthorized use of your account. We reserve the right
                    to close your account at any time for any or no reason.
                  </p>
                </section>

                <section id="purchases" className="policy-section">
                  <div className="section-icon-wrapper">
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      className="section-icon"
                    />
                  </div>
                  <h2>Purchases</h2>
                  <p>
                    You may purchase products through our Services. All
                    purchases are subject to these Terms.
                  </p>

                  <Accordion className="terms-accordion">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <h3 className="mb-0">Pricing and Availability</h3>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          All prices are shown in USD and do not include taxes
                          or shipping costs, which are calculated during
                          checkout. We reserve the right to change prices at any
                          time, and we do not provide price protection or
                          refunds in the event of a price drop or promotional
                          offering.
                        </p>
                        <p>
                          Product availability is not guaranteed. We reserve the
                          right to limit the quantities of any products that you
                          may purchase. We also reserve the right to discontinue
                          any product at any time.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        <h3 className="mb-0">Payment</h3>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          You agree to pay all charges at the prices in effect
                          when you place your order. You also agree to pay all
                          applicable taxes. Payment must be made through one of
                          our accepted payment methods.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        <h3 className="mb-0">Shipping</h3>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Shipping costs and delivery times are calculated
                          during checkout. We are not responsible for delays in
                          shipping or delivery due to circumstances beyond our
                          control.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        <h3 className="mb-0">Returns and Refunds</h3>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Our return and refund policy is outlined separately on
                          our website. By making a purchase through our
                          Services, you agree to be bound by that policy.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </section>

                <section id="user-content" className="policy-section">
                  <div className="section-icon-wrapper">
                    <FontAwesomeIcon
                      icon={faCommentAlt}
                      className="section-icon"
                    />
                  </div>
                  <h2>User Content</h2>
                  <p>
                    Our Services may allow you to submit content, such as
                    reviews, comments, and ratings ("User Content"). You retain
                    all rights in and to your User Content, and you grant us a
                    non-exclusive, royalty-free, worldwide, perpetual,
                    irrevocable, and fully sublicensable license to use,
                    reproduce, modify, adapt, publish, translate, create
                    derivative works from, distribute, and display such User
                    Content in connection with our Services and our business.
                  </p>
                  <p>
                    You are solely responsible for your User Content. You agree
                    not to post User Content that violates these Terms or that
                    is illegal, fraudulent, deceptive, inaccurate, misleading,
                    defamatory, obscene, or otherwise objectionable. We have the
                    right, but not the obligation, to monitor, edit, or remove
                    any User Content.
                  </p>
                </section>

                <section id="prohibited" className="policy-section">
                  <div className="section-icon-wrapper">
                    <FontAwesomeIcon icon={faBan} className="section-icon" />
                  </div>
                  <h2>Prohibited Uses</h2>
                  <p>You agree not to use our Services to:</p>
                  <div className="prohibited-list">
                    <div className="prohibited-item">
                      <div className="icon-circle">
                        <FontAwesomeIcon icon={faBan} />
                      </div>
                      <p>Violate any law, regulation, or these Terms</p>
                    </div>
                    <div className="prohibited-item">
                      <div className="icon-circle">
                        <FontAwesomeIcon icon={faBan} />
                      </div>
                      <p>Infringe on the rights of others</p>
                    </div>
                    <div className="prohibited-item">
                      <div className="icon-circle">
                        <FontAwesomeIcon icon={faBan} />
                      </div>
                      <p>Submit false or misleading information</p>
                    </div>
                    <div className="prohibited-item">
                      <div className="icon-circle">
                        <FontAwesomeIcon icon={faBan} />
                      </div>
                      <p>Upload or transmit viruses or other harmful code</p>
                    </div>
                    <div className="prohibited-item">
                      <div className="icon-circle">
                        <FontAwesomeIcon icon={faBan} />
                      </div>
                      <p>Interfere with the operation of our Services</p>
                    </div>
                    <div className="prohibited-item">
                      <div className="icon-circle">
                        <FontAwesomeIcon icon={faBan} />
                      </div>
                      <p>
                        Attempt to access areas of our Services that you are not
                        authorized to access
                      </p>
                    </div>
                  </div>
                </section>

                <section id="intellectual" className="policy-section">
                  <div className="section-icon-wrapper">
                    <FontAwesomeIcon
                      icon={faCopyright}
                      className="section-icon"
                    />
                  </div>
                  <h2>Intellectual Property</h2>
                  <p>
                    Our Services and all content, features, and functionality,
                    including but not limited to text, graphics, logos, icons,
                    images, audio clips, and software, are owned by us, our
                    licensors, or other providers and are protected by
                    copyright, trademark, patent, trade secret, and other
                    intellectual property or proprietary rights laws.
                  </p>
                  <div className="feature-list">
                    <div className="feature-item">
                      <div className="feature-icon">
                        <FontAwesomeIcon icon={faCheck} />
                      </div>
                      <div className="feature-text">
                        <p>
                          Your computer may temporarily store copies of such
                          materials in RAM incidental to your accessing and
                          viewing those materials
                        </p>
                      </div>
                    </div>
                    <div className="feature-item">
                      <div className="feature-icon">
                        <FontAwesomeIcon icon={faCheck} />
                      </div>
                      <div className="feature-text">
                        <p>
                          You may store files that are automatically cached by
                          your Web browser for display enhancement purposes
                        </p>
                      </div>
                    </div>
                    <div className="feature-item">
                      <div className="feature-icon">
                        <FontAwesomeIcon icon={faCheck} />
                      </div>
                      <div className="feature-text">
                        <p>
                          You may print or download one copy of a reasonable
                          number of pages of the website for your own personal,
                          non-commercial use and not for further reproduction,
                          publication, or distribution
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="disclaimers" className="policy-section">
                  <div className="section-icon-wrapper">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="section-icon"
                    />
                  </div>
                  <h2>Disclaimers</h2>
                  <div className="disclaimer-box">
                    <p>
                      OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE"
                      WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                      IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE
                      DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
                      IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                      PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                    </p>
                    <p>
                      WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED
                      OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT OUR
                      SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE
                      OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                    </p>
                  </div>
                </section>

                <section id="liability" className="policy-section">
                  <div className="section-icon-wrapper">
                    <FontAwesomeIcon
                      icon={faBalanceScale}
                      className="section-icon"
                    />
                  </div>
                  <h2>Limitation of Liability</h2>
                  <div className="disclaimer-box">
                    <p>
                      TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL
                      WE, OUR AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS,
                      EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR
                      DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT
                      OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE,
                      OUR SERVICES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL,
                      INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
                    </p>
                  </div>
                </section>

                <section id="indemnification" className="policy-section">
                  <div className="section-icon-wrapper">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="section-icon"
                    />
                  </div>
                  <h2>Indemnification</h2>
                  <p>
                    You agree to defend, indemnify, and hold harmless us, our
                    affiliates, licensors, and service providers, and our and
                    their respective officers, directors, employees,
                    contractors, agents, licensors, suppliers, successors, and
                    assigns from and against any claims, liabilities, damages,
                    judgments, awards, losses, costs, expenses, or fees
                    (including reasonable attorneys' fees) arising out of or
                    relating to your violation of these Terms or your use of our
                    Services.
                  </p>
                </section>

                <section id="dispute" className="policy-section">
                  <div className="section-icon-wrapper">
                    <FontAwesomeIcon icon={faGavel} className="section-icon" />
                  </div>
                  <h2>Dispute Resolution</h2>
                  <p>
                    Any dispute arising from or relating to these Terms or our
                    Services will be resolved through binding arbitration in
                    accordance with the Commercial Arbitration Rules of the
                    American Arbitration Association. The arbitration will be
                    conducted in San Francisco, California, unless you and we
                    agree otherwise. Each party will be responsible for paying
                    any filing, administrative, and arbitrator fees in
                    accordance with the arbitration rules.
                  </p>
                  <p>
                    Notwithstanding the foregoing, you may bring an individual
                    action in small claims court. This arbitration provision
                    does not preclude you from bringing issues to the attention
                    of federal, state, or local agencies.
                  </p>
                </section>

                <section id="termination" className="policy-section">
                  <div className="section-icon-wrapper">
                    <FontAwesomeIcon icon={faBan} className="section-icon" />
                  </div>
                  <h2>Termination</h2>
                  <p>
                    We may terminate or suspend your account and access to our
                    Services immediately, without prior notice or liability, for
                    any reason, including if you breach these Terms.
                  </p>
                  <p>
                    Upon termination, your right to use our Services will
                    immediately cease. All provisions of these Terms which by
                    their nature should survive termination shall survive
                    termination, including, without limitation, ownership
                    provisions, warranty disclaimers, indemnification, and
                    limitations of liability.
                  </p>
                </section>

                <section id="misc" className="policy-section">
                  <div className="section-icon-wrapper">
                    <FontAwesomeIcon icon={faCheck} className="section-icon" />
                  </div>
                  <h2>Miscellaneous</h2>
                  <p>
                    These Terms constitute the entire agreement between you and
                    us regarding your use of our Services. If any provision of
                    these Terms is held to be invalid or unenforceable, such
                    provision shall be struck and the remaining provisions shall
                    be enforced.
                  </p>
                  <p>
                    Our failure to enforce any right or provision of these Terms
                    will not be considered a waiver of those rights. The waiver
                    of any such right or provision will be effective only if in
                    writing and signed by an authorized representative of our
                    company.
                  </p>
                </section>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Scroll to top button */}
      <button
        className={`scroll-to-top ${window.scrollY > 300 ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </button>
    </div>
  );
};

export default TermsPage;
