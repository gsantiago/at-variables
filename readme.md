# at-variables

Extract at-variables from strings:

```js
const atVars = require('at-variables')

const str = `
  @name John
  @age 20
  @skills.frontend html
  @skills.frontend css
  @skills.backend php
  @skills.backend java
`

const vars = atVars(str)

console.log(vars)

// {
//   name: 'John',
//   age: 20,
//   skills: {
//     frontend: ['html', 'css'],
//     backend: ['php', 'java']
//   }
// }
```

## installation

`npm install at-variables --save`

## requirements

Node >= 6

## tests

`npm install && npm test`

## usage

#### `atVariables(String) -> Object`

Extracts the variables from the string.

#### `atVariables.clear(String) -> String`

Removes the variables from the string:

```js
let str = `
@key value
my string
`

str = atVariables.clear(str)

console.log(str)
// "my string"
```

## license

MIT
