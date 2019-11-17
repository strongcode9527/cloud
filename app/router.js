'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/list', controller.blog.getBlogList);
  router.get('/api/blog/:id', controller.blog.getBlogDetail);
};
