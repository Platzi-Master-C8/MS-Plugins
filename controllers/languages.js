'use strict'

// GET languages/
async function getLanguages (req, h) {
  return await h.response('Languages')
  // return await service.find();
}

// PUT languages/
async function updateLanguages (req, h) {


}

// GET languages/{langid}
async function getSpecificLanguage (req, h) {
  // const { langid } = request.params;
  // return await service.findOne(langid);
  const name = req.params.langid;
  return await h.response(`specific lang: ${name}`)
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
