import React, { useState } from 'react';
import './login.css'
export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault();
        var response = await fetch(`http://192.168.1.110:8080/user?user=${username}`, {
            method: "GET"
        })
        
        var body = await response.json()
        if(body)
        {
            response = await fetch(`http://192.168.1.110:8080/login?user=${username}&pass=${password}`, {
                method: "GET"
            })
            body = await response.json()
            if (body){
                window.location.href = "/mastermind";
            }
        }
        else{
            setError("Usuario o contraseña incorrectos.")
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className="input">
                    <label><strong>Username:  </strong></label>
                    <input type="text" 
                        value = {username}
                        onChange={(e) => setUsername(e.target.value)}
                        name="username" />
                </div>
                <br />
                <div className="input">
                    <label><strong>Password:  </strong></label>
                    <input type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        name="password" />
                </div>
                <button type="submit"> Log in </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}