/**
 * Created by xuyuanxiang on 2017/6/8.
 */
const decrypt = require('../decrypt');

describe('lib/decrypt.js', () => {
  // 回调Post参数：
  const body = {// eslint-disable-next-line
    encrypt: 'ol5ZdzGiGK9yXYIuKB0wb5I4DTnZwkNcuo0b3OZgCUNqMRIdb9mfsmjVEe5vJT+pp7M5kyY8lfxFGnrT/qr0UER9v+skaX5GQ59AEtILoe4=',
  };

  it('should be ok', () => {
    const encodingAESKey = 'KLN4DMkqdDKnUvLQ501oitOHsrZy6VRXadgdNcu3jgd';
    const appId = 'e490e912-4c09-11e7-b114-b2f933d5fe66';
    expect(decrypt(encodingAESKey, appId, body.encrypt)).toEqual({
      before: 'nO3FK7ahlgrn6sSQ',
      msg: { text: 'hello world' },
      after: 'e490e912-4c09-11e7-b114-b2f933d5fe66',
    });
  });
});
