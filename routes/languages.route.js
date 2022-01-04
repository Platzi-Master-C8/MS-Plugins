'use strict'

const languages = require('../controllers/languages')

module.exports = [
  {
    method: 'GET',
    path: '/languages',
    handler: languages.languages,
  },

  {
    method: 'GET',
    path: '/languages/{langid}',
    handler: languages.specificLanguage,
  },
]
