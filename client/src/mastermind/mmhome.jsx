import { useState } from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client';
import './mmhome.css'
import '../../style.css'
import { Logout } from '../auth/logout';
import { LOCAL_IP } from '../../config';
export const MMHome = () => {
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
    const socket = io("http://" + LOCAL_IP)
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
    const handleFriends = () => {
        window.location.href = '/friends'
    }
    if (isLoading) {
        return
    }
    else {
        return (
            <div>
                <h1>Bienvenido a MasterMind</h1>
                <div className='mmhome'>
                    <button
                        className="button-74"
                        role="button"
                        onClick={handleFriends}>
                        Ver amigos
                    </button>
                    <button
                        className="button-74"
                        role="button"
                        onClick={handleCreateRoom}>
                        Crear Sala
                    </button>
                    <div className='inputRoomCode'>
                        <input
                            className='inputMM'
                            type="text"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                            placeholder="Introduce código de sala"
                        />
                        <button
                            className="button-74"
                            role="button"
                            onClick={handleJoinRoom}>
                            Unirse a Sala
                        </button>
                    </div>
                    <Logout />
                </div>
            </div>
        );
    }
}