import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const [promotions, setPromotions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchPromotions = async () => {
        try {
            const token = localStorage.getItem('jwtToken');

            const response = await fetch('http://localhost:8080/user/promotions-by-user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch promotions');
            }

            const data = await response.json();

            if (data.success) {
                setPromotions(data.body);
            } else {
                setError('Error fetching promotions');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPromotions();
    }, []);

    const handleViewPromotion = (id) => {
        navigate(`/viewPromotion/${id}`);
    };

    const handleEditPromotion = (id) => {
        navigate(`/createPromotion/${id}`);
    };

    const handleDeletePromotion = async (id) => {
        try {
            const token = localStorage.getItem('jwtToken');

            const response = await fetch(`http://localhost:8080/user/delete-promotion?promotionId=${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete promotion');
            }

            setPromotions(promotions.filter((promotion) => promotion.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <div>Loading promotions...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container" style={{ paddingTop: '20px' }}>
            <h1 className="bg-dark text-white p-4">User Dashboard</h1>
            <button
                className="btn btn-success mb-4"
                onClick={() => navigate('/createPromotion')}>Create New Promotion</button>


            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {promotions.map((promotion) => (
                        <tr key={promotion.id}>
                            <td>{promotion.id}</td>
                            <td>{promotion.name}</td>
                            <td>{new Date(promotion.startDate).toLocaleDateString()}</td>
                            <td>{new Date(promotion.endDate).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className="btn btn-info btn-sm me-2"
                                    onClick={() => handleViewPromotion(promotion.id)}
                                >
                                    View
                                </button>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEditPromotion(promotion.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeletePromotion(promotion.id)}
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

export default UserDashboard;
