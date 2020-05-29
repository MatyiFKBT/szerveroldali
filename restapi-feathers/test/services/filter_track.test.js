const app = require('../../src/app');

describe('\'filter_track\' service', () => {
  it('registered the service', () => {
    const service = app.service('filter-track');
    expect(service).toBeTruthy();
  });
});
