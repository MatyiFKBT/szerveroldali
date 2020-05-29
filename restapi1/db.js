const Track = require('./models/track.js')

async function start() {
  await Track.sync({ force: true })

  await Track.create({
    name: 'track1',
    color: 'blue'
  });

  const tracks = await Track.findAll()
  console.log(tracks)
}
start()
