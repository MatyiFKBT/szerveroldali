const { authenticate } = require('@feathersjs/authentication').hooks;

const getRelatedTracks = require('../../hooks/get-related-tracks');

const cleanRelatedTracks = require('../../hooks/clean-related-tracks');

module.exports = {
  before: {
    // all: [ authenticate('jwt') ],
    all: [],
    find: [getRelatedTracks()],
    get: [getRelatedTracks()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [cleanRelatedTracks()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
