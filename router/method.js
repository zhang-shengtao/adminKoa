const Router = require("@koa/router");
const { captcha } = require("../controller/methodController");
const router = new Router();

router.get("/captcha", captcha);

module.exports = router;
