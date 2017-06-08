/**
 * @module open-service-node-sdk
 */

// 校验签名参数
exports.verifySignature = require('./verifySignature');
// 计算签名
exports.sign = require('./sign');
// 随机生成数据加密密钥
exports.randomEncodingAESKey = require('./randomEncodingAESKey');
// AES算法
exports.AES = {
  encrypt: require('./encrypt'), // 加密
  decrypt: require('./decrypt'), // 解密
};
