import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'
import { LOCAL_IP } from '../../config';
export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault();
        var response = await fetch(`http://` + LOCAL_IP + `/api/user?user=${username}`, {
            method: "GET"
        })
        var body = await response.json()
        if (body) {
            response = await fetch(`http://` + LOCAL_IP + `/api/login?user=${username}&pass=${password}`, {
                method: "GET"
            })
            body = await response.json()
            if (body.bool) {
                window.localStorage.setItem('userAuth', JSON.stringify(body))
                window.location.href = "/home";
            }
            else {
                setError("Usuario o contraseña incorrectos.")
            }
        }
        else {
            setError("Usuario o contraseña incorrectos.")
        }
    }
    return (
        <div>
            <div className='top'>
                <Link className='link' to="/"><button> Volver al inicio </button></Link>
                <h1>Login</h1>
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br />
            <form className='login-form' onSubmit={handleSubmit}>
                <div>
                    <label><strong>Nombre de Usuario:  </strong></label>
                    <input type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        name="username" />
                </div>
                <br />
                <div>
                    <label><strong>Contraseña:  </strong></label>
                    <input type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        name="password" />
                </div>
                <br /><br />
                <button type="submit"> Iniciar Sesión </button>
                <br /><br />
                <Link to="/register"><button>Registrarse</button></Link>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}
