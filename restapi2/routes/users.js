const express = require('express');
const Track = require('../models/').track
const User = require('../models/').user

const router = express.Router();

router
  .post('/:id/tracks',      async (req, res) => {
    const {id} = req.params
    const track = req.body

    const user = await User.findOne({ where: {id} })
    const newTrack = await Track.create(track)
    await newTrack.setUser(user)
    
    res.send(newTrack)
  })
  

module.exports = router