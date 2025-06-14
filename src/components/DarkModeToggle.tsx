import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "../styles/darkMode.css";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize theme based on localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark-mode-transition");
    } else if (savedTheme === "light") {
      setIsDarkMode(false);
      document.body.setAttribute("data-theme", "light");
      document.documentElement.classList.add("dark-mode-transition");
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // Use system preference if no saved theme
      setIsDarkMode(true);
      document.body.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark-mode-transition");
    } else {
      // Default to light mode if no preference
      document.body.setAttribute("data-theme", "light");
      document.documentElement.classList.add("dark-mode-transition");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      className={`dark-mode-toggle ${isDarkMode ? "dark" : "light"}`}
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
    </button>
  );
};

export default DarkModeToggle;
