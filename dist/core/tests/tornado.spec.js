"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const injectable_decorator_1 = require("../../decorators/injectable.decorator");
const tornado_1 = require("../tornado");
describe("Tornado", () => {
    let Foo = class Foo {
        method1() {
            return 'method1 was called from Foo';
        }
    };
    Foo = __decorate([
        injectable_decorator_1.Injectable()
    ], Foo);
    let Bar = class Bar {
        method1() {
            return 'method1 was called from Bar';
        }
    };
    Bar = __decorate([
        injectable_decorator_1.Injectable()
    ], Bar);
    let Taa = class Taa {
        method1() {
            return 'method1 was called from Taa';
        }
    };
    Taa = __decorate([
        injectable_decorator_1.Injectable()
    ], Taa);
    let Too = class Too {
        constructor(taa) {
            this.taa = taa;
        }
        method1() {
            return this.taa.method1();
        }
    };
    Too = __decorate([
        injectable_decorator_1.Injectable(),
        __metadata("design:paramtypes", [Taa])
    ], Too);
    describe('should register as singleton and resolve', () => {
        test("a raw provider by giving a class", () => {
            const tornado = tornado_1.Tornado.registerAsSingleton(Foo);
            expect(tornado.resolve(Foo) instanceof Foo).toBe(true);
            expect(tornado.resolve(Foo.name) instanceof Foo).toBe(true);
            expect(tornado.resolve(Foo.name).method1()).toBe('method1 was called from Foo');
            expect(tornado.resolve(Foo.name).method1() === tornado.resolve(Foo).method1()).toBe(true);
        });
        test("multiple raw providers by giving classes", () => {
            const tornado = tornado_1.Tornado.registerAsSingleton([Foo, Bar]);
            expect(tornado.resolve(Foo) instanceof Foo).toBe(true);
            expect(tornado.resolve(Foo.name) instanceof Foo).toBe(true);
            expect(tornado.resolve(Foo.name).method1()).toBe('method1 was called from Foo');
            expect(tornado.resolve(Foo.name).method1() === tornado.resolve(Foo).method1()).toBe(true);
            expect(tornado.resolve(Bar) instanceof Bar).toBe(true);
            expect(tornado.resolve(Bar.name) instanceof Bar).toBe(true);
            expect(tornado.resolve(Bar.name).method1()).toBe('method1 was called from Bar');
            expect(tornado.resolve(Bar.name).method1() === tornado.resolve(Bar).method1()).toBe(true);
        });
        test("multiple raw providers by giving object with token and type", () => {
            const tornado = tornado_1.Tornado.registerAsSingleton([{
                    token: 'foo',
                    type: Foo
                }, {
                    token: 'bar',
                    type: Bar
                }]);
            expect(tornado.resolve('foo') instanceof Foo).toBe(true);
            expect(tornado.resolve('foo').method1()).toBe('method1 was called from Foo');
            expect(tornado.resolve('bar') instanceof Bar).toBe(true);
            expect(tornado.resolve('bar').method1()).toBe('method1 was called from Bar');
        });
    });
    describe('should register as not a singleton and resolve', () => {
        beforeAll(() => tornado_1.Tornado.clear());
        test("a raw provider by giving a class", () => {
            const tornado = tornado_1.Tornado.register(Foo);
            expect(tornado.resolve(Foo) instanceof Foo).toBe(true);
            expect(tornado.resolve(Foo.name) instanceof Foo).toBe(true);
            expect(tornado.resolve(Foo.name).method1()).toBe('method1 was called from Foo');
            expect(tornado.resolve(Foo.name).method1() === tornado.resolve(Foo).method1()).toBe(true);
        });
        test("multiple raw providers by giving classes", () => {
            const tornado = tornado_1.Tornado.register([Foo, Bar]);
            expect(tornado.resolve(Foo) instanceof Foo).toBe(true);
            expect(tornado.resolve(Foo.name) instanceof Foo).toBe(true);
            expect(tornado.resolve(Foo.name).method1()).toBe('method1 was called from Foo');
            expect(tornado.resolve(Foo.name).method1() === tornado.resolve(Foo).method1()).toBe(true);
            expect(tornado.resolve(Bar) instanceof Bar).toBe(true);
            expect(tornado.resolve(Bar.name) instanceof Bar).toBe(true);
            expect(tornado.resolve(Bar.name).method1()).toBe('method1 was called from Bar');
            expect(tornado.resolve(Bar.name).method1() === tornado.resolve(Bar).method1()).toBe(true);
        });
        test("multiple raw providers by giving object with token and type", () => {
            const tornado = tornado_1.Tornado.register([{
                    token: 'foo',
                    type: Foo
                }, {
                    token: 'bar',
                    type: Bar
                }]);
            expect(tornado.resolve('foo') instanceof Foo).toBe(true);
            expect(tornado.resolve('foo').method1()).toBe('method1 was called from Foo');
            expect(tornado.resolve('bar') instanceof Bar).toBe(true);
            expect(tornado.resolve('bar').method1()).toBe('method1 was called from Bar');
        });
    });
});
//# sourceMappingURL=tornado.spec.js.map