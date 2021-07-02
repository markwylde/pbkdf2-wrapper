const test = require('basictap');
const righto = require('righto');
righto._debug = true;
righto._autotraceOnError = true;

const hashText = require('../hashText');
const verifyHash = require('../verifyHash');

test('password hash with config', async t => {
  t.plan(3);

  const config = {
    encoding: 'hex',
    digest: 'sha512',
    hashBytes: 64,
    saltBytes: 32,
    iterations: 30000
  };

  const password = hashText('test-password', config);
  const equality = verifyHash('test-password', password, config);

  const results = righto.mate(password, equality);

  results(function (error, password, equality) {
    t.notOk(error);
    t.ok(password.startsWith('0000002'));
    t.ok(equality);
  });
});

test('promises - password hash with config', async t => {
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

test('promises - password hash', async t => {
  t.plan(1);

  const password = await hashText('test-password');

  t.ok(password.startsWith('0000001'));
});

test('promises - password verify correct', async t => {
  t.plan(1);

  const password = await hashText('test-password');
  const equality = await verifyHash('test-password', password);

  t.ok(equality);
});

test('promises - password verify incorrect', async t => {
  t.plan(1);

  const password = await hashText('test-password');
  const equality = await verifyHash('wrong-test-password', password);

  t.notOk(equality);
});

test('callbacks - password verify correct', async t => {
  t.plan(1);

  hashText('test-password', function (error, password) {
    verifyHash('test-password', password, function (error, equality) {
      t.ok(equality);
    });
  });
});

test('righto callbacks - password verify correct', async t => {
  t.plan(1);

  hashText('test-password')(function (error, password) {
    verifyHash('test-password', password)(function (error, equality) {
      t.ok(equality);
    });
  });
});
