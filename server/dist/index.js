import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from "socket.io";
const PORT = 8888;
const io = new Server(server, {
    cors: {
        origins: ["http://192.168.1.94:3000", "http://localhost:3000"]
    }
});
io.on('connection', socket => {
    console.log('Пользователь подключился');
    // Подписываемся на событие отправки сообщения пользователя
    socket.on('sendMessage', message => {
        console.log('Отправлено сообщение: ' + message);
        // Отправляем сообщение всем подключенным клиентам
        io.emit('message', message);
    });
    socket.on('connectedUser', user => {
        io.emit('userName', user);
    });
    socket.on('discon', user => {
        io.emit('disconnectedUser', user);
        console.log('Отключился пользователь', user);
    });
    // Подписываемся на событие отключения пользователя
    socket.on('disconnect', (user) => {
        console.log('Пользователь отключился');
    });
});
server.listen(8888, '0.0.0.0', () => {
    console.log('Подключение');
});
