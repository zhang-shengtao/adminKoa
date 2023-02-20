const bcrypt = require("bcrypt");
const { registerValidator, loginValidator } = require("../validators/admin");
const AdminModel = require("../models/AdminModels");

const { creatToken } = require("../core/util");

module.exports = {
  async register(ctx, next) {
    registerValidator(ctx);
    const { name, password, password2, code } = ctx.request.body;
    // const captcha = ctx.session.captcha;
    const currentUser = await AdminModel.findOne({ name });
    if (!currentUser) {
      errorMeaage({ code: 400, message: "管理员未创建该用户请联系管理" });
    }
    if (currentUser.password) {
      errorMeaage({ code: 400, message: "该用户已创建请登录" });
    }

    await AdminModel.findByIdAndUpdate({ _id: currentUser._id }, { password: password2 }); // 通过ID更行数据
    // let user = await AdminModel.create({ name, password: password2 }); // 向数据库添加数据
    ctx.body = {
      code: 200,
      message: "注册成功",
    };
  },
  async login(ctx, next) {
    loginValidator(ctx);

    const { name, password, code } = ctx.request.body;
    const captcha = ctx.session.captcha;

    console.log(ctx.session, code);
    const user = await AdminModel.findOne({ name });
    if (!user) {
      errorMeaage({ code: 400, message: "管理员未创建该用户请联系管理" });
    }
    // 对比两次密码是否一致
    const correct = bcrypt.compareSync(password, user.password);
    if (!correct) {
      errorMeaage({ code: 401, message: "密码不正确" });
    }
    const token = await creatToken(user._id);
    ctx.body = {
      code: 200,
      message: "登录成功",
      token,
    };
  },
};
