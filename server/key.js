// Generates a 512-bit HMAC secret key that you can use for JWT authentication, to verify the user after login
const crypto = require('crypto');

// to use the generateKey method
crypto.generateKey('hmac', { length: 512 }, (err, key) => {
  if (err) throw err;
  console.log(key.export().toString('hex'));
});