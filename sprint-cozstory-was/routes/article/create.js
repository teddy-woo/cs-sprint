'use strict'

const { createOne, isValid } = require('../../model')

module.exports = async function (app, opts) {
  app.post('/', async function (request, reply) {
    if(!isValid(request.body)) {

      // TODO: 여기에 필요한 응답을 구현합니다.

      return;
    }

    const result = await createOne( /* TODO: 여기에 필요한 값을 넣습니다 */ )

    // TODO: 여기에 필요한 응답을 구현합니다.
  })
}
