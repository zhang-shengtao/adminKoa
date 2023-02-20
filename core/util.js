const path = require("path");
const fs = require("fs");
const getPathInfo = (p) => path.parse(p);
const jwt = require("jsonwebtoken");
/* 
@directory 文件目录
@useSubdirectories 是否递归子目录
@extList 便利的文件类型后缀名
 */
function context(directory, useSubdirectories = false, extList = [".js"]) {
  const filesList = [];
  // 递归读取文件
  function readFileList(directory, useSubdirectories, extList) {
    const files = fs.readdirSync(directory);
    files.forEach((item) => {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && useSubdirectories) {
        readFileList(path.join(directory, item), useSubdirectories, extList);
      } else {
        const info = getPathInfo(fullPath);
        extList.includes(info.ext) && filesList.push(fullPath);
      }
    });
  }
  readFileList(directory, useSubdirectories, extList);
  // 生成需要的对象
  const res = filesList.map((item) => ({
    path: item,
    data: require(item),
    ...getPathInfo(item),
  }));

  return res;
}

/*  
@error 错误对象{code:code,message:message}
*/
function errorMeaage(error) {
  throw new Error(JSON.stringify(error));
}

/* 
@id 用户ID
*/
function creatToken(id) {
  const token = jwt.sign(
    {
      data: id,
      exp: config.security.expiresIn,
    },
    config.security.secretKey
  );
  return token;
}

module.exports = {
  context,
  errorMeaage,
  creatToken,
};
