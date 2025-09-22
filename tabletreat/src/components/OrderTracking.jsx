import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderTracking.css";

export default function OrderTracking() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  const steps = ["Received", "Preparing", "On the Way", "Delivered"];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!order) {
      navigate("/home");
      return;
    }

    const interval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  },
   [currentStep, navigate, steps.length]);

  if (!order) return null;

  return (
    <div className="order-tracking-screen">
      {/* <button className="back-btn" onClick={() => navigate("/home")}></button> */}
      <header className="tracking-header">
        <h1>Order Tracking</h1>
        <p>Order ID: {order.id}</p>
      </header>

      <main className="tracking-main">
        <ul className="progress-bar">
          {steps.map((step, idx) => (
            <li
              key={idx}
              className={`progress-step ${idx <= currentStep ? "active" : ""}`}
            >
              <div className="step-icon">{idx <= currentStep ? "✔" : idx + 1}</div>
              <span>{step}</span>
            </li>
          ))}
        </ul>

        <h2>Items</h2>
        <ul className="order-items">
          {order.items.map((item, idx) => (
            <li key={idx}>
              {item.name} - ₹{item.price}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
