const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const port = 3000;

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('chat message', message => {
        console.log(message)
    })
})

server.listen(port, () => console.log(`running on port ${port}`))