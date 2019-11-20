'use strict';

const Base = require('sdk-base');
const fs = require('fs');
const path = require('path');
const baseUrl = path.resolve(process.cwd(), './.blogs');
class Client extends Base {
  constructor(options) {
    super(options);
    this._app = options;
    // 在初始化成功以后记得 ready
  }

  get(id) {
    try {
      const data = fs.readFileSync(path.resolve(baseUrl, `./${id}.json`), 'utf-8');
      return data;
    } catch (err) {
      return '没有此博文';
    }
  }

}

module.exports = Client;
