const app = require('express')();

const server = require('http').createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
    //options for socket.io
    cors: {
        origin: '*',
    },
});

// event in io
io.on('connection', (socket) => {
    console.log('Socket:', socket);
    socket.on('chat', (payload) => {
        console.log('Payload:', payload);
        io.emit('chat', payload);
    });
});

//we dont listen on express's server
// app.listen will not work here.

server.listen(5000);
