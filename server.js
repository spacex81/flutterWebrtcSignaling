const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;
const io = socketIo(server, {
  path: '/api/websocket',
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.use((socket, next) => {
  if (socket.handshake.query && socket.handshake.query.callerId) {
    let callerId = socket.handshake.query.callerId;
    socket.user = callerId;
    next();
  } else {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log(`${socket.user} Connected`);
  socket.join(socket.user);

  socket.on('makeCall', (data) => {
    let calleeId = data.calleeId;
    let sdpOffer = data.sdpOffer;

    socket.to(calleeId).emit('newCall', {
      callerId: socket.user,
      sdpOffer: sdpOffer,
    });
  });

  // Add other event listeners here
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
