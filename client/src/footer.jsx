import React from 'react';
import logo from '../resources/logoNoBG.png'

export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer style={{position: 'fixed', display: 'flex', bottom: '0', height: '30px' , width: '100%', backgroundColor: '#f8f9fa', textAlign: 'center', padding: '10px',  justifyContent: 'space-around', alignItems: 'center'}}>
            <img src={logo} alt="Logo" style={{width: '35px', height: '20px'}}/>
            <p>Email: soporte@nextgentable.es</p>
            <p>{year}</p>
        </footer>
    );
};

