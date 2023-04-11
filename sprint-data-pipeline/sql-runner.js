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
    let queryString = data.toString()

    console.log(`\n${queryString}\n`)
    try {
      const result = await client.query(queryString)
      console.table(result.rows)
    }
    catch(e) {
      console.log(e)
    }
    finally {
      console.log('\n데이터베이스 연결 닫는 중...')
      await client.end()
      console.log('데이터베이스 연결 종료')
      process.exit(1)
    }
  })

}).catch(err => console.log('연결 오류', err.stack))
