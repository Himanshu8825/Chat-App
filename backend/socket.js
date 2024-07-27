const { Server, Socket } = require('socket.io');

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [process.env.ORIGIN],
      methods: ['GET', 'POST'],
    },
  });

  const userSocketMap = new Map();

  const disconnect = (soket) => {
    console.log(`Client disconnected: ${soket.id}`);

    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === soket.id) {
        userSocketMap.delete(userId);
        console.log(
          `User disconnected: ${userId} with socket ID:  ${socketId}`
        );
        break;
      }
    }
  };

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected : ${userId} with socket ID:  ${socket.id}`);
    } else {
      console.log('User ID not provided during connection. ');
    }

    socket.on('disconnect', () => disconnect(socket));
  });
};

module.exports = setupSocket;
