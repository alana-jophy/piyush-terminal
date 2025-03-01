import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/signup', { email, password });
      setMessage('Signup successful');
    } catch (err) {
      setMessage('Signup failed');
      console.error('Signup Error:', err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
      <p>{message}</p>
    </div>
  );
};

export default Signup;
