const crypto = require('crypto');
let hash = crypto.getHashes();


module.exports = function createKey(string) {
  let newHash = crypto.createHash('sha1').update(string).digest('hex');

  return newHash
}