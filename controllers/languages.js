'use strict'

async function languages (req, h) {
  return await h.response('Languages')
  // return await service.find();
}

async function specificLanguage (req, h) {
  const languages = await req.mongo.db.collection().findOne({})
  return languages
}

module.exports = {
  languages,
  specificLanguage
}
