import SocketIO from "App/Services/SocketIO";
import Redis from '@ioc:Adonis/Addons/Redis'

SocketIO.boot()

SocketIO.io.on('connection', (socket) => {
    socket.on('user:reset-socket', (id) => {
        socket.emit('connected-to-server', `Hello ${socket.id}`)
        Redis.hset('onlineUsers', id, socket.id)
    })
})

//     socket.on('disconnect', () => {
//         Redis.hdel
//     })
// })

