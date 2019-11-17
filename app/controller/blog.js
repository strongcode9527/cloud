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
    console.log('in');
    console.log(this.app.versionConfig);
    ctx.body = this.app.versionConfig || {};
  }
}

module.exports = BlogController;
