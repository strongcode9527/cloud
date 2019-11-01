'use strict';
const fs = require('fs');
const path = require('path');
const safeGetValue = require('../../../../../../utils/safeGetValue');
const Subscription = require('egg').Subscription;
const versionConfigPath = path.resolve(process.cwd(), './.blogs/__version__.json');
const token = [ 'd1e12b7fbb99bfc2a968803b2', '0d7854d7f9c8f98' ];

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
    // 获取仓库信息，目的获取issues的数量，便于分页
    const repo = await this.ctx.curl('https://api.github.com/repos/strongcode9527/blog');
    const issuesLength = safeGetValue(0, [ 'open_issues' ], repo);
    const totalPages = issuesLength % 20 ? issuesLength / 20 : issuesLength / 20 + 1;
    console.log(`token ${token.join('')}`);

    for (let i = 0; i < totalPages; i++) {
      const blogs = await this.ctx.curl('https://api.github.com/repos/strongcode9527/blog/issues?creator=strongcode9527', {
        headers: { Authorization: `token ${token.join('')}` },
      });
      this.updateBlog(blogs.res.data);
    }
  }
  updateBlog(blogs) {
    blogs = JSON.parse(blogs.toString());
    const isExits = fs.existsSync(versionConfigPath);
    if (!isExits) {
      const jsonData = {};
      blogs.forEach(blog => {
        jsonData[blog.number] = {
          updateTime: blog.updated_at,
          body: blog.body,
        };
      });
      console.log(jsonData);
      fs.writeFileSync(versionConfigPath, JSON.stringify(jsonData));
    } else {
      const versionFile = fs.readFileSync(versionConfigPath);
      console.log(versionFile.toString());
    }
  }
}

module.exports = UpdateBlog;
