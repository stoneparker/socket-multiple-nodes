const { createServer } = require("http");
const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const { Cluster } = require("ioredis");
const Redis = require("ioredis");
const { setupWorker } = require("@socket.io/sticky");
const { io: ioClient } = require("socket.io-client");

const redis = new Redis();

const centralSocket = ioClient(
  'http://localhost:3500',
  { transports: ['websocket'] }
);

centralSocket.on('connect', () => {
  console.log('connected with central');
});

const httpServer = createServer();
const io = new Server(httpServer);

const pubClient = new Cluster([
  {
    host: "localhost",
    port: 6379,
  }
]);

pubClient.on('error', (err) => {
  console.log('error on pubClient', err);
});

const subClient = pubClient.duplicate();

subClient.on('error', () => {
  console.log('error on subClient');
})

io.adapter(createAdapter(pubClient, subClient));
io.listen(3000);
setupWorker(io);

console.log('server1 started');

let client = null;

io.on("connection", (socket) => {
  console.log(`client ${socket.id} connected on server1`);

  client = socket;

  socket.on('ping', () => {
    console.log(`Client message from ${socket.id} received on server1 on ${process.pid}`);
    socket.emit('pong');
  })
});

centralSocket.on('FIMATENDIMENTO', async () => {
  console.log('FIMATENDIMENTO on server1');

  if (client) {
    client.emit('FIMATENDIMENTO');
  }
});
