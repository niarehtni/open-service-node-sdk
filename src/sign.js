/**
 * @flow
 * Created by xuyuanxiang on 2017/6/8.
 */
const crypto = require('crypto');

/**
 * 计算签名：
 * sha1(sort(arg1, arg2, arg3...))
 * @example
 * var sign = require('open-service-node-sdk/sign');
 *
 * var token = '123456';
 * var timestamp = new Date().getTime();
 * var nonce = 'abc';
 * var signature = sign(timestamp, nonce, token);
 * console.log(signature);
 * @param {...String} rests - 变长参数
 * @return {String}
 */
module.exports = function sign(...rests: Array<string>): string {
  if (!Array.isArray(rests)
    || rests.length === 0
    || rests.some((it) => typeof it !== 'string')) {
    return '';
  }
  // 将参数值按照字母生序排列，拼接为一个字符串。
  const params: string = rests.sort().join('');

  const sha = crypto.createHash('sha1');
  sha.update(params, 'utf8');
  return sha.digest('hex');
};
