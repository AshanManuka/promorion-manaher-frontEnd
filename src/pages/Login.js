import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (response.ok) {
                const token = await response.text();
                console.log('Received token:', token);
    
                localStorage.setItem('jwtToken', token);
    
                navigate('/dashboard');
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred while logging in. Please try again.');
        }
    };
    
    

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form className="container p-4 bg-white rounded shadow-sm" onSubmit={handleLogin} style={{ maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Login <small className="text-muted">_as Admin</small></h2>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
};

export default Login;
