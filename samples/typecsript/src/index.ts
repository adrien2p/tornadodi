import { BarService } from "./bar.service";
import { FooService } from "./foo.service";
import { Tornado } from "tornadojs";

const bootstrap = function() {
    Tornado.register([FooService, BarService]);
    const foo = Tornado.resolve(FooService);
    foo.method();
};
bootstrap();