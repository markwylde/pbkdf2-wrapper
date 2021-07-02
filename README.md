# pbkdf2-wrapper
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/markwylde/pbkdf2-wrapper)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/markwylde/pbkdf2-wrapper)](https://github.com/markwylde/pbkdf2-wrapper/releases)
[![GitHub](https://img.shields.io/github/license/markwylde/pbkdf2-wrapper)](https://github.com/markwylde/pbkdf2-wrapper/blob/master/LICENSE)

A light wrapper around the native inbuilt pbkdf2 crypto functions used for password hashing, exposing promises and callbacks.

## Installation
```bash
npm install --save pbkdf2-wrapper
```

## Example Usage
```javascript
const hashText = require('pbkdf2-wrapper/hashText')
const verifyHash = require('pbkdf2-wrapper/verifyHash')

// config is optional, if not passed will use the following as defaults
const config = {
  encoding: 'hex',
  digest: 'sha256',
  hashBytes: 32,
  saltBytes: 16,
  iterations: 372791
}

// Promises
const password = await hashText('test-password', config)
const equality = await verifyHash('test-password', password, config)

// Callbacks
hashText('test-password', config, function (error, hash){})
verifyHash('test-password', password, config, function (err, equality){})

// Deferred callbacks
const hashPassword = hashText('test-password', config)
hashPassword(function (error, hash){})

const verifyPassword = verifyHash('test-password', password)
verifyPassword(function (err, equality){})
```

## License
This project is licensed under the terms of the MIT license.
