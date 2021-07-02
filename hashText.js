const crypto = require('crypto');
const righto = require('righto');
const defaultConfig = require('./defaultConfig');

function generateHash (config, hash, salt) {
  const combined = Buffer.alloc(hash.length + salt.length + 8);

  combined.writeUInt32BE(salt.length, 0, true);
  combined.writeUInt32BE(config.iterations, 4, true);

  salt.copy(combined, 8);
  hash.copy(combined, salt.length + 8);

  return combined.toString(config.encoding);
}

function hashText (text, config, callback) {
  if (arguments.length === 2) {
    callback = config;
    config = defaultConfig;
  }

  config = {
    ...defaultConfig,
    ...config
  };

  const salt = righto(crypto.randomBytes, config.saltBytes);
  const hash = righto(crypto.pbkdf2, text, salt, config.iterations, config.hashBytes, config.digest);
  const hashedPassword = righto.sync(generateHash, config, hash, salt);

  hashedPassword(callback);
}

module.exports = (...args) => {
  if (typeof args[args.length - 1] === 'function') {
    return hashText(...args);
  } else {
    return righto(hashText, ...args);
  }
};
