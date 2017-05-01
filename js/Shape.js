// Generated by CoffeeScript 1.12.4
var Shape, Validator, assertType, isType, wrongType;

assertType = require("assertType");

Validator = require("Validator");

wrongType = require("wrongType");

isType = require("isType");

Shape = Validator.Type("Shape", {
  init: function(name, types) {
    if (isType(name, Object)) {
      types = name;
      name = "";
    }
    assertType(name, String);
    assertType(types, Object);
    this.name = name;
    this.types = types;
  },
  test: function(obj) {
    return this._test(obj, this.types);
  },
  assert: function(obj, keyPath) {
    return this._assert(obj, this.types, keyPath);
  },
  _test: function(obj, types) {
    var key, type;
    if (!isType(obj, Object)) {
      return false;
    }
    for (key in types) {
      type = types[key];
      if (isType(type, Object)) {
        if (!this._test(obj[key], type)) {
          return false;
        }
      }
      if (!isType(obj[key], type)) {
        return false;
      }
    }
    return true;
  },
  _assert: function(obj, types, keyPath) {
    var key, type, value;
    if (!isType(obj, Object)) {
      return wrongType(Object, keyPath);
    }
    for (key in types) {
      type = types[key];
      value = obj[key];
      keyPath && (key = keyPath + "." + key);
      if (isType(type, Object)) {
        return this._assert(value, type, key);
      }
      if (isType(value, type)) {
        continue;
      }
      return wrongType(type, key);
    }
  }
});

module.exports = Shape;