// @flow
const crypto = require('crypto');
const pkcs7 = require('pkcs7');
const randomEncodingAESKey = require('./randomEncodingAESKey');

/**
 * @module open-service-node-sdk/lib/encrypt
 * @author xuyuanxiang <xuyuanxiang@wosai-inc.com> ({@link http://xuyuanxiang.me})
 * @description 消息加密算法：
 * Base64_Encode(AES_Encrypt[random(16B) + msg_len(4B) + msg + $key])
 * @example
 * const encrypt = require('open-service-node-sdk/lib/encrypt');
 * // 数据加密密钥
 * const encodingAESKey = 'KLN4DMkqdDKnUvLQ501oitOHsrZy6VRXadgdNcu3jgd';
 * // 应用开发商创建应用获取的appId
 * const appId = 'e490e912-4c09-11e7-b114-b2f933d5fe66';
 * // 消息明文
 * const payload = JSON.stringify({ text: 'hello world' });
 * // 加密
 * const encoded = encrypt(encodingAESKey, appId, payload);
 * @param {String} encodingAESKey - 数据加密密钥
 * @param {String} appId - 应用开发商创建应用获取的appId
 * @param {String} clearData - 消息明文
 * @return {String} 密文
 */
module.exports = function encrypt(
  encodingAESKey: string,
  appId: string,
  clearData: string): string {
  // 密钥，生成规则：Base64_Decode(数据加密密钥 + “=”)
  const key = new Buffer(encodingAESKey + '=', 'base64');
  // 初始向量大小为16字节，取key前16字节
  const iv = key.slice(0, 16);
  // AES算法，CBC模式
  const encipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  encipher.setAutoPadding(false);

  // 16字节的随机字符串
  const randomStr = randomEncodingAESKey(16);
  const before = new Buffer(randomStr);
  // 4字节的msg长度，网络字节序
  const msgLen = new Buffer(4);
  // msg为消息体明文
  const msg = new Buffer(clearData);
  // 应用开发商创建应用获取的appId
  const after = new Buffer(appId);
  msgLen.writeInt32BE(msg.byteLength, 0);
  // source = random(16B) + msg_len(4B) + msg + appId
  const source = Buffer.concat([before, msgLen, msg, after]);

  // 数据采用PKCS#7填充后进行加密
  let piece1 = encipher.update(pkcs7.pad(source));
  let piece2 = encipher.final();
  // 对明文消息msg加密处理后的Base64编码
  return Buffer.concat([piece1, piece2]).toString('base64');
};
