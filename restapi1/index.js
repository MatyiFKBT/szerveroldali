const express = require('express');
const tracksRouter = require('./routes/tracks.js')
const Track = require('./models/track.js')


const app = express();
app.use(express.json())

// GET /tracks
// GET /tracks/1
// POST /tracks
// PUT /tracks/1 //csere
// PATCH /tracks/1 //módosít
// DELETE /tracks
// DELETE /tracks/1

// app.get('/tracks', (req, res) => res.send('All tracks'))
// app.post('/tracks', (req, res) => res.send('New track'))
// app.put('/tracks/1', (req, res) => res.send('Replace track'))

app.use('/tracks', tracksRouter)

async function start() {
  //force sync, utána létrehozunk egy trackot
  await Track.sync({force: true})
  await Track.create({
    name: 'track1',
    color: 'blue'
  });
  
  const port = process.env.PORT || 3000
  app.listen(port, () => 
    console.log('Example app listening on port 3000!'));
  }
start()
