/**
 * @typedef {Object} QueryParams
 * @property {String} signature - 回调接口生成的签名
 * @property {Number|String} timestamp - 回调接口传回的时间戳
 * @property {String} - 回调接口传回的随机字符串
 * @flow
 * @author Created by xuyuanxiang on 2017/6/8.
 */
const sign = require('../lib/sign');

type QueryParams = {
  signature: string,
  timestamp: number | string,
  nonce?: string
}

/**
 * 计算签名校验，并将计算结果和回调接口所传签名进行比对。
 * @param {QueryParams} query - 回调URL所携带的query参数
 * @param {{encrypt: String}} body - 回调URL Post参数
 * @param {String} token - 应用开发商注册时自定义的Token
 * @return {boolean}
 */
function verifySignature(
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
}

/**
 * @module open-service-node-sdk/verifySignature
 * @type {verifySignature}
 */
module.exports = verifySignature;
