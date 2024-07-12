// src/pages/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username), where('password', '==', password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        
        setUser(username); 
        localStorage.setItem('user', username); 
        navigate('/');
      } else {
        alert('Invalid username or password. Please try again.');
      }
    } catch (error) {
      alert('Error logging in. Please try again later.');
    }
  };

  return (
    <div className="create2">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:<br></br>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /><br></br>
        </label>
        <label>
          Password:<br></br>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br></br>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
