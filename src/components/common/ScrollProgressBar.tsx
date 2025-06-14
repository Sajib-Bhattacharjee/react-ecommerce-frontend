import React from "react";

interface ScrollProgressBarProps {
  progress: number;
}

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ progress }) => {
  return (
    <div className="scroll-progress-container">
      <div
        className="scroll-progress"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <div className="scroll-progress-glow"></div>
      </div>
    </div>
  );
};

export default ScrollProgressBar;
