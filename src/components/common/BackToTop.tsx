import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

interface BackToTopProps {
  show: boolean;
  onClick: () => void;
}

const BackToTop: React.FC<BackToTopProps> = ({ show, onClick }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (show) {
      // Add a slight delay before applying animation class
      const timer = setTimeout(() => {
        setAnimated(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimated(false);
    }
  }, [show]);

  return (
    <button
      className={`back-to-top ${show ? "visible" : ""} ${
        animated ? "animated" : ""
      }`}
      onClick={onClick}
      aria-label="Back to top"
    >
      <span className="back-to-top-icon">
        <FontAwesomeIcon icon={faArrowUp} />
      </span>
      <span className="back-to-top-circle"></span>
      <span className="back-to-top-pulse"></span>
    </button>
  );
};

export default BackToTop;
