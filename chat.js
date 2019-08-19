const express = require('express');
const app = express();
const socketio = require('socket.io')
var favicon = require('serve-favicon');

let namespaces = require('./data/namespaces');

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

io.on('connection', (socket) => {
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint
    }
  })
  socket.emit('nsList', nsData);
})

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on('connection', (nsSocket) => {

    const username = nsSocket.handshake.query.username;

    console.log(`${nsSocket.id} has joined ${namespace.endpoint}`)
    nsSocket.emit('nsRoomLoad', namespace.rooms)
    nsSocket.on('joinRoom', (roomToJoin, numberOfUsersCallBack) => {
      
      const roomToLeave = Object.keys(nsSocket.rooms)[1];
      nsSocket.leave(roomToLeave);
      updateUsersInRoom(namespace, roomToLeave);
      nsSocket.join(roomToJoin);

      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomToJoin;
      })
      nsSocket.emit('historyCatchUp', nsRoom.history);
      updateUsersInRoom(namespace, roomToJoin);
    })

    nsSocket.on('newMessageToServer', (msg) => {
      const fullMsg = {
        text: msg.text, 
        time: Date.now(),
        username: username,
        avatar: 'https://via.placeholder.com/30'
      }

      const roomTitle = Object.keys(nsSocket.rooms)[1];
      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomTitle;
      })

      nsRoom.addMessage(fullMsg);
      io.of(namespace.endpoint).to(roomTitle).emit('messageToClients', fullMsg);
    })
  })
})

function updateUsersInRoom(namespace, roomToJoin){
  io.of(namespace.endpoint).in(roomToJoin).clients((error, clients) => {
    io.of(namespace.endpoint).in(roomToJoin).emit('updateMembers', clients.length)
  })
}


