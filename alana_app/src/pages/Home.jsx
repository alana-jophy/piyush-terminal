import React from 'react';
import { Link } from 'react-router-dom';
import EntryPage from '../components/EntryPage/EntryPage';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <EntryPage />
      <div className="links">
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Home;
