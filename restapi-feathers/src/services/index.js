const users = require('./users/users.service.js');
const projects = require('./projects/projects.service.js');
const tracks = require('./tracks/tracks.service.js');
const filterTrack = require('./filter_track/filter_track.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(projects);
  app.configure(tracks);
  app.configure(filterTrack);
};
