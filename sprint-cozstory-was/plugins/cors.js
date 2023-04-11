'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  await fastify.register(require('@fastify/cors'), {
    origin: true
  })
})
