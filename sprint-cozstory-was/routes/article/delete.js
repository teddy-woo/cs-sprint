'use strict'

const { deleteOne } = require('../../model')

module.exports = async function (app, opts) {
  app.delete('/:id', async function (request, reply) {
    // TODO: DELETE 부분은 밑바닥부터 구현해봅시다.
  })
}
