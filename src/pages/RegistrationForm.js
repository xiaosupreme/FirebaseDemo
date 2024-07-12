// src/components/RegistrationForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      
      const newUser = {
        username,
        password, 
      };
      const docRef = await addDoc(collection(db, 'users'), newUser);
      console.log('Document written with ID: ', docRef.id);
      alert('Registration successful!');
      navigate('/login'); 
    } catch (error) {
      
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className='create2'>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Username:<br></br>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /><br></br>
        </label>
        <label>
          Password:<br></br>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br></br>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
