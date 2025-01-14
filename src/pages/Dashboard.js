import React from 'react';
import { useNavigate } from 'react-router-dom';
import scheduleImg from '../assets/scheduleImg.png';
import accountImg from '../assets/accountImg.png';

const Dashboard = () => {

    const navigate = useNavigate();

    const handleManageUsers = () => {
        navigate('/manageUser');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ backgroundColor: '#123524', color: 'white', padding: '30px' }}>Admin Dashboard</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <button
                    className="btn btn-primary"
                    style={{
                        width: '49%',
                        height: '30vh',
                        backgroundColor: '#7C444F',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    <h3 style={{ marginBottom: 'auto' }}>View Promotions</h3>
                    <img
                        src={scheduleImg}
                        alt="Promotion Icon"
                        style={{
                            width: '100px',
                            height: '100px',
                            position: 'absolute',
                            bottom: '10px',
                        }}
                    />
                </button>
                <button
                    className="btn btn-primary"
                    style={{
                        width: '49%',
                        height: '30vh',
                        backgroundColor: '#009990',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    <h3 style={{ marginBottom: 'auto' }}>Manage System Users</h3>
                    <img
                        src={accountImg}
                        alt="User Icon"
                        style={{
                            width: '100px',
                            height: '100px',
                            position: 'absolute',
                            bottom: '10px',
                        }}
                        onClick={handleManageUsers}
                    />
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
