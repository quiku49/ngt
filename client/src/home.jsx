import React, { useState } from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client';
import './home.css'
import { Logout } from './logout';

export const Home = () => {
    const [roomCode, setRoomCode] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const userAuth = JSON.parse(window.localStorage.getItem('userAuth'));
        if (!userAuth || !userAuth.token) {
            window.location.href = '/login'
        }
        else{
            setIsLoading(false)
        }
    }, []);
    const socket = io("http://192.168.1.110:8080")
    socket.on('room', (data) => {
        if (data === 'full' || data === 'not found') {
            alert('room ' + data)
            return
        }
        window.localStorage.setItem('room', JSON.stringify(data))
        window.location.href = '/mastermind'
    })
    const handleCreateRoom = () => {
        socket.emit('newRoom', {
                                    token: JSON.parse(window.localStorage.getItem('userAuth')).token,
                                    userName: JSON.parse(window.localStorage.getItem('userAuth')).user
                                });
    };

    const handleJoinRoom = () => {
        socket.emit('joinRoom', {
                token: JSON.parse(window.localStorage.getItem('userAuth')).token,
                room: roomCode, 
                userName: JSON.parse(window.localStorage.getItem('userAuth')).user
            });
    };
    if (isLoading) {
        return
    }
    else{
        return (
            <div>
                <h1>Welcome to the rooms application</h1>
                <button onClick={handleCreateRoom}>Create room</button>
                <div>
                    <input
                        type="text"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        placeholder="Enter room code"
                    />
                    <button onClick={handleJoinRoom}>Join room</button>
                </div>
                <Logout />
            </div>
        );
    }
}