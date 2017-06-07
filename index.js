// 随机生成数据加密密钥
exports.randomEncodingAESKey = require('./src/randomEncodingAESKey');
// 校验签名参数
exports.verifySignature = require('./src/verifySignature');
// 计算签名
exports.sign = require('./src/sign');
// AES算法
exports.AES = {
  encrypt: require('./src/encrypt'), // 加密
  decrypt: require('./src/decrypt'), // 解密
};
