import { useEffect, useState } from 'react';
import { LOCAL_IP } from '../../config';
import { Logout } from '../auth/logout';
import { Link } from 'react-router-dom';
import './friends.css';
import { Footer } from '../footer';

export const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [newFriend, setNewFriend] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('')

    useEffect(() => {
        const userAuth = JSON.parse(window.localStorage.getItem('userAuth'));
        if (!userAuth || !userAuth.token) {
            window.location.href = '/login'
        }
        else {
            setIsLoading(false)
            const user = JSON.parse(window.localStorage.getItem('userAuth')).user;
            fetchFriends(user).then(friends => setFriends(friends));
        }

    }, []);
    async function handleAddFriend() {
        const user = JSON.parse(window.localStorage.getItem('userAuth')).user;
        const response = await fetch(`http://` + LOCAL_IP + `/api/makeFriend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: user.trim(),
                friend: newFriend.trim()
            })

        })
        var body = await response.json()
        if (body) {
            fetchFriends(user).then(friends => setFriends(friends));
            setNewFriend('');
        }
        else{
            setError("Error al agregar el amigo, asegúrese de que el usuario exista.")
        }
    }
    async function handleDeleteFriend(key) {
        const user = JSON.parse(window.localStorage.getItem('userAuth')).user ? JSON.parse(window.localStorage.getItem('userAuth')).user : '';
        const response = await fetch(`http://` + LOCAL_IP + `/api/deleteFriend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: user.trim(),
                friend: key.trim()
            })

        })
        var body = await response.json()
        if (body) {
            fetchFriends(user).then(friends => setFriends(friends));
        }
        else {
            setError("Error al eliminar el amigo.")
        }
    }
    if (isLoading) {
        return
    }
    else {
        return (
            <div className="friends">
                <div className='top'>
                    <div className='topButtons'>
                            <br />
                        <Link className='link' to="/home">
                            <button
                                className="button-74"
                                role="button">
                                Premios
                            </button>
                        </Link>
                    </div>
                    <h1>Amigos</h1>
                    <div className='topButtons'>
                        <Link className='link' to="/home">
                            <button
                                className="button-74"
                                role="button">
                                Volver a inicio
                            </button>
                        </Link>
                        <br />
                        <Logout />
                    </div>
                </div>
                <br /><br /><br /><br /><br /><br /><br /><br />
                <div className="friendstext">
                    <p>
                        En esta sección podrás ver tus amigos y agregar nuevos amigos.
                        <br></br><br></br>Para agregar un amigo, simplemente escribe su nombre de usuario en el campo de texto y presiona el botón de agregar.
                        <br></br><br></br>Para eliminar un amigo, simplemente presiona el botón de eliminar.
                        <br></br><br></br><br></br>
                        <input
                        className='inputFriend'
                            type="text"
                            value={newFriend}
                            onChange={e => 
                                setNewFriend(e.target.value)
                            }
                            placeholder="Nombre de usuario del nuevo amigo"
                        />
                        <button
                            className='friendButton'
                            onClick={handleAddFriend}>Agregar</button>
                            
                        {error && <div className="error" style={{color:'red', fontWeight:'bold'}}><br />{
                            setTimeout(() => {
                                setError('');
                            }, 10000) &&
                            error
                        }</div>}
                    </p>
                    <ul>
                        {friends.map(friend => (
                            <div className='friend' key={friend.friend} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid', width: '280px' }}>
                                <h2>{friend.friend}</h2>
                                <button style={{ position: 'absolute', left: '780px' }}
                                        onClick={() => handleDeleteFriend(friend.friend)}>
                                    Eliminar</button>
                            </div>
                        ))}
                    </ul>
                </div>
                <Footer />
            </div >
        );
    }
}
async function fetchFriends(user) {
    const response = await fetch(`http://` + LOCAL_IP + `/api/friends?user=${user}`, {
        method: "GET"
    })
    var body = await response.json()

    return body;
}