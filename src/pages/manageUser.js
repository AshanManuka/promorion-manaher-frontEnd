import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('jwtToken');

                const response = await fetch('http://localhost:8080/admin/all-users', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();

                if (data.success) {
                    setUsers(data.body);
                } else {
                    setError('Error fetching users');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('jwtToken');

                const response = await fetch(`http://localhost:8080/admin/delete-user?userId=${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    // Filter out the deleted user from the UI
                    setUsers(users.filter(user => user.id !== userId));
                } else {
                    throw new Error('Failed to delete user');
                }
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleEdit = (userId) => {
        navigate(`/userOperate/${userId}`);
    };

    const handleCreateUser = () => {
        navigate('/userOperate');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ backgroundColor: '#123524', color: 'white', padding: '20px' }}>Manage System Users</h2>
            <button onClick={handleCreateUser} className="btn btn-success" style={{ marginBottom: '20px' }}>
                Create new User
            </button>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Username</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Role</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.id}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.userName}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.role}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <button className="btn btn-primary" onClick={() => handleEdit(user.id)}>
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(user.id)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
