// @flow
const sign = require('./sign');

/**
 * @typedef {Object} QueryParams
 * @property {String} signature - 回调接口生成的签名
 * @property {Number|String} timestamp - 回调接口传回的时间戳
 * @property {String} - 回调接口传回的随机字符串
 */
type QueryParams = {
  signature: string,
  timestamp?: number | string,
  nonce?: string
}

/**
 * @module open-service-node-sdk/lib/verifySignature
 * @author xuyuanxiang <xuyuanxiang@wosai-inc.com> ({@link http://xuyuanxiang.me})
 * @description
 * 计算签名校验，并将计算结果和回调接口所传签名进行比对。
 * @example
 * const querystring = require('querystring');
 * const assert = require('assert');
 * const verifySignature = require('open-service-node-sdk/lib/verifySignature');
 *
 * // 开发商注册时配置的Token
 * const TOKEN = '123456';
 * // 回调URL中的query参数
 * const query = querystring.parse('signature=5a65ceeef9aab2d149439f82dc191dd6c5cbe2c0&timestamp=1445827045067&nonce=nEXhMP4r');
 * // 回调Post参数：
 * const body = {
 *    encrypt: '1a3NBxmCFwkCJvfoQ7WhJHB+iX3qHPsc9JbaDznE1i03peOk1LaOQoRz3+nlyGNhwmwJ3vDMG+OzrHMeiZI7gTRWVdUBmfxjZ8Ej23JVYa9VrYeJ5as7XM/ZpulX8NEQis44w53h1qAgnC3PRzM7Zc/D6Ibr0rgUathB6zRHP8PYrfgnNOS9PhSBdHlegK+AGGanfwjXuQ9+0pZcy0w9lQ=='
 * };
 * const result = verifySignature(query, body, TOKEN); // true
 * assert(result, '校验失败！');
 * @param {QueryParams} query - 回调URL所携带的query参数
 * @param {{encrypt: String}} body - 回调URL Post参数
 * @param {String} token - 应用开发商注册时自定义的Token
 * @return {boolean} 校验结果
 */
module.exports = function verifySignature(
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
  return sign(token, timestamp + '', nonce || '', body.encrypt) === signature;
};
