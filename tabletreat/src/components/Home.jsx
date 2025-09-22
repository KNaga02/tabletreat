import React from "react";
import { useNavigate } from "react-router-dom";
import heroDish from "../assets/hero-dish.jpg";
import "./Home.css";

export default function Home({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    if (!isLoggedIn) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    navigate("/order");
  };

  return (
    <div className="home">
      <section className="tt-hero">
        <div className="tt-hero-left">
          <h1>
            Welcome to <br />
            <span>TableTreat</span>
          </h1>
          <p>Delicious food, delivered to your door or enjoy at our restaurant</p>
          <div className="hero-buttons">
            <button className="tt-btn" onClick={handleOrderClick}>
              Order Now
            </button>
          </div>
        </div>
        <div className="tt-hero-right">
          <img src={heroDish} alt="Pasta with grilled chicken" />
        </div>
      </section>
    </div>
  );
}
