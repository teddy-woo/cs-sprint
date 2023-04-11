'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('POST /article', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/article',
    payload: { author: { name: '임푸라' }, title: '나는 인프라 담당자', body: '데브옵스는 재미있어' }
  })

  t.same(JSON.parse(res.payload), { _id: 4, author: { name: '임푸라' }, title: '나는 인프라 담당자', body: '데브옵스는 재미있어' })
})

test('POST /article 요청 시 본문이 없는 경우', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/article',
    payload: null
  })

  t.same(res.statusCode, 400)
})