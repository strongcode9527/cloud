
export default function(router){
  router.get('/',async function (ctx) {
    await ctx.render('index')
  })
}