'use strict';
const path = require('path');

/** @type Egg.EggPlugin */
module.exports = {
  handleBlog: {
    enable: true,
    path: path.join(__dirname, '../app/lib/plugin/blog'),
  },
};
