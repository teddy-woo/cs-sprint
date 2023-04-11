#!/usr/bin/env node

const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

process.stdin.on("data", data => {
  let raw = data.toString()

  let regex = /\[(.+)\]/g
  let match = regex.exec(raw)[1]
  let timestamp = dayjs(match, 'DD/MMM/YYYY:hh:mm:ss +ZZ').toISOString()


  //[10.0.210.17 - - [28/Nov/2022:11:33:28 +0900] "GET /hello HTTP/1.1" 200 615 "-" "curl/7.84.0" "-"]



  let c = raw.split(' ').map(s => s.replace('"', ''))
  let source_ip = c[0]
  let method = c[5]
  let status_code = c[8]
  let path = c[6]



  let jsonString = `
{
  "source_ip": "${source_ip}",
  "method": "${method}",
  "status_code": ${status_code},
  "path": "${path}",
  "timestamp": "${timestamp}"
}`

  process.stdout.write(jsonString)
})