import express from 'express'
import http from 'http'
import socketio from 'socket.io'


const app = express()

const server = http.createServer(app)

const socket = socketio(server);

const usersState = new Map()

const messages: Array<any> = []

app.get('/', (req, res) => {
    res.send("Its WebSocket Server");
});

socket.on('connection', (socketChannel) => {

    socket.on('disconnect', () => {
        usersState.delete(socketChannel)
    });
    usersState.set(socketChannel, {id: new Date().getTime().toString(), name: "anonym"})
    socketChannel.on("client-name-sent", (name: string) => {
        const user = usersState.get(socketChannel);
        user.name = name
    })
    socketChannel.on("client-typed", () => {
        socket.emit("user-typing", usersState.get(socketChannel))
    })

    socketChannel.on('client-message-sent', (message: string) => {
        if (typeof message !== "string") {
            return
        }
        const user = usersState.get(socketChannel);
        let messageItem = {
            message: message,
            id: new Date().getTime(),
            user: {id: user.id, name: user.name}
        };
        messages.push(messageItem)

        socket.emit("new-message-sent", messageItem)
    });

    socketChannel.emit("innit-massaged-published", messages)

    console.log('a user connected');
});

const PORT = process.env.PORT || 3009
server.listen(PORT, () => {
    console.log('listening on *:3009');
});