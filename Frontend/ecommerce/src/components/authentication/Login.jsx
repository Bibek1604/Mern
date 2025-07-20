import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Home/Header';
import Footer from "../Home/Footer";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <>
      <Header />

      {/* Login Form */}
      <main className="flex-grow flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-2xl mb-4 text-center">Login</h2>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded mb-4" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded mb-4" />
          <div className="mb-4 text-center">
            <a href="#" className="text-sm text-gray-600">Forgot password?</a>
          </div>
          <button type="submit" className="w-full bg-black text-white p-2 rounded">Sign In</button>
          <div className="mt-4 text-center">
            <a href="/register" className="text-sm text-gray-600">Create account?</a>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Login;
