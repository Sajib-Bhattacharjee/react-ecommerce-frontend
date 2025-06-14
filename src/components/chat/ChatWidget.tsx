import React, { useState, useEffect, useRef } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faTimes,
  faPaperPlane,
  faUser,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import "./ChatWidget.css";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Handle event types for form submission
interface FormEvent extends React.FormEvent<HTMLFormElement> {
  preventDefault(): void;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "Hello! How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle sending a new message
  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      // Add bot response
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(newMessage),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Get a canned bot response based on user input keywords
  const getBotResponse = (userMessage: string) => {
    const lowerCase = userMessage.toLowerCase();

    if (lowerCase.includes("hello") || lowerCase.includes("hi")) {
      return "Hello there! How can I assist you today?";
    } else if (
      lowerCase.includes("delivery") ||
      lowerCase.includes("shipping")
    ) {
      return "We typically ship orders within 1-2 business days, and delivery takes 3-5 days depending on your location.";
    } else if (lowerCase.includes("return") || lowerCase.includes("refund")) {
      return "Our return policy allows returns within 30 days of purchase. Please visit our Returns page for more information.";
    } else if (lowerCase.includes("price") || lowerCase.includes("cost")) {
      return "All prices are listed in USD and include taxes. If you have questions about a specific product, please provide the product name.";
    } else if (lowerCase.includes("discount") || lowerCase.includes("promo")) {
      return "You can use code WELCOME10 for 10% off your first order!";
    } else if (
      lowerCase.includes("thanks") ||
      lowerCase.includes("thank you")
    ) {
      return "You're welcome! Is there anything else I can help with?";
    } else {
      return "I appreciate your question. For more detailed assistance, please contact our customer service team at support@example.com or call us at (555) 123-4567.";
    }
  };

  return (
    <div className="chat-widget">
      {/* Chat toggle button */}
      <Button
        className={`chat-toggle-btn ${isOpen ? "open" : ""}`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faCommentDots} />
      </Button>

      {/* Chat window */}
      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <div className="chat-title">
            <div className="chat-avatar">
              <FontAwesomeIcon icon={faRobot} />
            </div>
            <div>
              <h5>Customer Support</h5>
              <div className="chat-status">
                <span className="status-indicator online"></span>
                Online
              </div>
            </div>
          </div>
          <Button
            variant="link"
            className="close-btn"
            onClick={toggleChat}
            aria-label="Close chat"
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>

        <div className="chat-body">
          {messages.map((message) => (
            <div key={message.id} className={`chat-message ${message.sender}`}>
              <div className="message-avatar">
                <FontAwesomeIcon
                  icon={message.sender === "user" ? faUser : faRobot}
                />
              </div>
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-message bot">
              <div className="message-avatar">
                <FontAwesomeIcon icon={faRobot} />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="chat-footer">
          <Form onSubmit={handleSendMessage}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                aria-label="Chat message"
              />
              <Button
                variant="primary"
                type="submit"
                disabled={!newMessage.trim()}
                aria-label="Send message"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
