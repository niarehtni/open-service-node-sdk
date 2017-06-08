/**
 * Created by xuyuanxiang on 2017/6/8.
 */
const encrypt = require('../encrypt');
const decrypt = require('../decrypt');

describe('lib/encrypt.js', () => {
  it('should be ok', () => {
    const encodingAESKey = 'KLN4DMkqdDKnUvLQ501oitOHsrZy6VRXadgdNcu3jgd';
    const appId = 'e490e912-4c09-11e7-b114-b2f933d5fe66';
    const payload = JSON.stringify({ text: 'hello world' });
    const encoded = encrypt(encodingAESKey, appId, payload);
    const decoded = decrypt(encodingAESKey, appId, encoded);
    expect(decoded.msg).toEqual({ text: 'hello world' });
  });
});
