/**
 * @module open-service-node-sdk
 * @author xuyuanxiang <xuyuanxiang@wosai-inc.com> ({@link http://xuyuanxiang.me})
 * @description
 * 收钱吧开放平台node-sdk。
 * @example
 * const {verifySignature, sign, randomEncodingAESKey, AES} = require('open-service-node-sdk');
 * const {encrypt, decrypt} = AES;
 * @see {@link module:open-service-node-sdk/lib/verifySignature} 签名校验
 * @see {@link module:open-service-node-sdk/lib/randomEncodingAESKey} 生成数据加密密钥
 * @see {@link module:open-service-node-sdk/lib/decrypt} 消息解密
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
