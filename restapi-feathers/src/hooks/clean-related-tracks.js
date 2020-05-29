// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const project = context.result.toJSON();
    context.result = {
      ...project,
      tracks: project.tracks.map(tr => tr.id)
    };
    
    return context;
  };
};
