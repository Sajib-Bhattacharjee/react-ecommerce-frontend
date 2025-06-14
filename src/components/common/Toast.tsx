import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faCheckCircle,
  faExclamationCircle,
  faTimesCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number;
  onClose?: () => void;
  show: boolean;
}

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  duration = 3000,
  onClose,
  show,
}) => {
  const [visible, setVisible] = useState<boolean>(show);

  useEffect(() => {
    setVisible(show);

    if (show && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return faCheckCircle;
      case "error":
        return faTimesCircle;
      case "warning":
        return faExclamationCircle;
      case "info":
        return faInfoCircle;
      default:
        return faInfoCircle;
    }
  };

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <FontAwesomeIcon icon={getIcon()} className="toast-icon" />
        <span className="toast-message">{message}</span>
      </div>
      <button
        className="toast-close"
        onClick={handleClose}
        aria-label="Close notification"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  children: React.ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  children,
  position = "top-right",
}) => {
  return <div className={`toast-container toast-${position}`}>{children}</div>;
};

export default Toast;
