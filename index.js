const isArray = require('is-array')
const get = require('lodash.get')
const set = require('lodash.set')

const RE_VAR = /@([a-zA-Z0-9$_.-]+)\s+(.*)+/g
const RE_VAR_NEWLINE = /@([a-zA-Z0-9$_.-]+)\s+(.)*[\n\r]?/gm
const RE_NUM = /\d{1,}\.{0,1}\d*/

function setValue (obj, path, value) {
  let current = get(obj, path)

  if (current !== undefined) {
    value = isArray(current)
      ? current.concat(value)
      : [current].concat(value)
  }

  set(obj, path, value)
}

function atVariables (str) {
  const variables = {}

  str.replace(RE_VAR, function (line, key, value) {
    value = RE_NUM.test(value)
      ? parseFloat(value)
      : value

    setValue(variables, key, value)
  })

  return variables
}

atVariables.clear = str => str.replace(RE_VAR_NEWLINE, '').trim()

module.exports = atVariables
