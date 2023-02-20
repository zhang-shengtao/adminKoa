module.exports = {
  // mongodb数据库相关配置
  db: {
    // 数据库的端口  mongodb默认就是27017
    port: 27017,
    // 数据库的地址，本地地址是127.0.0.1
    host: "127.0.0.1",
    // 数据库名称，没有会自动创建
    dbName: "后台管理系统",
  },
  // 签证配置
  security: {
    // 密钥
    secretKey: "secretKey",
    // 过期时间
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  },
};
