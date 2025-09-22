import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = location.state?.cart || [];

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cash");
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setMapUrl(
            `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`
          );

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            setAddress(data.display_name || "");
          } catch (err) {
            console.log("Error fetching address:", err);
          }
        },
        (err) => console.log(err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handlePlaceOrder = () => {
    if (!name || !address) return alert("Please fill all details");

    if (payment === "upi") {
      window.open("https://www.phonepe.com/", "_blank");
      return;
    }

    const orderData = {
      id: Math.floor(Math.random() * 100000),
      items: cart,
      name,
      address,
      payment,
      status: "Received",
    };

    navigate("/tracking", { state: { order: orderData } });
  };

  return (
    <div className="checkout-screen">
      {/* <button className="back-btn" onClick={() => navigate(-1)}></button> */}
      <header className="checkout-header">
        <h1>Checkout</h1>
      </header>

      <main className="checkout-main">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Delivery Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </div>

        {mapUrl && (
          <div className="map-container">
            <iframe
              src={mapUrl}
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen=""
              loading="lazy"
              title="Delivery Location"
            ></iframe>
          </div>
        )}

        <div className="form-group">
          <label>Payment Method</label>
          <select value={payment} onChange={(e) => setPayment(e.target.value)}>
            <option value="cash">Cash on Delivery</option>
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI (PhonePe/Paytm/GPay)</option>
          </select>
        </div>

        <button className="tt-btn" onClick={handlePlaceOrder}>
          {payment === "upi" ? "Pay with UPI" : "Place Order"}
        </button>
      </main>
    </div>
  );
}






















// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./Checkout.css";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const cart = location.state?.cart || [];

//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [payment, setPayment] = useState("cash");
//   const [mapUrl, setMapUrl] = useState("");

//   // Calculate total cart amount
//   const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   // Get user location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           setMapUrl(`https://www.google.com/maps?q=${latitude},${longitude}&output=embed`);

//           try {
//             const res = await fetch(
//               `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//             );
//             const data = await res.json();
//             setAddress(data.display_name || "");
//           } catch (err) {
//             console.log("Error fetching address:", err);
//           }
//         },
//         (err) => console.log(err),
//         { enableHighAccuracy: true }
//       );
//     }
//   }, []);

//   const handlePlaceOrder = () => {
//     if (name.trim() === "" || address.trim() === "") {
//       return alert("Please fill all details");
//     }

//     const orderData = {
//       id: Math.floor(Math.random() * 100000),
//       items: cart,
//       name,
//       address,
//       payment,
//       totalAmount,
//       status: "Received",
//     };

//     if (payment === "upi") {
//       // Generate dynamic UPI link
//       const upiLink = `upi://pay?pa=merchant@upi&pn=TableTreat&am=${totalAmount}&cu=INR`;
//       window.open(upiLink, "_blank");
//       return;
//     }

//     navigate("/tracking", { state: { order: orderData } });
//   };

//   return (
//     <div className="checkout-screen">
//       <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
//       <header className="checkout-header">
//         <h1>Checkout</h1>
//       </header>

//       <main className="checkout-main">
//         <div className="form-group">
//           <label>Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your name"
//           />
//         </div>

//         <div className="form-group">
//           <label>Delivery Address</label>
//           <textarea
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             placeholder="Enter your address"
//           />
//         </div>

//         {mapUrl && (
//           <div className="map-container">
//             <iframe
//               src={mapUrl}
//               width="100%"
//               height="200"
//               style={{ border: 0, borderRadius: "12px" }}
//               allowFullScreen=""
//               loading="lazy"
//               title="Delivery Location"
//             ></iframe>
//           </div>
//         )}

//         <div className="form-group">
//           <label>Payment Method</label>
//           <select value={payment} onChange={(e) => setPayment(e.target.value)}>
//             <option value="cash">Cash on Delivery</option>
//             <option value="card">Credit/Debit Card</option>
//             <option value="upi">UPI (PhonePe/Paytm/GPay)</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Total Amount:</label>
//           <p>₹ {totalAmount.toFixed(2)}</p>
//         </div>

//         <button className="tt-btn" onClick={handlePlaceOrder}>
//           {payment === "upi" ? "Pay with UPI" : "Place Order"}
//         </button>
//       </main>
//     </div>
//   );
// }
