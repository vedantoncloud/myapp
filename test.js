const http = require('http');

const options = { hostname: 'localhost', port: 3000, path: '/health', method: 'GET' };
const req = http.request(options, res => {
  if (res.statusCode === 200) {
    console.log('HEALTH OK'); process.exit(0);
  } else { console.error('HEALTH FAIL'); process.exit(1); }
});
req.on('error', err => { console.error(err); process.exit(1); });
req.end();
