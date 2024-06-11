import io from 'socket.io-client';
import { LOCAL_IP } from './config.js';

const socket = io("http://" + LOCAL_IP );
// Generate a unique room ID
const roomId = Math.random().toString(36).substring(7);

// Emit an event to the server to create a new room
socket.emit('createRoom', roomId);

// Listen for the 'roomCreated' event from the server
socket.on('roomCreated', () => {
  console.log(`Room ${roomId} created!`);

  // Emit an event to the server to join the room
  socket.emit('joinRoom', roomId);

  // Listen for the 'roomJoined' event from the server
  socket.on('roomJoined', () => {
    console.log(`Joined room ${roomId}`);
  });
});