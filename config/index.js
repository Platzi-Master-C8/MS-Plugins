require('dotenv').config();

const config = {
  dbUser: process.env.DB_USER,
  dbPwd: process.env.DB_PASSWORD,
  dbCollectionName: process.env.DB_COLLECTION,
}

module.exports = {
  config,
}
