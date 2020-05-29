const dotenv = require('dotenv')

const defaultConfigs = require('./defaults')

const prefix = 'PR'

dotenv.config()

const parse = (parentKey, parentRef) => {
  Object.keys(parentRef).forEach(k => {
    const envKey = (parentKey.length > 0
      ? `${parentKey}_${k}`
      : k
    ).toUpperCase()
    if (typeof parentRef[k] === 'object') {
      parse(k, parentRef[k])
    } else {
      parentRef[k] = process.env[`${prefix}_${envKey}`] || parentRef[k]
    }
  })
}

parse('', defaultConfigs)

module.exports = defaultConfigs
