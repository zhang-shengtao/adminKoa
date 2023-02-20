const Router = require("@koa/router");
const { register, login } = require("@/controller/AdminController");
const router = new Router();
router.prefix("/admin");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
