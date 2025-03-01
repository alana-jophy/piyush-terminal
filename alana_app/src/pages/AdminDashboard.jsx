import React, { useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const createUser = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:3000/admin/create-user", { token, email, password, isAdmin });
      alert("User created successfully");
    } catch (error) {
      alert("Error creating user");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Create User</h3>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <label>
        <input type="checkbox" onChange={(e) => setIsAdmin(e.target.checked)} />
        Admin User?
      </label>
      <button onClick={createUser}>Create User</button>
    </div>
  );
};

export default AdminDashboard;
