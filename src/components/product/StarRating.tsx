import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  count?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = "md",
  showCount = false,
  count,
}) => {
  const stars = [];

  // Determine icon size based on the size prop
  const iconSize = size === "sm" ? "xs" : size === "lg" ? "lg" : "sm";

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <FontAwesomeIcon
        key={i}
        icon={i <= rating ? faStarSolid : faStarRegular}
        className={`text-${i <= rating ? "warning" : "muted"} me-1`}
        size={iconSize}
      />
    );
  }

  return (
    <div className="d-inline-flex align-items-center">
      <div>{stars}</div>
      {showCount && count !== undefined && (
        <span className="ms-1 text-muted">({count})</span>
      )}
    </div>
  );
};

export default StarRating;
