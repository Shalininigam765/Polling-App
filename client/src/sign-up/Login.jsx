import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login( {navigateTo, setUser} ) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Placeholder for authentication logic
        try {
            const response = await axios.post("http://localhost:8080/api/v1/users/login", { 
                email, 
                password 
            }, {
                withCredentials: true
            });

            console.log("Login Successful:", response.data);
            setUser(response.data.user);

            // Simulate successful login and navigate to home
            navigateTo('dashboard');
        }
        catch (error) {
            console.error("Login Failed:", err);
            // Display the error message from your backend
            setError(err.response?.data?.message || 'Login failed. Try again.');
        }
    }

    return (
        <div className="login-page">
          <div className="login-page__orb login-page__orb--1" />
          <div className="login-page__orb login-page__orb--2" />
          <div className="login-page__orb login-page__orb--3" />
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="login-page__particle" style={{ '--i': i }} />
          ))}

        <div className="login-container">
            <h2>Welcome Back to Mythos Polls</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="login-form" onSubmit={handleSubmit}> 
                <div>
                    <label>Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit">Login</button>

            </form>
            <p className="signup-link">
                Don't have an account? <a href="#" onClick={() => navigateTo('signup')}>Sign Up</a>
            </p>
            <button onClick={() => navigateTo('home')}>Back to Home</button>
        </div>
        </div>
    )
}

export default Login;