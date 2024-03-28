import React, { useState } from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client';
import './home.css'

export const Home = () => {
    const [roomCode, setRoomCode] = useState('');
    useEffect(() => {
        const userAuth = JSON.parse(window.localStorage.getItem('userAuth'));
        if (!userAuth || !userAuth.token) {
            window.location.href = '/login'
        }
    }, []);
    const socket = io("http://192.168.1.110:8080")
    socket.on('room', (data) => {
        window.localStorage.setItem('room', data)
        window.location.href = '/mastermind'
    })
    const handleCreateRoom = () => {
        socket.emit('newRoom', JSON.parse(window.localStorage.getItem('userAuth')).token);
    };

    const handleJoinRoom = () => {
        socket.emit('joinRoom', {
                token: JSON.parse(window.localStorage.getItem('userAuth')).token,
                room: roomCode
            });
    };

    return (
        <div>
            <h1>Bienvenido a la aplicación de salas</h1>
            <button onClick={handleCreateRoom}>Crear sala</button>
            <div>
                <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    placeholder="Ingresa el código de sala"
                />
                <button onClick={handleJoinRoom}>Unirse a sala</button>
            </div>
        </div>
    );
}