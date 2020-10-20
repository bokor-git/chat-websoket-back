import express from 'express'
import http from 'http'
import socketio from 'socket.io'


const app = express()

const server = http.createServer(app)

const socket = socketio(server);

const messages = [
    {message: "Hello", id: "vs32gg34g34g", user: {id: "sdvsddv24f4", name: "Dimych"}},
    {message: "Hello 2", id: "vs32sdgsg34g", user: {id: "sdg34g4f4", name: "Alex"}},
    {message: "Hello yo yo", id: "vs32dsfsgsg34g", user: {id: "sdsdfg4f4", name: "Peter"}}
]

app.get('/', (req, res) => {
    res.send("Its WebSocket Server");
});

socket.on('connection', (socketChannel) => {
    socketChannel.on('client-message-sent', (message: string) => {
        let messageItem = {message: message, id: "vs32sdgsg34g"+new Date().getTime(), user: {id: "sdg34g4f4", name: "Alex"}};
        messages.push(messageItem)

        socket.emit("new-message-sent",messageItem)
    });

    socketChannel.emit("innit-massaged-published",messages)

    console.log('a user connected');
});

const PORT = process.env.PORT || 3009
server.listen(PORT, () => {
    console.log('listening on *:3009');
});