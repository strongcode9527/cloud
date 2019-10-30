'use strict';
const Subscription = require('egg').Subscription;

class UpdateBlog extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '10s', // 1 分钟间隔
      type: 'worker', // 机器上随机一个worker会执行此定时任务
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    console.log('in--------------');
    // 获取仓库信息，目的获取issues的数量，便于分页
    const repo = await this.ctx.curl('https://api.github.com/repos/strongcode9527/blog');
    const blogs = await this.ctx.curl('https://api.github.com/repos/strongcode9527/blog/issues', {});
    console.log(repo, blogs);
  }
}

module.exports = UpdateBlog;
