'use strict';

const Controller = require('egg').Controller;

class BlogController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async getBlog() {
    const { ctx } = this;
    ctx.body = this.app.handleBlog.get(ctx.params.id);
  }
}

module.exports = BlogController;
