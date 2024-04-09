import { useState } from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client';
import './home.css'
import { Logout } from './logout';
import { LOCAL_IP } from '../config';
export const Home = () => {
    const [roomCode, setRoomCode] = useState('');
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
    const socket = io("http://" + LOCAL_IP + ":8080")
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
    else {
        return (
            <div>
                <h1>Bienvenido a NGT</h1>
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