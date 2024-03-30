import React from 'react';

export const Logout = () => {
    const handleLogout = () => {
        window.localStorage.removeItem('userAuth');
        window.localStorage.removeItem('room');
        window.localStorage.removeItem('mastermindState');
        window.location.href = '/';
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};
