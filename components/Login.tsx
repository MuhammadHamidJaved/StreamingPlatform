import React, { useState } from 'react';
import '../styles/auth.css'; 
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import axios from 'axios';
import { storeTokens } from '@/app/utils/authHelpers';
import { API_BASE_URL, ENDPOINTS } from '@/app/constants/apiEndpoints';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const Signin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null); // Clear previous errors

    try {
      const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.LOGIN}`, {
        email,
        password,
      });

      const { access, refresh } = response.data;
      storeTokens(access, refresh); // Save tokens in localStorage
      alert('Login successful!');
      // Redirect to dashboard or any protected route
      window.location.href = '/dashboard';
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={Signin}>
        <h1>Sign in</h1>
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
        <span>or use your account</span>
        <div className="infield">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label></label>
        </div>
        <div className="infield">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label></label>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <a href="#" className="forgot">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
