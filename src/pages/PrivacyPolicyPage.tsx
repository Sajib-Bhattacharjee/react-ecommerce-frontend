import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./PrivacyPolicyPage.css";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="privacy-policy-page">
      <div className="policy-hero">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8} className="text-center">
              <h1>Privacy Policy</h1>
              <p className="lead">Last Updated: April 15, 2023</p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="policy-card">
              <Card.Body>
                <section className="policy-section">
                  <h2>Introduction</h2>
                  <p>
                    This Privacy Policy describes how we collect, use, and share
                    information when you use our website, mobile applications,
                    and services (collectively, the "Services"). Your privacy is
                    important to us, and we are committed to protecting the
                    information you share with us.
                  </p>
                  <p>
                    By using our Services, you agree to the collection, use, and
                    sharing of your information as described in this Privacy
                    Policy. If you do not agree with our policies and practices,
                    do not use our Services.
                  </p>
                </section>

                <section className="policy-section">
                  <h2>Information We Collect</h2>

                  <h3>Information You Provide to Us</h3>
                  <p>
                    We collect information you provide directly to us when you:
                  </p>
                  <ul>
                    <li>Create an account or profile</li>
                    <li>Make a purchase</li>
                    <li>Contact customer support</li>
                    <li>Complete forms or surveys</li>
                    <li>Participate in promotions or contests</li>
                    <li>Post reviews or comments</li>
                    <li>Sign up for marketing communications</li>
                  </ul>
                  <p>
                    This information may include your name, email address,
                    postal address, phone number, payment information, and any
                    other information you choose to provide.
                  </p>

                  <h3>Information We Collect Automatically</h3>
                  <p>
                    When you use our Services, we automatically collect certain
                    information, including:
                  </p>
                  <ul>
                    <li>
                      <strong>Device Information:</strong> We collect
                      information about the device you use to access our
                      Services, including hardware model, operating system,
                      unique device identifiers, and mobile network information.
                    </li>
                    <li>
                      <strong>Log Information:</strong> We collect log
                      information when you use our Services, including access
                      times, pages viewed, IP address, and the page you visited
                      before navigating to our Services.
                    </li>
                    <li>
                      <strong>Transaction Information:</strong> We collect
                      information about your purchases, including products
                      purchased, prices, payment methods, and shipping details.
                    </li>
                    <li>
                      <strong>Location Information:</strong> We may collect
                      information about your precise or approximate location
                      when you use our mobile applications or enable location
                      services.
                    </li>
                    <li>
                      <strong>Cookies and Similar Technologies:</strong> We use
                      cookies and similar technologies to collect information
                      about your browsing behavior, preferences, and device
                      information.
                    </li>
                  </ul>
                </section>

                <section className="policy-section">
                  <h2>How We Use Your Information</h2>
                  <p>We use the information we collect to:</p>
                  <ul>
                    <li>Provide, maintain, and improve our Services</li>
                    <li>Process and fulfill your orders</li>
                    <li>
                      Send order confirmations, updates, and support messages
                    </li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>
                      Communicate with you about products, services, offers, and
                      promotions
                    </li>
                    <li>Monitor and analyze trends, usage, and activities</li>
                    <li>
                      Detect, investigate, and prevent fraudulent transactions
                      and other illegal activities
                    </li>
                    <li>
                      Personalize your experience and provide content and
                      features that match your profile and interests
                    </li>
                    <li>Facilitate contests, sweepstakes, and promotions</li>
                  </ul>
                </section>

                <section className="policy-section">
                  <h2>Sharing of Information</h2>
                  <p>We may share your information as follows:</p>
                  <ul>
                    <li>
                      <strong>With Service Providers:</strong> We share
                      information with third-party vendors, consultants, and
                      other service providers who perform services on our
                      behalf, such as payment processing, data analysis, email
                      delivery, hosting, customer service, and marketing
                      assistance.
                    </li>
                    <li>
                      <strong>With Business Partners:</strong> We may share
                      information with business partners to provide you with
                      products or services you request.
                    </li>
                    <li>
                      <strong>For Legal Purposes:</strong> We may share
                      information if we believe disclosure is necessary to
                      comply with a legal obligation, protect our rights or the
                      rights of others, or in connection with a corporate
                      transaction, such as a merger, sale of assets, or
                      bankruptcy.
                    </li>
                    <li>
                      <strong>With Your Consent:</strong> We may share
                      information with third parties when you direct us to do so
                      or otherwise consent to the sharing.
                    </li>
                  </ul>
                  <p>
                    We may also share aggregated or de-identified information
                    that cannot reasonably be used to identify you.
                  </p>
                </section>

                <section className="policy-section">
                  <h2>Your Choices</h2>
                  <h3>Account Information</h3>
                  <p>
                    You can update, correct, or delete your account information
                    at any time by logging into your account. If you wish to
                    delete your account, please contact us, and we will assist
                    you.
                  </p>

                  <h3>Marketing Communications</h3>
                  <p>
                    You can opt out of receiving promotional emails by following
                    the instructions in those emails or by updating your
                    communication preferences in your account settings. If you
                    opt out, we may still send you non-promotional emails, such
                    as those about your account or our ongoing business
                    relations.
                  </p>

                  <h3>Cookies</h3>
                  <p>
                    Most web browsers are set to accept cookies by default. If
                    you prefer, you can usually choose to set your browser to
                    remove or reject cookies. Please note that if you choose to
                    remove or reject cookies, this could affect the availability
                    and functionality of our Services.
                  </p>
                </section>

                <section className="policy-section">
                  <h2>Data Security</h2>
                  <p>
                    We take reasonable measures to help protect information
                    about you from loss, theft, misuse, unauthorized access,
                    disclosure, alteration, and destruction. However, no
                    internet or email transmission is ever fully secure or
                    error-free. Therefore, you should take special care in
                    deciding what information you send to us.
                  </p>
                </section>

                <section className="policy-section">
                  <h2>Children's Privacy</h2>
                  <p>
                    Our Services are not intended for children under 13 years of
                    age. We do not knowingly collect personal information from
                    children under 13. If you are a parent or guardian and
                    believe that your child has provided us with personal
                    information, please contact us, and we will delete such
                    information.
                  </p>
                </section>

                <section className="policy-section">
                  <h2>Changes to This Privacy Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. If we
                    make material changes, we will notify you by email or by
                    posting a notice on our Services prior to the change
                    becoming effective. We encourage you to review the Privacy
                    Policy whenever you access our Services to stay informed
                    about our information practices.
                  </p>
                </section>

                <section className="policy-section">
                  <h2>Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please
                    contact us at:
                  </p>
                  <p>
                    Email: privacy@yourstore.com
                    <br />
                    Address: 123 Commerce Street, San Francisco, CA 94105,
                    United States
                    <br />
                    Phone: (800) 123-4567
                  </p>
                </section>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PrivacyPolicyPage;
