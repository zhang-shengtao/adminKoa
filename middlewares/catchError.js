const bouncer = require("koa-bouncer");
module.exports = async function (ctx, next) {
  try {
    await next();
  } catch (error) {
    // 判断校验类型错误
    if (error instanceof bouncer.ValidationError) {
      ctx.body = {
        code: 400,
        message: error.message,
      };
      return;
    } else {
      try {
        ctx.body = JSON.parse(error.message);
      } catch (error) {
        ctx.body = {
          message: error.message,
          code: 500,
        };
      }
    }
  }
};
