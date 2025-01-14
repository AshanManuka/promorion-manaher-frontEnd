import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserDashboard from './pages/UserDashboard';
import ViewPromotion from './pages/ViewPromotion';
import ManageUser from './pages/manageUser';
import UserOperate from './pages/userOperate';
import CreatePromotion from './pages/CreatePromotion';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/userDashboard" element={<UserDashboard />} />
                <Route path='/manageUser' element={<ManageUser/>}/>
                <Route path='/viewPromotion/:id' element={<ViewPromotion/>}/>
                <Route path='/createPromotion' element={<CreatePromotion/>}/>
                <Route path='/createPromotion/:id' element={<CreatePromotion/>}/>
                <Route path='/userOperate' element={<UserOperate/>} />
                <Route path='/userOperate/:userId' element={<UserOperate/>} />
            </Routes>
        </Router>
    );
};

export default App;
