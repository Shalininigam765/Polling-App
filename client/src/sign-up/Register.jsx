import React, { useState } from 'react';
import axios from 'axios';


function Register( {navigateTo} ) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        // Placeholder for authentication logic
        try{
            const response = await axios.post("http://localhost:8080/api/v1/users/register", {
                email,
                password,
                username
            });

            console.log("Registration Success:", response.data);
            setIsError(false);
            setMessage('Registration successful! Please log in.');

            // Simulate successful login and navigate to home
            setTimeout(() => {
                navigateTo('login');
            }, 2000);

        }
        catch (err) {
            console.error("Registration Failed:", err);
            setIsError(true);
            setMessage(err.response?.data?.message || 'Registration failed. Try again.');
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
            <h2>Create an Account!!</h2>
            {message && <p className={isError ? "error-message" : "success-message"}>{message}</p>}
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
                    <label>User Name</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                
                <button type="submit">Register</button>

            </form>
            <p className="signup-link">
                Already have an account? <a href="#" onClick={() => navigateTo('login')}>Login</a>
            </p>
            <button onClick={() => navigateTo('home')}>Back to Home</button>
        </div>
        </div>
    )
}

export default Register;