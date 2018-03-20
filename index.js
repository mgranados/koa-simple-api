require('dotenv').config();

const Koa = require('koa');
const app = new Koa();
const { router } = require('./router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const compress = require('koa-compress');

const mongoUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);

app.use(logger());
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.use(compress());
app.listen(process.env.API_PORT);
console.log(
  'API on: http://' + process.env.API_URL + ':' + process.env.API_PORT
);
