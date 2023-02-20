const svgCaptcha = require("svg-captcha");

module.exports = {
  captcha(ctx, next) {
    const captcha = svgCaptcha.createMathExpr({
      size: 6, // 验证码长度
      ignoreChars: "0l@%$^&*()_", // 验证码字符中排除 0l@%$^&*()_
      noise: 3, // 干扰线条的数量
      color: true, //  验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: "#333", // 验证码图片背景颜色
    });
    ctx.session.captcha = captcha.text;
    ctx.body = {
      code: 200,
      img: captcha.data,
    };
  },
};
