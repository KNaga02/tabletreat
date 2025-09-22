import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleTableOrderClick = () => {
    if (!isLoggedIn) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    navigate("/table-order");
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("isLoggedIn");
  //   setIsLoggedIn(false);
  //   navigate("/login");
  // };

  return (
    <header className="tt-header">
      <div className="tt-logo-name">
        <div className="tt-logo">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="tt-logo-icon"
          >
            <circle cx="12" cy="12" r="10" fill="#d86919" />
            <path
              d="M8 7c0 1.1-.9 2-2 2v6"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 7c0 1.1.9 2 2 2v6"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="tt-brand">
          <span>TableTreat</span>
        </div>
      </div>

      <nav className="tt-nav">
        <a onClick={() => navigate("/home")}>Home</a>
        <a onClick={() => navigate("/menu")}>Menu</a>
        <a onClick={() => navigate("/about")}>About</a>
        <a onClick={() => navigate("/contact")}>Contact</a>

        <button className="tt-cta" onClick={handleTableOrderClick}>
          Table Order
        </button>

        {!isLoggedIn ? (
          <button className="tt-cta" onClick={() => navigate("/login")}>
            Login
          </button>
        ) : (
          <>
            <button className="profile-btn" onClick={() => navigate("/profile")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M20 21c0-4-4-7-8-7s-8 3-8 7" />
              </svg>
            </button>

            {/* <button className="tt-cta" onClick={handleLogout}>
              Logout
            </button> */}
          </>
        )}
      </nav>
    </header>
  );
}
