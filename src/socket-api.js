import clientSocket from 'socket.io-client';

export const API_URL = process.env.HOST_SERVER;
const socket = clientSocket(`${API_URL}/calc`);

export const subscribe = (newCallback) => {
    socket.on("calc", (result) => {
        result = JSON.parse(result);
        newCallback(result);
    });
}
