"use strict";

var BarService = require('./bar.service');

var FooService = require('./foo.service');

var tornado = require('tornadodi').Tornado;

var bootstrap = function bootstrap() {
  tornado.register([FooService, BarService]);
  var foo = tornado.resolve(FooService);
  foo.method();
};

bootstrap();