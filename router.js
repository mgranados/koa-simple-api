const Router = require('koa-router');
const router = new Router();
const { Thing } = require('./models');

router.get('/things', async (ctx, next) => {
  const query = {
    limit: ctx.request.query.limit || 20,
    skip: ctx.request.query.start,
    find: {},
    sort: '-createdAt'
  }
  ctx.body = await Thing.dataTables(query)
});

router.post('/things', async (ctx, next) => {
  const { name, description } = ctx.request.body
  const thing = await Thing.create({
    name,
    description,
  })

  ctx.body = {
    thing: thing.public()
  }
});

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello World';
});

module.exports = {
  router
};
