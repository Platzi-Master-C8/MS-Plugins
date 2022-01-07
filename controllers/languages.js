'use strict'

// GET languages/
async function getLanguages (req, h) {
  return await h.response('Languages')
  // return await service.find();
}

<<<<<<< HEAD
async function specificLanguage (req, h) {
  const languages = await req.mongo.db.collection().findOne({})
  return languages
=======
// PUT languages/
async function updateLanguages (req, h) {


}

// GET languages/{langid}
async function getSpecificLanguage (req, h) {
  // const { langid } = request.params;
  // return await service.findOne(langid);
  const name = req.params.langid;
  return await h.response(`specific lang: ${name}`)
>>>>>>> 97401c5c63d769a1cf34a95662f4bea111886dec
}


// PUT languages/{langid}
async function updateSpecificLanguage (req, h) {


}

// POST languages/
async function createLanguage (req, h) {


}


module.exports = {
  getLanguages,
  updateLanguages,
  getSpecificLanguage,  
  updateSpecificLanguage,
  createLanguage
}
