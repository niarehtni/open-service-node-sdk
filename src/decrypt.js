/**
 * @flow
 * Created by xuyuanxiang on 2017/6/8.
 */
const crypto = require('crypto');
const pkcs7 = require('pkcs7');

/**
 * 解密方案如下：
 * 1. 取出返回的JSON中的encrypt字段。
 * 2. 对密文BASE64解码：aes_msg=Base64_Decode(encrypt)
 * 3. 使用AESKey做AES解密：rand_msg=AES_Decrypt(aes_msg)
 * 4. 验证解密后$key、msg_len
 * 5. 去掉rand_msg头部的16个随机字节，4个字节的msg_len,和尾部的appId即为最终的消息体原文msg
 *
 * @param {String} encodingAESKey - 数据加密密钥
 * @param {String} appId - 应用开发商创建应用获取的appId
 * @param {String} encrypt - 消息密文， 回调接口Post参数中的encrypt字段
 * @return {{before: String, content: *, after: String}}
 */
module.exports = function(
  encodingAESKey: string, appId: string,
  encrypt: string): { before: string, msg?: any, after: string } {
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
