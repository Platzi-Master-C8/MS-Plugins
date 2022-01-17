'use strict'

const languages = require('../controllers/languages')

module.exports = [
  {
    method: 'GET',
    path: '/languages',
    handler: languages.getLanguages,
  },

  {
    method: 'PUT',
    path: '/languages',
    handler: languages.updateLanguages,
  },

  {
    method: 'GET',
    path: '/languages/{id}',
    handler: languages.getSpecificLanguage,
  },

  {
    method: 'PUT',
    path: '/languages/{langId}',
    handler: languages.updateSpecificLanguage,
  },

  {
    method: 'POST',
    path: '/languages',
    handler: languages.createLanguage,
  },
]
