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
 * 5. 去掉rand_msg头部的16个随机字节，4个字节的msg_len,和尾部的$CorpID即为最终的消息体原文msg
 *
 * @param {String} encodingAESKey
 * @param {String} appId
 * @param {String} encrypt
 * @return {{before: String, msg: *, after: String}}
 */
module.exports = function(
  encodingAESKey: string, appId: string,
  encrypt: string): { before: string, msg?: any, after: string } {
  const key = new Buffer(encodingAESKey + '=', 'base64');
  const iv = key.slice(0, 16);
  const buff = new Buffer(encrypt, 'base64').toString('binary');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  decipher.setAutoPadding(false);
  const decoded = Buffer.concat([
    decipher.update(buff, 'binary'),
    decipher.final(),
  ]);
  const out = new Buffer(pkcs7.unpad(decoded));
  const before = out.slice(0, 16).toString('utf8');
  const len = out.readInt32BE(16);
  const content = out.slice(20, 20 + len).toString('utf8');
  const after = out.slice(20 + len).toString('utf8');
  let msg;
  try {
    msg = JSON.parse(content);
  } catch (e) {
    msg = content;
  }
  return {
    before,
    msg,
    after,
  };
};
