const crypto = require('crypto');
const { promisify } = require('util');

const defaultConfig = require('./defaultConfig');
const pbkdf2 = promisify(crypto.pbkdf2);

function checkHash (verifyHash, hash) {
  return verifyHash.toString('binary') === hash;
}

async function verifyHash (text, combined, config) {
  config = {
    ...defaultConfig,
    ...config
  };

  combined = Buffer.from(combined, config.encoding);
  const saltBytes = combined.readUInt32BE(0);
  const hashBytes = combined.length - saltBytes - 8;
  const iterations = combined.readUInt32BE(4);
  const salt = combined.slice(8, saltBytes + 8);
  const hash = combined.toString('binary', saltBytes + 8);

  const verifyHash = await pbkdf2(text, salt, iterations, hashBytes, config.digest);
  return checkHash(verifyHash, hash);
}

module.exports = verifyHash;
