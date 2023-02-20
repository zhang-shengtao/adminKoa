const Router = require("@koa/router");
const router = new Router();

router.get("/test", (ctx, next) => {
  ctx.body = "测试用户";
});

module.exports = router;
