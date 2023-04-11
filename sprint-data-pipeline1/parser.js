#!/usr/bin/env node

const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

process.stdin.on("data", data => {
  let raw = data.toString()

  let regexDate = /\[(.+)\]/g
  let matchDate = regexDate.exec(raw)[1];

  const regexWithQoute = /\"([^\"]+)\"/g;                    //  ## '/' => 여닫는 문  'g' =>  global 옵션    
  const result = [...raw.matchAll(regexWithQoute)];

  const methodAndPathString = result[0][1];
  const methodAndPathArray = methodAndPathString.split(" ");

  const splitData = raw.split(' ');
  let source_ip = splitData[0];
  let method = methodAndPathArray[0];
  let status_code = splitData[8];
  let path = methodAndPathArray[1];
  let timestamp = dayjs(matchDate, 'DD/MMM/YYYY:hh:mm:ss +ZZ').toISOString()

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