'use strict'

// GET languages/
async function getLanguages (req, h) {
  // return await h.response('Languages')
  const offset = Number(req.query.offset) || 0;

  const users = await req.mongo.db.collection('users').find({}).sort({name:1}).toArray();

  return users;
}

// PUT languages/
async function updateLanguages (req, h) {
  return await h.response('Update the languages');
}

// GET languages/{langid}
async function getSpecificLanguage (req, h) {
  // return await h.response('Get specific language')
  const id = req.params.id
  const ObjectID = req.mongo.ObjectID;
  const movie = await req.mongo.db.collection('users').findOne({_id: new ObjectID(id)},{projection:{name:1,email:1}});
  return movie;
}


// PUT languages/{langid}
async function updateSpecificLanguage (req, h) {
  return 'Update specific language'
}

// POST languages/
async function createLanguage (req, h) {
  // return await h.response('Create language');
  const payload = req.payload
  const status = await req.mongo.db.collection('users').insertOne(payload);
  return status;
}


module.exports = {
  getLanguages,
  updateLanguages,
  getSpecificLanguage,
  updateSpecificLanguage,
  createLanguage
}
