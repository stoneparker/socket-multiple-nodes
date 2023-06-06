const { io } = require("socket.io-client");

const socket = io(
  'http://localhost:9000',
  { transports: ['websocket'] }
);

socket.on('connect', () => {
  console.log(new Date(), '- connected with server');

  setInterval(() => {
    console.log('pinnng')
    socket.emit('ping');
  }, 5000);

  socket.on('pong', (pid) => {
    console.log(`received message from server`);
  });


  socket.on('FIMATENDIMENTO', () => {
    console.log('received FIMATENDIMENTO');
  })
});

socket.on('disconnect', () => {
  console.log(new Date(), '- disconnected with server');
});

// const socket1 = io(
//   'http://localhost:9000',
//   { transports: ['websocket'] }
// );

// socket1.on('connect', () => {
//   console.log(new Date(), '- connected with server');

//   setInterval(() => {
//     console.log('pinnng')
//     socket1.emit('ping');
//   }, 5000);

//   socket1.on('pong', (pid) => {
//     console.log(`received message from server`);
//   });


//   socket1.on('FIMATENDIMENTO', () => {
//     console.log('received FIMATENDIMENTO');
//   })
// });

// socket1.on('disconnect', () => {
//   console.log(new Date(), '- disconnected with server');
// });

