let { Server } = require('socket.io')
let userSchema = require('../schemas/users')
let jwt = require('jsonwebtoken')


module.exports = {
    ServerSocket: function (server) {
        let io = new Server(server)
        io.on('connection', (socket) => {
            socket.on('welcome', async data => {
                let token = data.auth;
                let result = jwt.verify(token, "secret")
                if (result.exp * 1000 > Date.now()) {
                    let user = await userSchema.findById(result.id);
                    socket.join(result.id)
                    socket.emit('username', user.username)

                }
            })
            socket.on('newMess', data => {
                io.to(data.from._id).emit("newMess")
                io.to(data.to._id).emit("newMess")
            })
            socket.on('user02', data => {
                socket.join(data)
            })
        });
    }
}
//emit : gui 
//on : cho`