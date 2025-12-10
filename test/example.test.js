const app = require('../app');

test('basic hello test', () => {
  expect(app.hello()).toBe('Hello from MyApp - dev');
});
