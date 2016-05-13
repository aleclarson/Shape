
isConstructor = require "isConstructor"
assertType = require "assertType"
Validator = require "Validator"
wrongType = require "wrongType"
isType = require "isType"

module.exports = Validator.Type "Shape",

  init: (name, types) ->

    assertType name, String
    assertType types, Object

    @name = name
    @types = types

  test: (obj) ->
    return no if not isConstructor obj, Object
    return no for key, type of @types when not isType obj[key], type
    return yes

  assert: (obj, key) ->

    unless isConstructor obj, Object
      error = makeTypeError Object, key
      meta = { value: obj }
      return { error, meta }

    for key, type of types
      continue if isType obj[key], type
      error = wrongType type, key
      meta = { key, value: obj[key] }
      return { error, meta }
    return
