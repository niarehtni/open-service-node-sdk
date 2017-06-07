/**
 * Created by xuyuanxiang on 2017/6/8.
 */
const querystring = require('querystring');
const sign = require('../lib/sign');

/**
 * 签名校验
 * @param {String|Object} query - 回调URL所携带的query参数
 * @param {Object} body - 回调URL Post参数
 * @param {String} token - 应用开发商注册时自定义的Token
 * @return {boolean}
 */
module.exports = function(query, body, token) {
  if (!query || !body
      || typeof token !== 'string'
      || typeof body.encrypt !== 'string') {
    return false;
  }
  let params;
  if (typeof query === 'string') {
    params = querystring.parse(query);
  } else if (typeof query === 'object') {
    params = Object.assign({}, query);
  }
  const { signature, timestamp, nonce } = params;
  if (!timestamp || !nonce) {
    return false;
  }
  return sign(token, timestamp, nonce, body.encrypt) === signature;
};
