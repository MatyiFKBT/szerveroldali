const express = require('express');
// const asyncHandler = require('express-async-handler')
const Track = require('../models/').track
const NotFoundError = require('../errors/notfounderror.js')

const router = express.Router();

// let counter = 0

router
  .get('/',       async (req, res) => {
    // const tracks = await Track.findAll({ where: req.query || {} }) 
    const id = req.query.userId
    const tracks = id
      ? await Track.findAll({ where: {userId: id} }) 
      : await Track.findAll() 
    res.send(tracks)
  })
  .get('/:id',    async (req, res) => {
    const id = req.params.id
    const track = await Track.findOne({ where: {id: id} })
    // throw new Error(`Opps.`)
    if (!track) {
      throw new NotFoundError(`Track (${id}) not found.`)
    }

    res
      .status(200)
      .send(track)
  })
  .post('/',      async (req, res) => {
    const track = req.body
    const newTrack = await Track.create(track)
    res.send(newTrack)
  })
  .put('/:id',    async (req, res)  => {
    const id = req.params.id
    const track = req.body
    const updatedTrack = await Track.update(track, { where: {id: id}})
    res.send(updatedTrack)
  })
  .patch('/:id',   async (req, res) => {
    const newContent = req.body;
    const updatedTrack = await Track.update(newContent, {
        where: { id: req.params.id }
    })
    res.send(updatedTrack);
  })
  .delete('/',   async (req, res) => {
    await Track.destroy({ truncate: true });
    res.send(204);
  })
  .delete('/:id', async (req, res) => {
      const id = req.params.id;
      // await (await Track.findOne({ id })).destroy();
      // én de nemtudom, ez lehet akkor már szebb
      await Track.destroy({ where: { id }});
      res.send(204);
  })

module.exports = router