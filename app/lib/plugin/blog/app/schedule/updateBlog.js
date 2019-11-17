'use strict';
const fs = require('fs');
const path = require('path');
const safeGetValue = require('../../../../../../utils/safeGetValue');
const Subscription = require('egg').Subscription;
const versionConfigPath = path.resolve(process.cwd(), './.blogs/__version__.json');
const blogDataBaseUrl = path.resolve(process.cwd(), './.blogs');
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
    if (!this.ctx.app.hasBlogFolder && !fs.existsSync(blogDataBaseUrl)) {
      fs.mkdirSync(blogDataBaseUrl);
      this.ctx.app.hasBlogFolder = true;
    } else {
      this.ctx.app.hasBlogFolder = true;
    }
    // 获取仓库信息，目的获取issues的数量，便于分页
    const repo = await this.ctx.curl('https://api.github.com/repos/strongcode9527/blog');
    const issuesLength = safeGetValue(0, [ 'open_issues' ], repo);
    const totalPages = issuesLength % 20 ? issuesLength / 20 : issuesLength / 20 + 1;

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
    // 初始化version文件
    if (!isExits) {
      const jsonData = {};
      blogs.forEach(blog => {
        jsonData[blog.number] = { updated_at: blog.updated_at, title: blog.title };
      });
      this.writeFileSync(blogs);
      this.ctx.app.versionConfig = JSON.stringify(jsonData);
      fs.writeFileSync(versionConfigPath, JSON.stringify(jsonData));
    } else { // 更新version文件
      const versionFile = fs.readFileSync(versionConfigPath);
      const versionJson = JSON.parse(versionFile);
      const updateBlogs = [];
      blogs.forEach(blog => {
        if (safeGetValue('', [ blog.number, 'updated_at' ], versionJson) !== blog.updated_at) {
          versionJson[blog.number] = { updated_at: blog.updated_at, title: blog.title };
          updateBlogs.push(blog);
        }
      });
      this.ctx.app.versionConfig = JSON.stringify(versionJson);
      if (updateBlogs.length) {
        fs.writeFileSync(versionConfigPath, JSON.stringify(versionJson));
        this.ctx.app.versionConfig = JSON.stringify(versionJson);
        this.writeFileSync(updateBlogs);
      }
    }
  }
  // 这里异步更新或创建博客文章
  writeFileSync(blogs) {
    blogs.forEach(blog => {
      const obj = {
        title: blog.title,
        body: blog.body,
      };
      fs.writeFile(path.resolve(blogDataBaseUrl, `./${blog.number}.json`), JSON.stringify(obj), function() {});
    });
  }
}

module.exports = UpdateBlog;
