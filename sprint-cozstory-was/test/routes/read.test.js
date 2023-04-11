'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('GET /article', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'GET',
    url: '/article'
  })

  t.same(JSON.parse(res.payload), [
    { "_id": 1, "author": { "name": "임푸라" }, "title": "나는 인프라 담당자", "body": "데브옵스는 재미있어" },
    { "_id": 2, "author": { "name": "김코딩" }, "title": "데브옵스도 코딩 능력이 필요할까?", "body": "당연합니다!" },
    { "_id": 3, "author": { "name": "최해커" }, "title": "서버 다운이 지겨우신가요?", "body": "가용성을 높입시다!" }
  ])
})

test('GET /article/:id', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'GET',
    url: '/article/2'
  })

  t.same(
    JSON.parse(res.payload),
    { "_id": 2, "author": { "name": "김코딩" }, "title": "데브옵스도 코딩 능력이 필요할까?", "body": "당연합니다!" }
  )
})

test('GET /article/:id 요청 시 id에 해당하는 글이 없는 경우', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'GET',
    url: '/article/30000'
  })

  t.same(
    res.payload,
    "Not Found"
  )
})