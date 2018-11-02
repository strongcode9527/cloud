import Koa from 'koa'
import path from 'path'
import views from 'koa-views'
import koaBody from 'koa-body'
import Router from 'koa-router'

import routerConfig from './routes'

const app = new Koa()
const router = new Router()

routerConfig(router)

app
  //处理请求体，目前应用于图片上传。
  
  .use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
  }))
  .use(koaBody({multipart: true}))
  .use(router.routes()) 
  .use(router.allowedMethods)


app.listen(9527)
