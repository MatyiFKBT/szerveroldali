const express = require('express');
const asyncHandler = require('express-async-handler')
const Track = require('../models/track.js')

const router = express.Router();

// let counter = 0

router
  .get('/',       asyncHandler(async (req, res) => {
    const tracks = await Track.findAll()
    res.send(tracks)
  }))
  .get('/:id',    asyncHandler(async (req, res) => {
    const id = req.params.id
    const track = await Track.findOne({ where: {id: id} })
    res.send(track ? track : 404)
  }))
  .post('/',      asyncHandler(async (req, res) => {
    const track = req.body
    const newTrack = await Track.create(track)
    res.send(newTrack)
  }))
  .put('/:id',    asyncHandler(async (req, res)  => {
    const id = req.params.id
    const track = req.body
    const updatedTrack = await Track.update(track, { where: {id: id}})
    res.send(updatedTrack)
  }))
  .patch('/:id',   asyncHandler(async (req, res) => {
    const newContent = req.body;
    // const oldTrack = await Track.findOne({ id });
    // for (const key in newContent) {
    //     oldTrack[key] = newContent[key];
    // }
    // await oldTrack.save();
    const updatedTrack = await Track.update(newContent, {
        where: { id: req.params.id }
    })
    res.send(updatedTrack);
  }))
  .delete('/',   asyncHandler(async (req, res) => {
    await Track.destroy({ truncate: true });
    res.send(204);
  }))
  .delete('/:id', asyncHandler(async (req, res) => {
      const id = req.params.id;
      // await (await Track.findOne({ id })).destroy();
      // én de nemtudom, ez lehet akkor már szebb
      await Track.destroy({ where: { id }});
      res.send(204);
  }));

module.exports = router