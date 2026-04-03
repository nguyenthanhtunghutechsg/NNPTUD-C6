let { Server } = require('socket.io')
module.exports = {
    ServerSocket: function (server) {
        let io = new Server(server)
        io.on('connection', (socket) => {
            console.log('a user connected');
        });
    }
}