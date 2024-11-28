import React from 'react';
import './styles/adminHome.css';

function AdminHome({ email }) {
    return (
        <div className="admin-home">
            <h1>Welcome Admin</h1>
            <p>You are logged in as: {email}</p>
        </div>
    );
}

export default AdminHome;