import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <label className="swap swap-rotate">
  
      <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />


      <svg
        className="swap-on w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 3v1m0 16v1m8.485-12.485l-.707.707M4.222 19.778l-.707.707M21 12h-1M4 12H3m16.485 4.485l-.707-.707M4.222 4.222l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"
        />
      </svg>

 
      <svg
        className="swap-off w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
        />
      </svg>
    </label>
  );
};

export default ThemeToggle;