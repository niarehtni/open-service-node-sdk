// @flow
const source: Buffer = new Buffer(62);
const zero: number = new Buffer('0')[0]; // ASCII 0
const A: number = new Buffer('A')[0]; // ASCII A
const a: number = new Buffer('a')[0]; // ASCII a

let offset: number = 0;
for (let i = 0; i < 10; i++) {
  source[offset++] = i + zero;
}
for (let i = 0; i < 26; i++) {
  source[offset++] = i + A;
}
for (let i = 0; i < 26; i++) {
  source[offset++] = i + a;
}

/**
 * 获取指定范围内的随机数
 * @private
 * @param {Number} min - 最小值
 * @param {Number} max - 最大值
 * @return {Number}
 */
function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * @module open-service-node-sdk/lib/randomEncodingAESKey
 * @author xuyuanxiang <xuyuanxiang@wosai-inc.com> ({@link http://xuyuanxiang.me})
 * @description 数据加密密钥，
 * 生成规则：从`[0-9]`、`[A-Z]`、`[a-z]`中随机提取，组成长度为`{43}`位的字符串。
 * @example
 * var randomEncodingAESKey = require('open-service-node-sdk/lib/randomEncodingAESKey');
 * var encodingAESKey = randomEncodingAESKey();
 * @param {Number} len - 所需生成随机字符串的长度，缺省：43位。
 * @return {String} 数据加密密钥
 */
module.exports = function randomEncodingAESKey(len: number = 43): string {
  const buff = new Buffer(len);
  let offset = 0;
  while (offset < len) {
    buff[offset++] = source[random(0, 62)];
  }
  return buff.toString('ascii');
};
