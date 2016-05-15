var Validator, assertType, isConstructor, isType, wrongType;

isConstructor = require("isConstructor");

assertType = require("assertType");

Validator = require("Validator");

wrongType = require("wrongType");

isType = require("isType");

module.exports = Validator.Type("Shape", {
  init: function(name, types) {
    if (isType(name, Object)) {
      types = name;
      name = "";
    }
    assertType(name, String);
    assertType(types, Object);
    this.name = name;
    return this.types = types;
  },
  test: function(obj) {
    var key, ref, type;
    if (!isConstructor(obj, Object)) {
      return false;
    }
    ref = this.types;
    for (key in ref) {
      type = ref[key];
      if (!isType(obj[key], type)) {
        return false;
      }
    }
    return true;
  },
  assert: function(obj, key) {
    var error, meta, ref, type;
    if (!isConstructor(obj, Object)) {
      error = makeTypeError(Object, key);
      meta = {
        value: obj
      };
      return {
        error: error,
        meta: meta
      };
    }
    ref = this.types;
    for (key in ref) {
      type = ref[key];
      if (isType(obj[key], type)) {
        continue;
      }
      error = wrongType(type, key);
      meta = {
        key: key,
        value: obj[key]
      };
      return {
        error: error,
        meta: meta
      };
    }
  }
});

//# sourceMappingURL=../../map/src/Shape.map
