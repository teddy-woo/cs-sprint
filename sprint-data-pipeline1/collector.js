#!/usr/bin/env node

const dotenv = require('dotenv')
const { Client } = require('pg')
dotenv.config()

const { HOSTNAME, USERNAME2, PASSWORD, DATABASE } = process.env
const client = new Client({
  host: HOSTNAME,
  user: USERNAME2,
  password: PASSWORD,
  database: DATABASE
})

client.connect().then(() => {

  process.stdin.on("data", async data => {
    let raw = data.toString()
    let json = JSON.parse(raw)

    let queryString = `
      INSERT INTO public.nginx (source_ip, method, status_code, path, timestamp)
      VALUES (
        '${json.source_ip}','${json.method}','${json.status_code}','${json.path}','${json.timestamp}'
      );
    `

    console.log(queryString)
    try {
      await client.query(queryString)
    }
    catch(e) {
      console.log(e)
    }
  })

}).catch(err => console.log('연결 오류', err.stack))


// Ctrl+C가 입력되면, 데이터베이스를 닫습니다
process.on('SIGINT', async (sig) => {
  console.log('\n데이터베이스 연결 닫는 중...')
  await client.end()
  console.log('데이터베이스 연결 종료')
  process.exit(1)
})