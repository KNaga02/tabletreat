import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegister.css";

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "", confirmPassword: "" });
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (!otpSent) {
      const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(newOtp);
      setOtpSent(true);
      alert(`Mock OTP Sent: ${newOtp}`);
      return;
    }

    if (otp !== generatedOtp) {
      alert("Invalid OTP. Try again.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ email: form.email, password: form.password, name: form.name })
    );
    alert("Registration successful!");
    setIsLogin(true);
    setOtpSent(false);
    setForm({ email: "", password: "", name: "", confirmPassword: "" });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.email === form.email && savedUser.password === form.password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } else {
      alert("Invalid email or password.");
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.email === form.email) {
      savedUser.password = form.password;
      localStorage.setItem("user", JSON.stringify(savedUser));
      alert("Password reset successful! Please login.");
      setIsForgot(false);
      setIsLogin(true);
    } else {
      alert("Email not registered.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {isForgot ? (
          <>
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="New Password (min 6 chars)"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="auth-btn">
                Reset Password
              </button>
            </form>
            <p className="toggle-text">
              Back to{" "}
              <span
                onClick={() => {
                  setIsForgot(false);
                  setIsLogin(true);
                }}
              >
                Login
              </span>
            </p>
          </>
        ) : (
          <>
            <h2>{isLogin ? "Login" : "Register"}</h2>
            <form onSubmit={isLogin ? handleLogin : handleRegister}>
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 chars)"
                value={form.password}
                onChange={handleChange}
                required
              />
              {!isLogin && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              )}
              {!isLogin && otpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              )}
              <button type="submit" className="auth-btn">
                {isLogin ? "Login" : otpSent ? "Verify OTP" : "Register"}
              </button>
            </form>
            {isLogin && (
              <p className="forgot-text">
                <span onClick={() => setIsForgot(true)}>Forgot Password?</span>
              </p>
            )}
            <p className="toggle-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                onClick={() => {
                  setIsLogin(!isLogin);
                  setOtpSent(false);
                }}
              >
                {isLogin ? "Register" : "Login"}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}





// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./LoginRegister.css";

// export default function LoginRegister() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [generatedOtp, setGeneratedOtp] = useState("");
//   const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const sendOtp = async (email, otp) => {
//     try {
//       await axios.post("http://localhost:5174/send-otp", { email, otp });
//       alert("OTP sent to your email!");
//     } catch (err) {
//       console.error(err);
//       alert("Error sending OTP.");
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (!otpSent) {
//       const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
//       setGeneratedOtp(newOtp);
//       setOtpSent(true);
//       await sendOtp(form.email, newOtp);
//       return;
//     }

//     if (otp !== generatedOtp) {
//       alert("Invalid OTP!");
//       return;
//     }

//     if (form.password !== form.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     localStorage.setItem(
//       "user",
//       JSON.stringify({ name: form.name, email: form.email, password: form.password })
//     );
//     alert("Registration successful!");
//     setIsLogin(true);
//     setOtpSent(false);
//     setForm({ name: "", email: "", password: "", confirmPassword: "" });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const savedUser = JSON.parse(localStorage.getItem("user"));

//     if (savedUser && savedUser.email === form.email && savedUser.password === form.password) {
//       localStorage.setItem("isLoggedIn", "true");
//       navigate("/home");
//     } else {
//       alert("Invalid email or password!");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>{isLogin ? "Login" : "Register"}</h2>
//         <form onSubmit={isLogin ? handleLogin : handleRegister}>
//           {!isLogin && (
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={handleChange}
//               required
//             />
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//           {!isLogin && (
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={form.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           )}
//           {!isLogin && otpSent && (
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//           )}
//           <button type="submit" className="auth-btn">
//             {isLogin ? "Login" : otpSent ? "Verify OTP" : "Register"}
//           </button>
//         </form>
//         <p className="toggle-text">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <span onClick={() => { setIsLogin(!isLogin); setOtpSent(false); }}>
//             {isLogin ? "Register" : "Login"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }


