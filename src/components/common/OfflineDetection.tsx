import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import "./OfflineDetection.css";

const OfflineDetection: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowAlert(true);
      // Hide the "back online" message after 3 seconds
      setTimeout(() => setShowAlert(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowAlert(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showAlert) return null;

  return (
    <div className={`offline-detection ${isOnline ? "online" : "offline"}`}>
      <Alert
        variant={isOnline ? "success" : "danger"}
        className="offline-alert"
        dismissible
        onClose={() => setShowAlert(false)}
      >
        <div className="d-flex align-items-center">
          <div
            className={`status-indicator ${isOnline ? "online" : "offline"}`}
          ></div>
          <div>
            {isOnline
              ? "You are back online! Your connection has been restored."
              : "You are currently offline. Some features may be unavailable."}
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default OfflineDetection;
