const express = require('express');
require('express-async-errors')
const tracksRouter = require('./routes/tracks.js')
const usersRouter = require('./routes/users.js')
const authRouter = require('./routes/auth.js')
const Track = require('./models/track.js')
const NotFoundError = require('./errors/notfounderror.js')
const HttpStatus = require('http-status-codes')
const models = require('./models')
const jwtMiddleware = require('express-jwt')

const app = express();
app.use(express.json())

app.use((req, res, next) => {
  next()
  // res.send('OK')
})

// GET /tracks
// GET /tracks/1
// POST /tracks
// PUT /tracks/1 //csere
// PATCH /tracks/1 //módosít
// DELETE /tracks
// DELETE /tracks/1

// 

// app.get('/users/{userId}/tracks', (req, res) => res.send('All tracks'))
// app.get('/tracks?userId={userId}', (req, res) => res.send('All tracks'))

// app.post('/users/{userId}/tracks', {...track},  (req, res) => res.send('All tracks'))
// app.post('/tracks', {
//   userId:..
// }, (req, res) => res.send('All tracks'))

// app.get('/tracks', (req, res) => res.send('All tracks'))
// app.post('/tracks', (req, res) => res.send('New track'))
// app.put('/tracks/1', (req, res) => res.send('Replace track'))

app.use('/tracks', jwtMiddleware({secret: 'abcdef'}), tracksRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .send({
        type: err.name,
        httpStatus: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        message: err.message
      })
  }
  next(err)
})

app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .send({
      type: err.name,
      httpStatus: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
      message: err.message
    })
})


async function start() {
  // await Track.sync()
  // await models.sequelize.sync({force: true});
  await models.sequelize.sync();

  const port = process.env.PORT || 3000
  app.listen(port, () => 
    console.log('Example app listening on port 3000!'));
  }
start()
