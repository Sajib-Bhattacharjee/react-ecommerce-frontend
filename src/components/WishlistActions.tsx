import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { useWishlist } from "../hooks/useWishlist";
import "./WishlistActions.css";

interface WishlistActionsProps {
  productId: string | number;
  product: any;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const WishlistActions: React.FC<WishlistActionsProps> = ({
  productId,
  product,
  size = "md",
  showText = false,
  className = "",
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(productId);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case "sm":
        return "btn-sm";
      case "lg":
        return "btn-lg";
      default:
        return "";
    }
  };

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id={`wishlist-tooltip-${productId}`}>
          {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </Tooltip>
      }
    >
      <Button
        variant={inWishlist ? "danger" : "outline-danger"}
        className={`wishlist-action-btn ${getButtonSize()} ${className}`}
        onClick={handleToggleWishlist}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <FontAwesomeIcon
          icon={inWishlist ? faHeart : farHeart}
          className="wishlist-icon"
        />
        {showText && (
          <span className="ms-2">
            {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </span>
        )}
      </Button>
    </OverlayTrigger>
  );
};

export default WishlistActions;
