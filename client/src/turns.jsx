import io from "socket.io-client";
import { LOCAL_IP } from "../config.js";

export const Turns = () => {
    const socket = io("http://" + LOCAL_IP)
    const handleTurns = () => {
        socket.emit('turns', Math.floor(Math.random() * 2));
    };

    return (
        <button
            className="button-74"
            role="button"
            onClick={handleTurns}>
            Turns
        </button>
    );
};