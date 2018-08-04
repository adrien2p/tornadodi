"use strict";

var _dec, _dec2, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BarService = require('./bar.service');

var Dependencies = require('tornadojs').Dependencies;

var Injectable = require('tornadojs').Injectable;

var FooService = (_dec = Injectable(), _dec2 = Dependencies(BarService), _dec(_class = _dec2(_class =
/*#__PURE__*/
function () {
  function FooService(bar) {
    _classCallCheck(this, FooService);

    this.bar = bar;
  }

  _createClass(FooService, [{
    key: "method",
    value: function method() {
      return this.bar.method();
    }
  }]);

  return FooService;
}()) || _class) || _class);
module.exports = FooService;