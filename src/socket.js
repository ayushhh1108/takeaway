import { io } from 'socket.io-client';

// Replace with your backend server URL
const socket = io(process.env.REACT_APP_API_BASE_URL, {
  transports: ['websocket'], // Ensures WebSocket transport is used
  reconnection: true, // Automatically reconnect on disconnect
});

export default socket;
