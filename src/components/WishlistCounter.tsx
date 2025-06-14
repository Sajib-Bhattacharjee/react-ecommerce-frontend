import React from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useWishlist } from "../hooks/useWishlist";
import "./WishlistCounter.css";

interface WishlistCounterProps {
  className?: string;
}

const WishlistCounter: React.FC<WishlistCounterProps> = ({
  className = "",
}) => {
  const { wishlist } = useWishlist();
  const count = wishlist.length;

  return (
    <Link
      to="/account/wishlist"
      className={`wishlist-counter-link ${className}`}
    >
      <div className="wishlist-counter-container">
        <FontAwesomeIcon icon={faHeart} className="wishlist-counter-icon" />
        {count > 0 && (
          <Badge pill bg="danger" className="wishlist-counter-badge">
            {count > 99 ? "99+" : count}
          </Badge>
        )}
      </div>
      <span className="wishlist-counter-text">Wishlist</span>
    </Link>
  );
};

export default WishlistCounter;
