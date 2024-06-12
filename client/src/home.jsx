import { useState } from 'react';
import { useEffect } from 'react';
import './home.css'
import '../style.css'
import { Logout } from './auth/logout';
import mastermind from '../resources/MasterMind.gif';
import proximamente from '../resources/proximamente.gif';
import { Link } from 'react-router-dom';
import { Footer } from './footer';

export const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const userAuth = JSON.parse(window.localStorage.getItem('userAuth'));
        if (!userAuth || !userAuth.token) {
            window.location.href = '/login'
        }
        else {
            setIsLoading(false)
        }
    }, []);

    if (isLoading) {
        return
    }
    else {
        return (
            <div>

                <div className='top'>
                    <div className='topButtons'>
                        <Link className='link' to="/friends">
                            <button
                                className="button-74"
                                role="button">
                                Amigos
                            </button>
                        </Link>
                            <br />
                        <Link className='link' to="/home">
                            <button
                                className="button-74"
                                role="button">
                                Premios
                            </button>
                        </Link>
                    </div>
                    <h1>Bienvenido a NGT</h1>
                    <div className='topButtons'>
                        <Link className='link' to="/home">
                            <button
                                className="button-74"
                                role="button">
                                Volver a inicio
                            </button>
                        </Link>
                        <br />
                        <Logout />
                    </div>
                </div>
                <br /><br /><br /><br /><br /><br /><br /><br />
                <div className='home'>
                    <h2>Juegos disponibles</h2>
                    <h3>Pulsa en un juego para acceder a él</h3>
                    <br /><br /><br />
                    <div className="games">
                        <Link to="/mmhome">
                            <img className="imgMM" src={mastermind} alt="MasterMind" /> <br />
                        </Link>
                        <br />
                        <Link to="">
                            <img className="imgMM" src={proximamente} alt="MasterMind" /> <br />
                        </Link>

                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}