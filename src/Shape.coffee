
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
    @_test obj, @types

  assert: (obj, keyPath) ->
    @_assert obj, @types, keyPath

  _test: (obj, types) ->
    return no if not isType obj, Object
    for key, type of types
      if isType type, Object
        return no if not @_test obj[key], type
      return no if not isType obj[key], type
    return yes

  _assert: (obj, types, keyPath) ->

    if not isType obj, Object
      return wrongType Object, keyPath

    for key, type of types
      value = obj[key]
      keyPath and key = keyPath + "." + key
      if isType type, Object
        return @_assert value, type, key
      continue if isType value, type
      return wrongType type, key
    return
