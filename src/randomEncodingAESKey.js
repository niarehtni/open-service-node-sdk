/**
 * @flow
 * Created by xuyuanxiang on 2017/6/7.
 */
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
 * @param {Number} min - 最小值
 * @param {Number} max - 最大值
 * @return {Number}
 */
function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 随机生成数据加密密钥
 * 从[0-9]、[A-Z]、[a-z]中随机提取，组成长度为{43}位的字符串。
 * @return {String}
 */
module.exports = function(): string {
  const buff = new Buffer(43);
  let offset = 0;
  while (offset < 43) {
    buff[offset++] = source[random(0, 62)];
  }
  return buff.toString('ascii');
};
