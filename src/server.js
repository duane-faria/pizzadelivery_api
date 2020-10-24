const app = require('./app');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.emit('message', 'Mensagem vinda da api');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

server.listen(process.env.PORT || 3000, () => console.log('server running'));
