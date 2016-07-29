var Validator, assertType, isType, wrongType;

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
    if (!isType(obj, Object)) {
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
    var error, keyPath, meta, prop, ref, type;
    if (!isType(obj, Object)) {
      error = wrongType(Object, key);
      meta = {
        value: obj
      };
      return {
        error: error,
        meta: meta
      };
    }
    ref = this.types;
    for (prop in ref) {
      type = ref[prop];
      if (isType(obj[prop], type)) {
        continue;
      }
      keyPath = key + "." + prop;
      error = wrongType(type, keyPath);
      meta = {
        key: keyPath,
        value: obj[key]
      };
      return {
        error: error,
        meta: meta
      };
    }
  }
});

//# sourceMappingURL=map/Shape.map
