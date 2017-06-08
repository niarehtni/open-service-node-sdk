/**
 * Created by xuyuanxiang on 2017/6/7.
 */
const randomEncodingAESKey = require('../randomEncodingAESKey');

describe('lib/randomEncodingAESKey.js', () => {
  it('should generate a random encoding AES Key', () => {
    expect(/^[a-zA-Z0-9]{43}$/.test(randomEncodingAESKey())).toBeTruthy();
    expect(/^[a-zA-Z0-9]{16}$/.test(randomEncodingAESKey(16))).toBeTruthy();
  });
});
