import { useState, useEffect, useCallback } from "react";

interface ScrollEffectsOptions {
  showBackToTopOffset?: number;
  enableScrollProgress?: boolean;
}

export const useScrollEffect = ({
  showBackToTopOffset = 300,
  enableScrollProgress = true,
}: ScrollEffectsOptions = {}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Handle back to top button visibility
    setShowBackToTop(scrollY > showBackToTopOffset);

    // Handle scroll progress
    if (enableScrollProgress) {
      const scrollPercentage =
        (scrollY / (documentHeight - windowHeight)) * 100;
      setScrollProgress(scrollPercentage > 100 ? 100 : scrollPercentage);
    }
  }, [showBackToTopOffset, enableScrollProgress]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return {
    showBackToTop,
    scrollProgress,
    scrollToTop,
  };
};

export default useScrollEffect;
