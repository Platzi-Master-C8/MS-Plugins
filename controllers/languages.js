'use strict'

async function languages (req, h) {
  return await h.response('Languages')
  // return await service.find();
}

async function specificLanguage (req, h) {
  // const { langid } = request.params;
  // return await service.findOne(langid);
  const name = req.params.langid;
  return await h.response(`specific lang: ${name}`)
}

module.exports = {
  languages,
  specificLanguage
}
