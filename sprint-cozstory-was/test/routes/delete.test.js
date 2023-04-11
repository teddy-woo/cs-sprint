'use strict'

const { test  } = require('tap')
const { build } = require('../helper')

test('DELETE /article/:id', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'DELETE',
    url: '/article/1'
  })

  t.same(res.statusCode, 200)
})

test('DELETE /article/:id 요청 시 id에 해당하는 글이 없는 경우', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'DELETE',
    url: '/article/30000'
  })

  t.same(res.statusCode, 204)
})
