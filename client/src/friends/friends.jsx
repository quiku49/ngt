import { useEffect, useState } from 'react';
import { LOCAL_IP } from '../../config';

export const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [newFriend, setNewFriend] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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
        const response = await fetch(`http://` + LOCAL_IP + `:8080/api/makeFriend`, {
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
    }
    if (isLoading) {
        return
    }
    else {
        return (
            <div className="friends">
                <h1>Amigos</h1>
                <div className="friendstext">
                    <p>
                        En esta sección podrás ver tus amigos y agregar nuevos amigos.
                        <br></br><br></br>Para agregar un amigo, simplemente escribe su nombre de usuario en el campo de texto y presiona el botón de agregar.
                        <br></br><br></br>Para eliminar un amigo, simplemente presiona el botón de eliminar.
                        <br></br>
                        <input
                            type="text"
                            value={newFriend}
                            onChange={e => setNewFriend(e.target.value)}
                            placeholder="Nombre de usuario del nuevo amigo"
                        />
                        <button onClick={handleAddFriend}>Agregar</button>
                        <ul>
                            {friends.map(friend => (
                                <div key={friend.friend} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid', width: '220px' }}>
                                    <p>{friend.friend}</p>
                                    <button style={{ position: 'absolute', left: '200px' }}>Eliminar</button>
                                </div>
                            ))}
                        </ul>
                    </p>
                </div>

            </div >
        );
    }
}
async function fetchFriends(user) {
    const response = await fetch(`http://` + LOCAL_IP + `:8080/api/friends?user=${user}`, {
        method: "GET"
    })
    var body = await response.json()

    return body;
}