const Koa = require("koa");
const app = new Koa();
const session = require("koa-session");
const static = require("koa-static"); // 托管静态资源
const logger = require("koa-logger"); // 控制台美化日志
const bouncer = require("koa-bouncer"); // 前端表单校验
const cors = require("koa2-cors"); // 解决跨域
const bodyparser = require("koa-bodyparser"); // 接收post参数
const json = require("koa-json"); // 美化json
const catchError = require("./middlewares/catchError"); // 错误处理中间件

app.keys = ["some secret hurr"];
const CONFIG = {
  key: "koa.sess",
  maxAge: 60 * 60,
  httpOnly: true, // true表示只有服务器获取
  signed: true, // 签名
  rolling: false, //每次请求时强行设置cookie，这将重置cookie过期时间
  renew: false,
  secure: false,
};
app.use(session(CONFIG, app));
app.use(catchError);

// 使用中间件
app
  .use(bodyparser())
  .use(bouncer.middleware())
  .use(json())
  .use(logger())
  .use(cors())
  .use(static(__dirname + "/public"));

require("./router")(app);

// 绑定error事件
app.on("error", function (err, ctx) {
  console.log(err);
});
module.exports = app;
