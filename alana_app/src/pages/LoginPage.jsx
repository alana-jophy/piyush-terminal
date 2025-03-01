import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Login/Login.css";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", { email, password });
  
      console.log("Login Response:", response.data); // Debugging
  
      localStorage.setItem("token", response.data.token);
  
      if (response.data.isAdmin) {
        console.log("Redirecting to Admin Dashboard...");
        navigate("/admin-dashboard");
      } else {
        console.log("Redirecting to User Dashboard...");
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Invalid credentials");
      console.error("Login Error:", error);
    }
  };
  

  return (
    <div className="page-container">
      <div className="auth-container">
        <h2>Login</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;