import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "../common/BackToTop";
import ScrollProgressBar from "../common/ScrollProgressBar";
import OfflineDetection from "../common/OfflineDetection";
import ChatWidget from "../chat/ChatWidget";
import { useScrollEffect } from "../../hooks/useScrollEffect";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { showBackToTop, scrollProgress, scrollToTop } = useScrollEffect();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Add animation classes to elements when they scroll into view
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(
        ".animate-on-scroll:not(.animated)"
      );

      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (elementPosition < screenHeight * 0.85) {
          element.classList.add("animated");

          // Get animation type from data attribute or default to fade-in-up
          const animationType =
            element.getAttribute("data-animation") || "fade-in-up";
          element.classList.add(animationType);
        }
      });
    };

    // Run once on initial load
    animateOnScroll();

    // Add scroll event listener
    window.addEventListener("scroll", animateOnScroll);

    return () => {
      window.removeEventListener("scroll", animateOnScroll);
    };
  }, []);

  return (
    <div className="site-wrapper">
      <ScrollProgressBar progress={scrollProgress} />
      <OfflineDetection />
      <Header />
      <main className="main-content">{children || <Outlet />}</main>
      <Footer />
      <BackToTop show={showBackToTop} onClick={scrollToTop} />
      <ChatWidget />
    </div>
  );
};

export default Layout;
