const assert = require('assert')
const atVariables = require('..')
const { stripIndent } = require('common-tags')

describe('atVariables', function () {
  it('should extract @name variable', function () {
    var str = `
      @name John
    `
    var vars = atVariables(str)

    assert.deepStrictEqual(vars, {
      name: 'John'
    })
  })

  it('should extract the user data', function () {
    var str = stripIndent`
      User data:
      Here's the user name: @name John
      Then we have the age too
      @age 20
      And some skills:
      @skills html
      @skills css
    `

    var vars = atVariables(str)

    assert.deepStrictEqual(vars, {
      name: 'John',
      age: 20,
      skills: ['html', 'css']
    })
  })

  it('should remove the atVariables', function () {
    var str = stripIndent`
      User data:
      Here's the user name:
      @name John
      Then we have the age too
      @age 20
      And some skills:
      @skills html
      @skills css`

    var cleanStr = atVariables.clear(str)

    assert.strictEqual(cleanStr, stripIndent`
      User data:
      Here's the user name:
      Then we have the age too
      And some skills:`
    )
  })

  it('should support deep properties', function () {
    var str = stripIndent`
      @name User Name
      @skills.frontend html
      @skills.backend php
    `

    var vars = atVariables(str)

    assert.deepStrictEqual(vars, {
      name: 'User Name',
      skills: {
        frontend: 'html',
        backend: 'php'
      }
    })
  })

  it('should support deep properties with arrays', function () {
    var str = stripIndent`
      @prop.sub.test 1
      @prop.sub.test 2
      @prop.sub.test 3
    `

    var vars = atVariables(str)

    assert.deepStrictEqual(vars, {
      prop: {
        sub: {
          test: [1, 2, 3]
        }
      }
    })
  })
})
