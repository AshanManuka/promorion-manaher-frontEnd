import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageUser from './pages/manageUser';
import UserOperate from './pages/userOperate';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/manageUser' element={<ManageUser/>}/>
                <Route path='/userOperate' element={<UserOperate/>} />
                <Route path='/userOperate/:userId' element={<UserOperate/>} />
            </Routes>
        </Router>
    );
};

export default App;
