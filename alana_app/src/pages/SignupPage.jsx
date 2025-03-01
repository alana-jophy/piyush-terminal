import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import axios from "axios";
import "../components/Signup/Signup.css";

const API_URL = "http://localhost:5000";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // Hook for navigation

  const handleSignup = async () => {
    try {
      await axios.post(`${API_URL}/signup`, { email, password });
      setMessage("Signup successful! Redirecting to login...");
      
      // Redirect to login page after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("Signup failed. Try again.");
      console.error("Signup Error:", err);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-container">
        <h2>Signup</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Signup</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SignupPage;
