'use strict';

const Controller = require('egg').Controller;

class BlogController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async getBlogDetail() {
    const { ctx } = this;
    ctx.body = this.app.handleBlog.get(ctx.params.id);
  }

  async getBlogList() {
    const { ctx } = this;
    const data = JSON.parse(this.app.versionConfig || '{}');
    const result = [];
    for (const i in data) {
      console.log(i, data);
      const tmp = data[i];
      tmp.id = i;
      result.push(tmp);
    }
    ctx.body = result;
  }
}

module.exports = BlogController;
