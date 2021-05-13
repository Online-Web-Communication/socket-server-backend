require('dotenv').config()
const express = require('express')
const app = express()
const { v4: uuidV4 } = require('uuid')
const http = require('http').Server(app)
const io = require('socket.io')(http)

const { resetRooms, checkRooms, rooms } = require('./room/rooms')

const port = process.env.PORT


http.listen(port, () => {
  console.log('listening ' + port)
})

var socketRooms = []

io.on('connection', socket => {
  console.log('bağlandı')

  setInterval(() => {
    socket.emit('rooms', rooms)
  }, 1000);

  socket.on('create or join', room => {
    // const myRoom = io.sockets.adapter.rooms[room] || { length: 0 }
    // const numClients = myRoom.length

    socket.join(room)
    socketRooms.push({ socket_id: socket.id, room: room, uuid: uuidV4() })
    checkRooms(io.sockets.adapter.rooms, room)
    io.to(socket.id).emit('mySocket', { room: room, uuid: socketRooms[socketRooms.length - 1].uuid, socket_id: socket.id, clients: socketRooms })

    let isRoom = socketRooms.find(x => { return x.room == room })
    if (!isRoom) {
      console.log(socket.id, 'Kullanıcısı,', room, ' Odasını Oluşturdu.')
    } else {
      console.log(socket.id, 'Kullanıcısı,', room, 'Odasına Katıldı. Odadaki Kullanıcı Sayısı', socketRooms.filter(x => x.room === room).length)
    }
  })

  socket.on('ready', data => {
    io.to(data.your).emit('joined', data)
  })

  socket.on('sendAnswer', data => {
    io.to(data.socket_id).emit('response', data)
  })

  socket.on('candidate', event => {
    io.to(event.socket_id).emit('candidate', event)
  })

  socket.on('disconnect', () => {
    const index = socketRooms.findIndex(x => x.socket_id == socket.id)
    if (index != -1) socketRooms.splice(index, 1)
    console.log("Kullanıcı Ayrıldı:", socket.id)
    resetRooms()

  })
})