/**
 * @flow
 * Created by xuyuanxiang on 2017/6/8.
 */
const sign = require('../lib/sign');

type QueryParams = {
  signature: string,
  timestamp: number | string,
  nonce?: string
}

/**
 * 签名校验
 * @param {String|Object} query - 回调URL所携带的query参数
 * @param {Object} body - 回调URL Post参数
 * @param {String} token - 应用开发商注册时自定义的Token
 * @return {boolean}
 */
module.exports = function(
  query: QueryParams,
  body: { encrypt: string },
  token: string): boolean {
  if (!query || !body
    || typeof token !== 'string'
    || typeof body.encrypt !== 'string') {
    return false;
  }
  const { signature, timestamp, nonce } = query;
  if (typeof timestamp === 'undefined' || typeof signature === 'undefined') {
    return false;
  }
  return sign(token, timestamp, nonce || '', body.encrypt) === signature;
};
