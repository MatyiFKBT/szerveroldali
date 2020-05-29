const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router
  .post('/login',      async (req, res) => {
    // auth
    const token = jwt.sign({ username: 'q' }, 'abcdef', {
      expiresIn: '15m',
    })
    res.send({token})
  })

module.exports = router