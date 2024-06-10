import io from "socket.io-client";
import { LOCAL_IP } from "../../config.js";

export const Logout = () => {
    const socket = io("http://" + LOCAL_IP + ":8080")
    const handleLogout = () => {
        socket.emit('logOut', {
            room: JSON.parse(window.localStorage.getItem('room'))?.roomid,
            userName: JSON.parse(window.localStorage.getItem('userAuth'))?.user
        });
        window.localStorage.removeItem('userAuth');
        window.localStorage.removeItem('room');
        window.localStorage.removeItem('mastermindState');
        window.location.href = '/';
    };

    return (
        <button
            className="button-74"
            role="button"
            onClick={handleLogout}>
            Cerrar Sesión
        </button>
    );
};