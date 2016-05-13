
# Shape 1.0.0 ![stable](https://img.shields.io/badge/stability-stable-4EBA0F.svg?style=flat)

A [`Validator`](https://github.com/aleclarson/Validator) that passes only for objects whose key-value pairs match the `Shape`'s types.

```coffee
Shape = require "Shape"

MyShape = Shape "MyShape", {
  foo: Number
  bar: String
}
```
