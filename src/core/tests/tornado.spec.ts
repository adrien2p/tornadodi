import 'reflect-metadata';
import { Injectable } from "../../decorators/injectable.decorator";
import { Tornado } from "../tornado";

describe("Tornado", () => {
    @Injectable()
    class Foo {
        public method1(): string {
            return 'method1 was called from Foo';
        }
    }

    @Injectable()
    class Bar {
        public method1(): string {
            return 'method1 was called from Bar';
        }
    }

    @Injectable()
    class Taa {
        public method1(): string {
            return 'method1 was called from Taa';
        }
    }

    @Injectable()
    class Too {
        constructor(private taa: Taa) { }

        public method1(): string {
            return this.taa.method1();
        }
    }

    describe('should register as singleton and resolve', () => {
        test("a raw provider by giving a class", () => {
            const tornado = Tornado.registerAsSingleton(Foo);

            expect(tornado.resolve<Foo>(Foo) instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>(Foo.name) instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>(Foo.name).method1()).toBe('method1 was called from Foo');
            expect(tornado.resolve<Foo>(Foo.name).method1() === tornado.resolve<Foo>(Foo).method1()).toBe(true);
        });

        test("multiple raw providers by giving classes", () => {
            const tornado = Tornado.registerAsSingleton([Foo, Bar]);

            expect(tornado.resolve<Foo>(Foo) instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>(Foo.name) instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>(Foo.name).method1()).toBe('method1 was called from Foo');
            expect(tornado.resolve<Foo>(Foo.name).method1() === tornado.resolve<Foo>(Foo).method1()).toBe(true);

            expect(tornado.resolve<Bar>(Bar) instanceof Bar).toBe(true);
            expect(tornado.resolve<Bar>(Bar.name) instanceof Bar).toBe(true);
            expect(tornado.resolve<Bar>(Bar.name).method1()).toBe('method1 was called from Bar');
            expect(tornado.resolve<Bar>(Bar.name).method1() === tornado.resolve<Bar>(Bar).method1()).toBe(true);
        });

        test("multiple raw providers by giving object with token and type", () => {
            const tornado = Tornado.registerAsSingleton([{
                token: 'foo',
                type: Foo
            }, {
                token: 'bar',
                type: Bar
            }]);

            expect(tornado.resolve<Foo>('foo') instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>('foo').method1()).toBe('method1 was called from Foo');

            expect(tornado.resolve<Bar>('bar') instanceof Bar).toBe(true);
            expect(tornado.resolve<Bar>('bar').method1()).toBe('method1 was called from Bar');
        });
    });

    describe('should register as not a singleton and resolve', () => {
        beforeAll(() => Tornado.clear());

        test("a raw provider by giving a class", () => {
            const tornado = Tornado.register(Foo);

            expect(tornado.resolve<Foo>(Foo) instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>(Foo.name) instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>(Foo.name).method1()).toBe('method1 was called from Foo');
            expect(tornado.resolve<Foo>(Foo.name).method1() === tornado.resolve<Foo>(Foo).method1()).toBe(true);
        });

        test("multiple raw providers by giving classes", () => {
            const tornado = Tornado.register([Foo, Bar]);

            expect(tornado.resolve<Foo>(Foo) instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>(Foo.name) instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>(Foo.name).method1()).toBe('method1 was called from Foo');
            expect(tornado.resolve<Foo>(Foo.name).method1() === tornado.resolve<Foo>(Foo).method1()).toBe(true);

            expect(tornado.resolve<Bar>(Bar) instanceof Bar).toBe(true);
            expect(tornado.resolve<Bar>(Bar.name) instanceof Bar).toBe(true);
            expect(tornado.resolve<Bar>(Bar.name).method1()).toBe('method1 was called from Bar');
            expect(tornado.resolve<Bar>(Bar.name).method1() === tornado.resolve<Bar>(Bar).method1()).toBe(true);
        });

        test("multiple raw providers by giving object with token and type", () => {
            const tornado = Tornado.register([{
                token: 'foo',
                type: Foo
            }, {
                token: 'bar',
                type: Bar
            }]);

            expect(tornado.resolve<Foo>('foo') instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>('foo').method1()).toBe('method1 was called from Foo');

            expect(tornado.resolve<Bar>('bar') instanceof Bar).toBe(true);
            expect(tornado.resolve<Bar>('bar').method1()).toBe('method1 was called from Bar');
        });
    });

    it('should return the container size', () => {
        expect(Tornado.getContainerSize()).toBe(4);
    })
});