import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewPromotion = () => {
    const { id } = useParams();  
    const [promotion, setPromotion] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchPromotionById = async () => {
        try {
            const token = localStorage.getItem('jwtToken');

            const response = await fetch(`http://localhost:8080/user/single-promotion-by-user?promotionId=${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch promotion details');
            }

            const data = await response.json();

            if (data.success) {
                setPromotion(data.body);
            } else {
                setError('Error fetching promotion details');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPromotionById();
    }, [id]);

    if (loading) return <div>Loading promotion...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container" style={{ paddingTop: '20px' }}>
            <h1 className="bg-dark text-white p-4">Promotion Details</h1>

            {promotion && (
                <div>
                    <h3>{promotion.name}</h3>
                    <p><strong>Start Date:</strong> {new Date(promotion.startDate).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(promotion.endDate).toLocaleDateString()}</p>

                    {}
                    {promotion.banner && (
                        <img
                            src={`data:image/jpeg;base64,${promotion.banner}`} 
                            alt="Promotion Banner"
                            style={{ width: '25%', height: 'auto', borderRadius: '8px' }}
                        />
                    )}
                </div>
            )}

            <button className="btn btn-secondary mt-4" onClick={() => navigate('/userDashboard')} >Back to Dashboard</button>
        </div>
    );
};

export default ViewPromotion;
