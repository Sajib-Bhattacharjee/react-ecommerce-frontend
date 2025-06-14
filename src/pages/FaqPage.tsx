import React from "react";
import { Container, Row, Col, Accordion, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faShippingFast,
  faExchangeAlt,
  faCreditCard,
  faQuestionCircle,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../components/PageHeader";
import "../styles/InfoPages.css";

const FaqPage: React.FC = () => {
  // FAQ categories and questions
  const faqCategories = [
    {
      id: "shopping",
      title: "Shopping",
      icon: faShoppingCart,
      questions: [
        {
          question: "How do I place an order?",
          answer:
            "To place an order, browse our products, select the items you want, add them to your cart, and proceed to checkout. Follow the steps to provide shipping and payment information, then confirm your order.",
        },
        {
          question: "Can I modify or cancel my order?",
          answer:
            "You can modify or cancel your order within 1 hour of placing it. Please contact our customer service team immediately. Once an order has been processed, we cannot guarantee that changes can be made.",
        },
        {
          question: "Are there any minimum order requirements?",
          answer:
            "There is no minimum order requirement. However, orders under $50 will incur a standard shipping fee, while orders over $50 qualify for free shipping.",
        },
        {
          question: "How can I check the status of my order?",
          answer:
            "You can check the status of your order by logging into your account and viewing your order history. You will also receive email updates as your order is processed, shipped, and delivered.",
        },
      ],
    },
    {
      id: "shipping",
      title: "Shipping & Delivery",
      icon: faShippingFast,
      questions: [
        {
          question: "What shipping methods are available?",
          answer:
            "We offer standard shipping (5-7 business days), express shipping (2-3 business days), and next-day delivery options. Shipping methods may vary based on your location and the items in your order.",
        },
        {
          question: "How much does shipping cost?",
          answer:
            "Standard shipping is free for orders over $50. For orders under $50, a $5.99 shipping fee applies. Express shipping costs $12.99, and next-day delivery costs $19.99, regardless of order value.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. You can see the shipping options available to your location during checkout.",
        },
        {
          question: "How long will it take to receive my order?",
          answer:
            "Domestic orders typically arrive within 5-7 business days with standard shipping, 2-3 business days with express shipping, and the next business day with next-day delivery. International orders may take 7-21 business days depending on the destination.",
        },
      ],
    },
    {
      id: "returns",
      title: "Returns & Refunds",
      icon: faExchangeAlt,
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached and original packaging. Some items, such as personalized products or intimate apparel, cannot be returned for hygiene reasons.",
        },
        {
          question: "How do I return an item?",
          answer:
            "To return an item, log into your account, go to your order history, and select the 'Return Item' option for the relevant order. Follow the instructions to generate a return label. Pack the item securely and drop it off at the designated shipping location.",
        },
        {
          question: "When will I receive my refund?",
          answer:
            "Once we receive and inspect your return, we will process your refund within 3-5 business days. The refund will be issued to your original payment method. It may take an additional 5-10 business days for the funds to appear in your account, depending on your financial institution.",
        },
        {
          question: "Can I exchange an item instead of returning it?",
          answer:
            "Yes, you can exchange items for a different size, color, or model. Follow the same return process, but select 'Exchange' instead of 'Return' and specify the item you want in exchange. If the new item costs more, you will need to pay the difference.",
        },
      ],
    },
    {
      id: "payment",
      title: "Payment & Security",
      icon: faCreditCard,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and bank transfers. Some regional payment methods may also be available depending on your location.",
        },
        {
          question: "Is it safe to use my credit card on your website?",
          answer:
            "Yes, our website uses SSL encryption to protect your personal and payment information. We comply with PCI DSS standards and never store your full credit card details on our servers. We also offer secure payment options like PayPal for added security.",
        },
        {
          question: "When will my credit card be charged?",
          answer:
            "Your credit card will be authorized when you place the order but will only be charged when your order ships. For pre-orders or backorders, we'll charge your card when the item is ready to ship, not at the time of ordering.",
        },
        {
          question: "Do you offer installment payment options?",
          answer:
            "Yes, we offer installment payment options through services like Klarna, Afterpay, and Affirm. These options are available at checkout and allow you to split your payment into multiple installments, subject to approval.",
        },
      ],
    },
    {
      id: "account",
      title: "Account & Privacy",
      icon: faUserCircle,
      questions: [
        {
          question: "Do I need to create an account to make a purchase?",
          answer:
            "No, you can check out as a guest without creating an account. However, creating an account allows you to track orders, save your shipping information, and access exclusive offers and discounts.",
        },
        {
          question: "How do I reset my password?",
          answer:
            "To reset your password, click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you instructions to create a new password. For security reasons, we never have access to your current password.",
        },
        {
          question: "How is my personal information protected?",
          answer:
            "We take data protection seriously. Our privacy policy outlines how we collect, use, and protect your information. We use industry-standard security measures and never sell your personal data to third parties. You can manage your privacy preferences in your account settings.",
        },
        {
          question: "Can I delete my account?",
          answer:
            "Yes, you can delete your account at any time. Go to your account settings and select the 'Delete Account' option. This will permanently remove your personal information from our system, though we may retain some data for legal and business purposes as outlined in our privacy policy.",
        },
      ],
    },
    {
      id: "other",
      title: "Other Questions",
      icon: faQuestionCircle,
      questions: [
        {
          question: "Do you have a loyalty program?",
          answer:
            "Yes, we have a loyalty program called SBC Rewards. You earn points for every purchase, which can be redeemed for discounts on future orders. You also get exclusive access to member-only sales and early access to new products.",
        },
        {
          question: "How can I contact customer service?",
          answer:
            "You can contact our customer service team through email at sbcexpress2025@gmail.com, by phone at 01777777777 (available Monday-Friday, 9am-6pm), or through the live chat on our website. We typically respond to emails within 24 hours.",
        },
        {
          question: "Do you offer gift wrapping?",
          answer:
            "Yes, we offer gift wrapping services for a small fee of $5 per item. You can select this option during checkout and add a personalized message to be included with your gift.",
        },
        {
          question: "Are product reviews genuine?",
          answer:
            "Yes, all product reviews on our site are from verified customers who have purchased the product. We never edit or remove reviews based on rating, though we do moderate for inappropriate content. We believe in transparent and honest feedback.",
        },
      ],
    },
  ];

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        description="Find answers to the most common questions about our products, services, and policies."
        bgImage="/images/public/images/faq-header.jpg"
      />

      <div className="info-page">
        <Container>
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <h2 className="info-title">How Can We Help You?</h2>
              <p className="info-text">
                Browse through our comprehensive FAQ section to find answers to
                the most common questions. If you can't find what you're looking
                for, please don't hesitate to contact our customer support team.
              </p>
            </Col>
          </Row>

          <Row className="mb-5">
            {faqCategories.map((category) => (
              <Col md={6} lg={4} key={category.id} className="mb-4">
                <Card className="info-card h-100">
                  <Card.Body className="text-center">
                    <FontAwesomeIcon
                      icon={category.icon}
                      className="info-icon"
                    />
                    <h3 className="info-subtitle mb-3">{category.title}</h3>
                    <p className="info-text">
                      {category.questions.length} questions
                    </p>
                    <a href={`#${category.id}`} className="btn btn-primary">
                      View Questions
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {faqCategories.map((category) => (
            <div key={category.id} id={category.id} className="mb-5">
              <h3 className="info-subtitle mb-4">
                <FontAwesomeIcon
                  icon={category.icon}
                  className="me-2"
                  style={{ color: "#4361ee" }}
                />
                {category.title}
              </h3>
              <Accordion className="info-accordion">
                {category.questions.map((item, index) => (
                  <Accordion.Item
                    eventKey={`${category.id}-${index}`}
                    key={index}
                  >
                    <Accordion.Header>{item.question}</Accordion.Header>
                    <Accordion.Body>{item.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          ))}

          <Row className="mt-5">
            <Col lg={8} className="mx-auto text-center">
              <h3 className="info-subtitle">Still Have Questions?</h3>
              <p className="info-text">
                Our customer support team is here to help. Contact us via email,
                phone, or live chat, and we'll get back to you as soon as
                possible.
              </p>
              <a href="/contact" className="btn btn-primary btn-lg">
                Contact Us
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FaqPage;
