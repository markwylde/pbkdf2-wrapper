const crypto = require('crypto');
const { promisify } = require('util');

const defaultConfig = require('./defaultConfig');

const randomBytes = promisify(crypto.randomBytes);
const pbkdf2 = promisify(crypto.pbkdf2);

function generateHash (config, hash, salt) {
  const combined = Buffer.alloc(hash.length + salt.length + 8);

  combined.writeUInt32BE(salt.length, 0, true);
  combined.writeUInt32BE(config.iterations, 4, true);

  salt.copy(combined, 8);
  hash.copy(combined, salt.length + 8);

  return combined.toString(config.encoding);
}

async function hashText (text, config) {
  config = {
    ...defaultConfig,
    ...config
  };

  const salt = await randomBytes(config.saltBytes);
  const hash = await pbkdf2(text, salt, config.iterations, config.hashBytes, config.digest);
  return generateHash(config, hash, salt);
}

module.exports = hashText;
