'use strict'

const { readAll, readOne } = require('../../model')

module.exports = async function (app, opts) {
  app.get('/', async function (request, reply) {
    const result = await readAll()

    reply
      .code(200)
      .header('Content-type', 'application/json')
      .send(result)
  })

  app.get('/:id', async function (request, reply) {
    const result = await readOne( /* TODO: 여기에 필요한 값을 넣습니다 */ )

    if(result) {
      // TODO: 여기에 필요한 응답을 구현합니다.
    }
    else {
      // TODO: 여기에 필요한 응답을 구현합니다.
    }


  })
}
