const { Server } = require("socket.io");

const io = new Server(3500);

io.on("connection", (socket) => {
  setInterval(() => {
    socket.emit('FIMATENDIMENTO')
  }, 10000);
});
