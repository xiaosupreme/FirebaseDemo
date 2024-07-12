// src/App.js
import './App.css';
import { BrowserRouter, Route, NavLink, Routes, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Article from './pages/Article';
import FormArticle from './pages/FormArticle';
import Login from './pages/Login';
import RegistrationForm from './pages/RegistrationForm'; 

function App() {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser); 
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>My Articles</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {user ? (
            <>
              <NavLink to="/new">New Article</NavLink>
              <NavLink to="/0" onClick={handleLogout}>Logout</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home user={user} />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/articles/:urlId" element={<Article />} />
          <Route path="/login" element={<Login setUser={setUser} />} /> 
          <Route path="/register" element={<RegistrationForm />} /> 
          <Route
            path="/new"
            element={user ? <FormArticle /> : <Navigate to="/login" />} 
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
