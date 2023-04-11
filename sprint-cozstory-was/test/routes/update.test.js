'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('PUT /article/:id', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'PUT',
    url: '/article/1',
    payload: { author: { name: '김구름' }, title: '나는 클라우드 전문가', body: '구름은 나의 것' }
  })

  t.same(JSON.parse(res.payload), {
    _id: 1,
    author: { name: '김구름' },
    title: '나는 클라우드 전문가',
    body: '구름은 나의 것'
  })
})


test('PUT /article/:id 요청 시 id에 해당하는 글이 없는 경우', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'PUT',
    url: '/article/30000',
    payload: { author: { name: '김구름' }, title: '나는 클라우드 전문가', body: '구름은 나의 것' }
  })

  t.same(res.statusCode, 404)
})

test('PUT /article/:id 요청 시 본문이 없는 경우', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'PUT',
    url: '/article/2',
    payload: null
  })

  t.same(res.statusCode, 400)
})