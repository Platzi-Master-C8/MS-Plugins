const crypto = require('crypto');
let hash = crypto.getHashes();

let randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)

module.exports = function createKey(string) {
  let newHash = crypto.createHash('sha1').update(string + randomString).digest('hex');

  return newHash
}