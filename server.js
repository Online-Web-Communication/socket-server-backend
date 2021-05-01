const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
//const { v4: uuidV4 } = require('uuid')

app.use(express.static('public'))


io.on('connection', socket => {

  socket.on('join-room', data => {

    console.log('join', data)
    socket.join(data.roomId)
    socket.to(data.roomId).broadcast.emit('user-connected', data.userId)

    socket.on('disconnect', () => {
      socket.to(data.roomId).broadcast.emit('user-disconnected', data.userId)
    })

  })
})

server.listen(3000, () => {
  console.log('Port Listening 3000')
})