const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { resetRooms, checkRooms, rooms } = require('./room/rooms')


io.on('connection', socket => {

  setInterval(() => {
    socket.emit('rooms', rooms)
  }, 1000);

  socket.on('join-room', data => {

    console.log('join', data)
    socket.join(data.roomId)

    checkRooms(io.sockets.adapter.rooms, data)

    socket.to(data.roomId).broadcast.emit('user-connected', data.userId)

    socket.on('disconnect', () => {
      socket.to(data.roomId).broadcast.emit('user-disconnected', data.userId)
      resetRooms()
    })

  })
})

server.listen(3000, () => {
  console.log('Port Listening 3000')
})