
assertType = require "assertType"
Validator = require "Validator"
wrongType = require "wrongType"
isType = require "isType"

Shape = Validator.Type "Shape",

  init: (name, types) ->

    if isType name, Object
      types = name
      name = ""

    assertType name, String
    assertType types, Object

    @name = name
    @types = types
    return

  test: (values) ->
    testTypes values, @types

  assert: (values, path) ->
    assertTypes values, @types, path

module.exports = Shape

testTypes = (values, types) ->
  return no unless isType values, Object
  for key, type of types
    if isType type, Object
      return no unless testTypes values[key], type
    return no unless isType values[key], type
  return yes

assertTypes = (values, types, path) ->

  unless isType values, Object
    return wrongType Object, path

  for key, type of types
    value = values[key]
    key = path + "." + key if path

    if isType type, Object
      return assertTypes value, type, key

    if type instanceof Validator
      return error if error = type.assert value, key

    else unless isType value, type
      return wrongType type, key

  return
