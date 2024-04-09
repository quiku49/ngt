import { useState } from 'react';
import './register.css';
import { LOCAL_IP } from '../config';


export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password.trim() == confirmPassword.trim()) {
            var response = await fetch(`http://` + LOCAL_IP + `:8080/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username.trim(),
                    name: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    age: age.trim(),
                    password: password.trim()
                })
            })
            var body = await response.json()
            if (body) {
                window.location.href = "/mastermind";
            }
            else {
                setPassword('')
                setConfirmPassword('')
                setError("Error en el registro.")
            }
        }
        else {
            setPassword('')
            setConfirmPassword('')
            setError("Las contraseñas no coinciden.")
        }

    };
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister} className='register-form'>
                <label><strong>Username:</strong></label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label><strong>Name:</strong></label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <br />
                <label><strong>Last Name:</strong></label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <br />
                <label><strong>Email:</strong></label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label><strong>Age:</strong></label>
                <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <br />
                <label><strong>Password:</strong></label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <label><strong>Confirm Password:</strong></label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br />
                <button type="submit">Register</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};
