'use strict';
const Client = require('./lib/client');

module.exports = app => {
  app.handleBlog = new Client();
};
