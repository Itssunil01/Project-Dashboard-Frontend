import { io } from "socket.io-client";

let socket: any;

export const connectSocket = () => {
  socket = io("http://localhost:5000");
};

export const getSocket = () => socket;