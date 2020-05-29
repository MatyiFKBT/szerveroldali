// Initializes the `filter_track` service on path `/filter-track`
const { FilterTrack } = require('./filter_track.class');
const hooks = require('./filter_track.hooks');

module.exports = function (app) {
  const sequelize = app.get('sequelizeClient');
  const {projects, tracks} = sequelize.models
  const options = {
    paginate: app.get('paginate'),
    projects,
    tracks
  };

  // Initialize our service with any options it requires
  app.use('/filter-track', new FilterTrack(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('filter-track');

  service.hooks(hooks);
};
