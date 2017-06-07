/**
 * Created by xuyuanxiang on 2017/6/7.
 */
const randomEncodingAESKey = require('../randomEncodingAESKey');

describe('lib/randomEncodingAESKey.js', () => {
  it('should generate a random encoding AES Key', () => {
    const key = randomEncodingAESKey();
    expect(/^[a-zA-Z0-9]{43}$/.test(key)).toBeTruthy();
  });
});
