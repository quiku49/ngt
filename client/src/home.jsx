import { useState } from 'react';
import { useEffect } from 'react';
import './home.css'
import '../style.css'
import { Logout } from './auth/logout';
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
                <h1>Bienvenido a NGT</h1>
                <div className='home'>
                    <Logout />
                    <h2>Juegos disponibles</h2>
                    <div className="games">

                        <a href="/mmhome">
                            <img className="imgMM" src="./resources/MasterMind.jpg" alt="MasterMind" /> <br />
                        </a>

                    </div>
                </div>
            </div>
        );
    }
}