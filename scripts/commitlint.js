#!/usr/bin/env node

'use strict'

const { execSync } = require('child_process')

const commitMessages = execSync('git log origin/master..HEAD --pretty=format:%s')
  .toString()
  .split('\n')
  .map((hash) => hash.trim())

const errors = []

for (let message of commitMessages) {
  message = message.trim().replace(/'/g, "'\\''")
  try {
    execSync(`echo '${message}' | npx commitlint`, { stdio: 'inherit' })
  } catch (error) {
    errors.push(error)
  }
}

if (errors.length !== 0) {
  process.exit(1)
}
