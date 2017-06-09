// @flow
const crypto = require('crypto');
const pkcs7 = require('pkcs7');

/**
 * @module open-service-node-sdk/decrypt
 * @author xuyuanxiang <xuyuanxiang@wosai-inc.com> ({@link http://xuyuanxiang.me})
 * @description 解密方案如下：
 * 1. 取出返回的JSON中的encrypt字段。
 * 2. 对密文BASE64解码：encrypted = Base64_Decode(encrypt)
 * 3. 使用AESKey做AES解密：decrypted = AES_Decrypt(encrypted)
 * 4. 验证解密后appId、消息长度
 * 5. 去掉头部的16个随机字节，4个字节的消息长度和尾部的appId即为最终的消息体原文msg
 *
 * @example
 * const decrypt = require('open-service-node-sdk/decrypt');
 * // 回调Post参数
 * const body = {
 *    encrypt: 'ol5ZdzGiGK9yXYIuKB0wb5I4DTnZwkNcuo0b3OZgCUNqMRIdb9mfsmjVEe5vJT+pp7M5kyY8lfxFGnrT/qr0UER9v+skaX5GQ59AEtILoe4='
 * };
 * const encodingAESKey = 'KLN4DMkqdDKnUvLQ501oitOHsrZy6VRXadgdNcu3jgd';
 * const appId = 'e490e912-4c09-11e7-b114-b2f933d5fe66';
 * const decoded = decrypt(encodingAESKey, appId, body.encrypt);
 * console.log(decoded);
 * // output:
 * // {
 * //   before: 'nO3FK7ahlgrn6sSQ',
 * //   content: { text: 'hello world' },
 * //   after: 'e490e912-4c09-11e7-b114-b2f933d5fe66'
 * // }
 * @param {String} encodingAESKey - 数据加密密钥
 * @param {String} appId - 应用开发商创建应用获取的appId
 * @param {String} encrypt - 消息密文， 回调接口Post参数中的encrypt字段
 * @return {{before: String, content: *, after: String}}
 */
module.exports = function decrypt(
  encodingAESKey: string, appId: string,
  encrypt: string): { before: string, content?: any, after: string } {
  // 密钥，生成规则：Base64_Decode(数据加密密钥 + “=”)
  const key = new Buffer(encodingAESKey + '=', 'base64');
  // 初始向量大小为16字节，取key前16字节
  const iv = key.slice(0, 16);
  // 对密文BASE64解码
  const buff = new Buffer(encrypt, 'base64').toString('binary');
  // AES解密
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  decipher.setAutoPadding(false);
  const decoded = Buffer.concat([
    decipher.update(buff, 'binary'),
    decipher.final(),
  ]);
  // 验证解密后appId、消息长度
  const out = new Buffer(pkcs7.unpad(decoded));
  // 16字节的随机字符串
  const before = out.slice(0, 16).toString('utf8');
  // 4字节的msg长度，网络字节序
  const len = out.readInt32BE(16);
  // 消息体明文
  const msg = out.slice(20, 20 + len).toString('utf8');
  // 应用开发商创建应用获取的appId
  const after = out.slice(20 + len).toString('utf8');

  let content;
  try {
    content = JSON.parse(msg);
  } catch (e) {
    content = msg;
  }
  return {
    before,
    content,
    after,
  };
};
