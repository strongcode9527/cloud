'use strict';

const Base = require('sdk-base');

class Client extends Base {
  constructor(options) {
    super(options);
    // 在初始化成功以后记得 ready
    console.log('in there');
  }

}

module.exports = Client;
