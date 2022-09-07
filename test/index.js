const test = require('basictap');

const hashText = require('../hashText');
const verifyHash = require('../verifyHash');

test('password hash with config', async t => {
  t.plan(2);

  const config = {
    encoding: 'hex',
    digest: 'sha512',
    hashBytes: 64,
    saltBytes: 32,
    iterations: 30000
  };

  const password = await hashText('test-password', config);
  const equality = await verifyHash('test-password', password, config);

  t.ok(password.startsWith('0000002'));
  t.ok(equality);
});

test('password hash', async t => {
  t.plan(1);

  const password = await hashText('test-password');

  t.ok(password.startsWith('0000001'));
});

test('password verify correct', async t => {
  t.plan(1);

  const password = await hashText('test-password');
  const equality = await verifyHash('test-password', password);

  t.ok(equality);
});

test('password verify incorrect', async t => {
  t.plan(1);

  const password = await hashText('test-password');
  const equality = await verifyHash('wrong-test-password', password);

  t.notOk(equality);
});
