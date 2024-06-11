import { useState } from 'react';

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
            <h1>Login</h1>
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
                <button type="submit"> Iniciar Sesión </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}
