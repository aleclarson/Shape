
assertType = require "assertType"
Validator = require "Validator"
wrongType = require "wrongType"
isType = require "isType"

module.exports = Validator.Type "Shape",

  init: (name, types) ->

    if isType name, Object
      types = name
      name = ""

    assertType name, String
    assertType types, Object

    @name = name
    @types = types

  test: (obj) ->
    return no if not isType obj, Object
    return no for key, type of @types when not isType obj[key], type
    return yes

  assert: (obj, key) ->

    if not isType obj, Object
      error = wrongType Object, key
      meta = { value: obj }
      return { error, meta }

    for prop, type of @types
      continue if isType obj[prop], type
      keyPath = key + "." + prop
      error = wrongType type, keyPath
      meta = { key: keyPath, value: obj[key] }
      return { error, meta }
    return
