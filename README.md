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
import hashText from 'pbkdf2-wrapper/hashText';
import verifyHash from 'pbkdf2-wrapper/verifyHash';

// config is optional, if not passed will use the following as defaults
const config = {
  encoding: 'hex',
  digest: 'sha256',
  hashBytes: 32,
  saltBytes: 16,
  iterations: 372791
};

const hash = await hashText('test-password', config);
const equality = await verifyHash('test-password', hash, config);
```

## License
This project is licensed under the terms of the MIT license.
