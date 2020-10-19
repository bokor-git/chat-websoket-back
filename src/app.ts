import express from 'express'
import http from 'http'
import socketio from 'socket.io'


const app = express()

const server = http.createServer(app)

const io = socketio(server);


app.get('/', (req, res) => {
    res.send("Its WebSocket Server");
});

io.on('connection', (socket) => {
    console.log('a user connected');
});
const PORT = process.env.PORT||3009
server.listen(PORT, () => {
    console.log('listening on *:3009');
});