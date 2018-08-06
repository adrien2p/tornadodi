"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bar_service_1 = require("./bar.service");
const foo_service_1 = require("./foo.service");
const tornadodi_1 = require("tornadodi");
const bootstrap = function () {
    tornadodi_1.Tornado.register([foo_service_1.FooService, bar_service_1.BarService]);
    const foo = tornadodi_1.Tornado.resolve(foo_service_1.FooService);
    foo.method();
};
bootstrap();
//# sourceMappingURL=index.js.map