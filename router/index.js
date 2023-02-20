const path = require("path");
const { context } = require("@core/util");

module.exports = function (app) {
  const fileList = context(path.join(__dirname, "./"), true);
  fileList.forEach((item) => {
    if (item.name !== "index") {
      item.data.prefix("/api");
      app.use(item.data.routes());
      item.data.allowedMethods();
    }
  });
};
