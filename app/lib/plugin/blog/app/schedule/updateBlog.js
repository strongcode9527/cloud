'use strict';
const Subscription = require('egg').Subscription;
const fs = require('fs');
const path = require('path');

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
    const token = 'token d4f2affd63cb63e6bf2805e185da3654f5635300';
    // 获取仓库信息，目的获取issues的数量，便于分页
    const repo = await this.ctx.curl('https://api.github.com/repos/strongcode9527/blog');
    const blogs = await this.ctx.curl('https://api.github.com/repos/strongcode9527/blog/issues?creator=strongcode9527', {});
    // fs.writeFileSync(path.resolve(__dirname, ))
    console.log(process.cwd());
  }
}

module.exports = UpdateBlog;
