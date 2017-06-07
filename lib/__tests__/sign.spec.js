/**
 * Created by xuyuanxiang on 2017/6/7.
 */
const sign = require('../sign');
const querystring = require('querystring');

describe('lib/sign.js', () => {
  // 开发商注册时配置的Token:
  const TOKEN = '123456';
  // 回调URL中的query参数：
  const query = 'signature=5a65ceeef9aab2d149439f82dc191dd6c5cbe2c0&timestamp=1445827045067&nonce=nEXhMP4r'; // eslint-disable-line
  // 回调Post参数：
  const body = {// eslint-disable-next-line
    encrypt: '1a3NBxmCFwkCJvfoQ7WhJHB+iX3qHPsc9JbaDznE1i03peOk1LaOQoRz3+nlyGNhwmwJ3vDMG+OzrHMeiZI7gTRWVdUBmfxjZ8Ej23JVYa9VrYeJ5as7XM/ZpulX8NEQis44w53h1qAgnC3PRzM7Zc/D6Ibr0rgUathB6zRHP8PYrfgnNOS9PhSBdHlegK+AGGanfwjXuQ9+0pZcy0w9lQ==',
  };
  // 解析query参数：
  const { signature, timestamp, nonce } = querystring.parse(query);

  it('should generate right signature', () => {
    expect(sign(TOKEN, timestamp, nonce, body.encrypt)).toBe(signature);
  });
});
