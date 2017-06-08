/**
 * @flow
 * Created by xuyuanxiang on 2017/6/8.
 */
const crypto = require('crypto');
const pkcs7 = require('pkcs7');
const randomEncodingAESKey = require('./randomEncodingAESKey');

module.exports = function(
  encodingAESKey: string,
  appId: string,
  data: string): string {
  const key = new Buffer(encodingAESKey + '=', 'base64');
  const iv = key.slice(0, 16);
  const randomStr = randomEncodingAESKey(16);

  const piece1 = new Buffer(20);
  const piece2 = new Buffer(data);
  const piece3 = new Buffer(appId);

  piece1.write(randomStr, 0);
  piece1.writeInt32BE(piece2.byteLength, 16);

  const buff = pkcs7.pad(Buffer.concat([piece1, piece2, piece3]));

  const encipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  encipher.setAutoPadding(false);
  const buff1 = encipher.update(buff);
  const buff2 = encipher.final();
  const encoded = Buffer.concat([buff1, buff2]);
  return encoded.toString('base64');
};
