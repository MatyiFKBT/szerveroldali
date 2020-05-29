const db = require('./models')
const app = require('http').createServer()
const io = require('socket.io')(app);

io.on('connection', (socket) => {
  console.log('Connected');
  
  socket.on('create-room', async (ack) => {
    try {
      const { uuid } = await db.rooms.create()
      socket.join(uuid);
      ack({ status: 'ok', roomId: uuid})
    }
    catch (e) {
      ack({ status: 'error', message: e.message})
    }
  })

  socket.on('join-room', async (uuid, ack) => {
    try {
      // csatlakozás szobához
      // nincs ilyen szoba
      const allRooms = io.sockets.adapter.rooms;
      if (!Object.keys(allRooms).includes(uuid)) {
        throw new Error('No such room id.')
      }
      socket.join(uuid);
      
      // szoba state lekérése
      //nincs benne db-ben a uuid, meghal a db query
      const room = await db.rooms.findOne({
        where: {uuid} 
      })
      if (!room) {
        throw new Error('No such room in database.')
      }

      if (allRooms[uuid].length === 2) {
        const clients = Object.keys(allRooms[uuid].sockets)
        clients.forEach((socketId, i) => {
          io.to(socketId).emit('room-is-full', {
            roomId: uuid,
            player: i + 1
          });
        })
      }

      // visszaadás
      ack({ status: 'ok', state: room.state})
    }
    catch (e) {
      ack({ status: 'error', message: e.message})
    }
  })

  socket.on('sync-state', async (uuid, state, ack) => {
    try {
      // nincs ilyen szoba
      const allRooms = io.sockets.adapter.rooms;
      if (!Object.keys(allRooms).includes(uuid)) {
        throw new Error('No such room id.')
      }

      // benne vagyok-e a szobában
      // ...
      
      // db módosítás
      const room = await db.rooms.update({ state }, { where: { uuid } })

      // szoba state lekérése

      // broadcast
      socket.broadcast.to(uuid).emit('state-changed', { state }); 

      ack({ status: 'ok' })
    }
    catch (e) {
      ack({ status: 'error', message: e.message})
    }
  })

});

async function start() {
  db.sequelize.sync();
  app.listen(8080);
}
start()