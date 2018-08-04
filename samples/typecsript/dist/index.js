"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bar_service_1 = require("./bar.service");
const foo_service_1 = require("./foo.service");
const tornadojs_1 = require("tornadojs");
const bootstrap = function () {
    tornadojs_1.Tornado.register([foo_service_1.FooService, bar_service_1.BarService]);
    const foo = tornadojs_1.Tornado.resolve(foo_service_1.FooService);
    foo.method();
};
bootstrap();
//# sourceMappingURL=index.js.map