"use strict";

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Injectable = require('tornadojs').Injectable;

var BarService = (_dec = Injectable(), _dec(_class =
/*#__PURE__*/
function () {
  function BarService() {
    _classCallCheck(this, BarService);
  }

  _createClass(BarService, [{
    key: "method",
    value: function method() {
      console.log('Called method in Bar.');
    }
  }]);

  return BarService;
}()) || _class);
module.exports = BarService;