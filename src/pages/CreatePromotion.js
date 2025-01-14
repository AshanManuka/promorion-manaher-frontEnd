import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CreatePromotion = () => {
    const { id } = useParams(); 
    const [promotion, setPromotion] = useState({
        name: '',
        startDate: '',
        endDate: '',
        banner: null,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const fetchPromotion = async () => {
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
                setPromotion({
                    name: data.body.name,
                    startDate: new Date(data.body.startDate).toISOString().slice(0, 16),
                    endDate: new Date(data.body.endDate).toISOString().slice(0, 16), 
                    banner: data.body.banner,
                });
            } else {
                setError('Error fetching promotion details');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (id) fetchPromotion();
    }, [id]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPromotion((prevState) => ({
            ...prevState,
            banner: file,
        }));
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formattedStartDate = new Date(promotion.startDate).toISOString().split('T')[0].replace(/-/g, '/');
        const formattedEndDate = new Date(promotion.endDate).toISOString().split('T')[0].replace(/-/g, '/');

        const formData = new FormData();
        formData.append('name', promotion.name);
        formData.append('startDate', formattedStartDate);
        formData.append('endDate', formattedEndDate);
        formData.append('banner', promotion.banner);

        try {
            const token = localStorage.getItem('jwtToken');
            const url = id
                ? `http://localhost:8080/user/update-promotion?promotionId=${id}`
                : 'http://localhost:8080/user/create-promotion'; 

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to create or update promotion');
            }

            const data = await response.json();
            if (data.success) {
                navigate('/userDashboard');
            } else {
                setError('Error creating/updating promotion');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '20px' }}>
            <h1 className="bg-dark text-white p-4">
                {id ? 'Edit Promotion' : 'Create New Promotion'}
            </h1>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Promotion Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={promotion.name}
                        onChange={(e) => setPromotion({ ...promotion, name: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Start Date</label>
                    <input
                        type="datetime-local"
                        id="startDate"
                        className="form-control"
                        value={promotion.startDate}
                        onChange={(e) => setPromotion({ ...promotion, startDate: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">End Date</label>
                    <input
                        type="datetime-local"
                        id="endDate"
                        className="form-control"
                        value={promotion.endDate}
                        onChange={(e) => setPromotion({ ...promotion, endDate: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="banner" className="form-label">Upload Banner Image</label>
                    <input
                        type="file"
                        id="banner"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                    {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2" style={{ width: '100px', height: 'auto' }} />}
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default CreatePromotion;
