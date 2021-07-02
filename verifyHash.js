const crypto = require('crypto');
const righto = require('righto');
const defaultConfig = require('./defaultConfig');

function checkHash (verifyHash, hash) {
  return verifyHash.toString('binary') === hash;
}

function verifyHash (text, combined, config, callback) {
  if (arguments.length === 3) {
    callback = config;
    config = {};
  }

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

  const verifyHash = righto(crypto.pbkdf2, text, salt, iterations, hashBytes, config.digest);
  const verified = righto.sync(checkHash, verifyHash, hash);

  verified(callback);
}

module.exports = (...args) => {
  if (typeof args[args.length - 1] === 'function') {
    return verifyHash(...args);
  } else {
    return righto(verifyHash, ...args);
  }
};
