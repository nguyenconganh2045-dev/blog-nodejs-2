const test = require('node:test');
const assert = require('node:assert/strict');
const { app } = require('../index');

test('GET /me/stored/blogs should return 200', async () => {
  const server = app.listen(0);

  await new Promise((resolve) => server.once('listening', resolve));

  const address = server.address();
  const response = await fetch(`http://127.0.0.1:${address.port}/me/stored/blogs`);

  assert.equal(response.status, 200);

  server.close();
  await new Promise((resolve) => server.once('close', resolve));
});
