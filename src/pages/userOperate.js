import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserOperate = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({
        name: '',
        email: '',
        userName: '',
        role: 'USER',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                setLoading(true);
                try {
                    const token = localStorage.getItem('jwtToken');
                    console.log(token);
                    const response = await fetch(`http://localhost:8080/admin/single-user?userId=${userId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        if (response.status === 401) {
                            alert('Unauthorized: Please log in again');

                        } else if (response.status === 403) {
                            alert('Forbidden: You do not have permission to access this resource');
                        } else {
                            alert('Failed to fetch user');
                        }
                        throw new Error('Failed to fetch user');
                    }

                    const data = await response.json();
                    setUser({
                        name: data.body.name,
                        email: data.body.email,
                        userName: data.body.userName,
                        role: data.body.role,
                        password: '', 
                    });

                    console.log(setUser);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('jwtToken');
            const method = 'POST';
            const url = userId ? `http://localhost:8080/admin/update-user?userId=${userId}` : 'http://localhost:8080/admin/create-user';
            
            const userToSave = userId ? { ...user, password: undefined } : user;

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userToSave),
            });

            if (response.ok) {
                navigate('/manageUser');
            } else {
                setError('Failed to save user');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ backgroundColor: '#123524', color: 'white', padding: '20px' }}>
                {userId ? 'Update User Account' : 'Create new User'}
            </h2>
            <form onSubmit={handleSubmit}>
                <div style={{padding:'20px'}}>
                    <label>Name:</label>
                    <input
                        style={{margin:'10px'}}
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        required
                    />
                </div>
                <div style={{padding:'20px'}}>
                    <label>Email:</label>
                    <input
                        style={{margin:'5px'}}
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        required
                    />
                </div>
                <div style={{padding:'20px'}}>
                    <label>Username:</label>
                    <input
                        style={{margin:'5px'}}
                        type="text"
                        value={user.userName}
                        onChange={(e) => setUser({ ...user, userName: e.target.value })}
                        required
                    />
                </div>
                <div style={{padding:'20px'}}>
                    <label>Role:</label>
                    <select
                        style={{margin:'5px'}}
                        value={user.role}
                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                    >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <div style={{padding:'20px'}}>
                    <label>Password:</label>
                    <input
                        style={{margin:'5px'}}
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        required={!userId}
                    />
                </div>
                <button className="btn btn-success" type="submit">{userId ? 'Update User' : 'Create User'}</button>
            </form>
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default UserOperate;
