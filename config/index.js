require('dotenv').config();

const config = {
  ownDbUser: process.env.OWN_DB_USER,
  ownDbPwd: process.env.OWN_DB_PASSWORD,
  ownDbCollectionName: process.env.OWN_DB_COLLECTION,
  secondOwnDbCollectionName: process.env.SECOND_OWN_DB_COLLECTION,
  own: 0,
  

  trackingDbUser: process.env.TRACKING_DB_USER,
  trackingDbPwd: process.env.TRACKING_DB_PASSWORD,
  trackingDbCollectionName: process.env.TRACKING_DB_COLLECTION,
  tracking: 1,

  authSecret: process.env.AUTH_SECRET,

}

module.exports = {
  config,
}
