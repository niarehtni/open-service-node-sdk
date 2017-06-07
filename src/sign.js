/**
 * @flow
 * Created by xuyuanxiang on 2017/6/7.
 */
const crypto = require('crypto');

const isString: (input: any) => boolean = (input) => typeof input === 'string';
/**
 * 计算签名：
 * sha1(sort(token、timestamp、nonce、msg_encrypt))
 * @param {String} token - 应用开发商注册时自定义的Token
 * @param {String} timestamp - 时间戳
 * @param {String} nonce - 随机字符串
 * @param {String} msgEncrypt - 加密后的消息体
 * @return {String}
 */
module.exports = function(
  token: string, timestamp: string | number, nonce?: string,
  msgEncrypt: string) {
  if (!isString(token) || !isString(timestamp) || !isString(nonce)
    || !isString(msgEncrypt)) {
    return null;
  }
  // sort的含义: 将参数值按照字母生序排列，拼接为一个字符串。
  const params: string = [
    token,
    timestamp,
    nonce,
    msgEncrypt,
  ].sort().join('');

  const sha = crypto.createHash('sha1');
  sha.update(params, 'utf8');
  return sha.digest('hex');
};

