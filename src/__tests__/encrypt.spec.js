/**
 * Created by xuyuanxiang on 2017/6/8.
 */
const encrypt = require('../encrypt');
const decrypt = require('../decrypt');

describe('open-service-node-sdk/encrypt.js', () => {
  it('should work', () => {
    // 数据加密密钥
    const encodingAESKey = 'KLN4DMkqdDKnUvLQ501oitOHsrZy6VRXadgdNcu3jgd';
    // 应用开发商创建应用获取的appId
    const appId = 'e490e912-4c09-11e7-b114-b2f933d5fe66';
    // 消息明文
    const payload = JSON.stringify({ text: 'hello world' });
    // 加密
    const encoded = encrypt(encodingAESKey, appId, payload);
    // 解密
    const decoded = decrypt(encodingAESKey, appId, encoded);
    const { before, content, after } = decoded;

    expect(/^[a-zA-Z0-9]{16}/.test(before)).toBeTruthy();
    expect(content).toEqual({ text: 'hello world' });
    expect(after).toBe(appId);
  });
});
