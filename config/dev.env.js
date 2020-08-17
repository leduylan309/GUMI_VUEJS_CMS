'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://applican.thanhtu150.top"',
  API_GOOGLE_KEY: '"AIzaSyAX77GUhRY-QwXvfJ9mIzORRHP5VANlmDo"'
})
