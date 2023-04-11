'use strict'

const { updateOne, isValid } = require('../../model')

module.exports = async function (app, opts) {
  app.put('/:id', async function (request, reply) {
    if(!isValid(request.body)) {
      // TODO: 여기에 필요한 응답을 구현합니다.

      return;
    }

    const result = await updateOne(request.params.id, request.body)

    if(result) {
      // TODO: 여기에 필요한 응답을 구현합니다.
    }
    else {
      // TODO: 여기에 필요한 응답을 구현합니다.
    }


  })
}
