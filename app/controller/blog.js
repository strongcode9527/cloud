'use strict';

const Controller = require('egg').Controller;

class BlogController extends Controller {
  async index() {
    const { ctx } = this;

    // 获取仓库信息，目的获取issues的数量，便于分页
    await ctx.curl('https://api.github.com/repos/strongcode9527/blog');
    await ctx.curl('https://api.github.com/repos/strongcode9527/blog/issues', {});

    ctx.body = 'hi, egg';
  }
}

module.exports = BlogController;
