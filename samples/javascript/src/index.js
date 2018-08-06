const BarService = require('./bar.service');
const FooService = require('./foo.service');
const tornado = require('tornadodi').Tornado;

const bootstrap = function() {
    tornado.register([FooService, BarService]);
    const foo = tornado.resolve(FooService);
    foo.method();
};
bootstrap();