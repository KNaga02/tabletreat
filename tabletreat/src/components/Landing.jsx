import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 6000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="landing">
      <div className="overlay">
        <h1 className="title">
          <Logo />
        </h1>

        <p className="tagline">
          Best restaurant for food & table booking
        </p>
      </div>
    </div>
  );
}
