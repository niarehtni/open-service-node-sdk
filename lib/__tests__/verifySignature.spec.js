/**
 * Created by xuyuanxiang on 2017/6/8.
 */
const querystring = require('querystring');
const verifySignature = require('../verifySignature');

describe('lib/verifySignature.js', () => {
  // 开发商注册时配置的Token:
  const TOKEN = '123456';
  // 回调URL中的query参数：
  const query = 'signature=5a65ceeef9aab2d149439f82dc191dd6c5cbe2c0&timestamp=1445827045067&nonce=nEXhMP4r'; // eslint-disable-line
  // 回调Post参数：
  const body = {// eslint-disable-next-line
    encrypt: '1a3NBxmCFwkCJvfoQ7WhJHB+iX3qHPsc9JbaDznE1i03peOk1LaOQoRz3+nlyGNhwmwJ3vDMG+OzrHMeiZI7gTRWVdUBmfxjZ8Ej23JVYa9VrYeJ5as7XM/ZpulX8NEQis44w53h1qAgnC3PRzM7Zc/D6Ibr0rgUathB6zRHP8PYrfgnNOS9PhSBdHlegK+AGGanfwjXuQ9+0pZcy0w9lQ==',
  };

  it('should verify signature', () => {
    expect(verifySignature(query, body, TOKEN)).toBeTruthy();
    expect(verifySignature(querystring.parse(query), body, TOKEN)).toBeTruthy();
  });
});
