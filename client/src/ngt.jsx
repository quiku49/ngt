import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import '../style.css'
export const Ngt = () => {
    const [isLoading, setIsLoading] = useState(true);
    

    
        return (
            <div>
                <h1><img src="/resources/logoNoBG.png" alt="NGT" /></h1>
                <h2>Next Generation table</h2>
                <div className='Description'>
                    <h3>NGT es una aplicación web diseñada especialmente para facilitar la conexión entre personas mayores y sus familiares a través de juegos de mesa clásicos.
                        Nuestra misión es promover la inclusión digital y fortalecer los lazos familiares, 
                        permitiendo que jugadores de todas las edades disfruten de momentos de diversión y entretenimiento, sin importar la distancia.
                    </h3>
                    <h3>En NGT, creemos que la tecnología puede y debe ser accesible para todos. 
                        Queremos derribar las barreras digitales y ofrecer una plataforma que no solo entretenga, sino que también conecte a las personas. 
                        Ya sea que estés cerca o lejos de tus seres queridos, aquí siempre tendrás un lugar para compartir y disfrutar.
                    </h3>
                    <h3>¡Únete a nuestra comunidad y comienza a disfrutar de los juegos de mesa clásicos de una manera nueva y emocionante!</h3>
                    <Link to="/login"><button>Iniciar sesión</button></Link>
                    <Link to="/register"><button>Registrarse</button></Link>
                </div>
            </div>
        );
    }