const app = require('./app');
const SocketService = require('./app/services/SocketService');
const server = require('http').createServer(app);

server.listen(process.env.PORT || 3000, () => console.log('server running'));

app.set('socketService', new SocketService(server));
