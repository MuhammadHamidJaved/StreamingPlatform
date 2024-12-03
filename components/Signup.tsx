import React, { useState } from 'react';
import '../styles/auth.css'; 
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!email || !password || !username || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Send signup request to backend
      const response = await axios.post('http://127.0.0.1:8000/register/',{
        headers:{
          'Content-Type': 'application/json',
        },
        username: username,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      });

      // Handle successful response
      if (response.status === 201) {
        setSuccess('Signup successful! You can now log in.');
      }
    } catch (err: any) {
      // Handle errors from the backend
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSignup}>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <FaFacebookF />
          </a>
          <a href="#" className="social">
            <FaGooglePlusG />
          </a>
          <a href="#" className="social">
            <FaLinkedinIn />
          </a>
        </div>
        <span>or use your email for registration</span>
        <div className="infield">
          <input 
            type="text" 
            placeholder="Name" 
            value={username} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className="infield">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="infield">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div className="infield">
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default Signup;
