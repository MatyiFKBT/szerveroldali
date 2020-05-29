// const Track = require('./models/track.js')
const models = require('./models/')
const { track: Track, user: User } = models

async function start() {
  await models.sequelize.sync({ force: true })

  const track1 = await Track.create({
    name: 'track1',
    color: 'blue'
  });
  const track2 = await Track.create({
    name: 'track1',
    color: 'blue'
  });
  
  const user1 = await User.create({
    username: 'q',
    password: 'q'
  });
  const user2 = await User.create({
    username: 'w',
    password: 'w'
  });

  await user1.setTracks([track1])
  await user2.setTracks([track2])
  // await user1.removeTrack(track1)
  // await track1.setUser(user1)
  // await track1.setUser(null)


  const tracks = await Track.findAll()
  console.log(tracks)
}
start()
