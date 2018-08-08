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
        test("or throw if there is no parameter provided", () => {
            try {
                Tornado.registerAsSingleton();
            } catch (e) {
                expect(e.message).toBe('Error: Missing rawProviders parameter.');
            }

            try {
                Tornado.resolve();
            } catch (e) {
                expect(e.message).toBe('Error: Missing token parameter.');
            }
        });

        test("a raw provider by giving a class", () => {
            const tornado = Tornado.registerAsSingleton<Foo>(Foo);

            expect(tornado.resolve<Foo>(Foo) instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>(Foo).method1()).toBe('method1 was called from Foo');
        });

        test("a raw providers by giving object with token and useValue as static value", () => {
            const tornado = Tornado.registerAsSingleton<any>([{
                token: 'useValue',
                useValue: 42
            }]);

            expect(tornado.resolve<any>('useValue')).toBe(42);
        });

        test("a raw providers by giving object with token and useFactory to be executed", () => {
            const tornado = Tornado.registerAsSingleton<any>([Bar, {
                token: 'useFactory',
                useFactory: (bar: Bar) => {
                    return bar.method1();
                },
                inject: [Bar]
            }]);

            expect(tornado.resolve<any>('useFactory')).toBe('method1 was called from Bar');
        });

        test("multiple raw providers by giving classes", () => {
            const tornado = Tornado.registerAsSingleton<any>([Foo, Bar]);

            expect(tornado.resolve<Foo>(Foo) instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>(Foo).method1()).toBe('method1 was called from Foo');

            expect(tornado.resolve<Bar>(Bar) instanceof Bar).toBe(true);
            expect(tornado.resolve<Bar>(Bar).method1()).toBe('method1 was called from Bar');
        });

        test("multiple raw providers by giving object with token and metatype", () => {
            const tornado = Tornado.registerAsSingleton<any>([{
                token: 'foo',
                metatype: Foo
            }, {
                token: 'bar',
                metatype: Bar
            }]);

            expect(tornado.resolve<Foo>('foo') instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>('foo').method1()).toBe('method1 was called from Foo');

            expect(tornado.resolve<Bar>('bar') instanceof Bar).toBe(true);
            expect(tornado.resolve<Bar>('bar').method1()).toBe('method1 was called from Bar');
        });
    });

    describe('should register as not a singleton and resolve', () => {
        beforeAll(() => Tornado.clear());

        test("or throw if there is no parameter provided", () => {
            try {
                Tornado.register();
            } catch (e) {
                expect(e.message).toBe('Error: Missing rawProviders parameter.');
            }

            try {
                Tornado.resolve();
            } catch (e) {
                expect(e.message).toBe('Error: Missing token parameter.');
            }
        });

        test("a raw provider by giving a class", () => {
            const tornado = Tornado.register<Foo>(Foo);

            expect(tornado.resolve<Foo>(Foo) instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>(Foo).method1()).toBe('method1 was called from Foo');
        });

        test("a raw providers by giving object with token and useValue as static value", () => {
            const tornado = Tornado.register<any>([{
                token: 'useValue',
                useValue: 42
            }]);

            expect(tornado.resolve<any>('useValue')).toBe(42);
        });

        test("a raw providers by giving object with token and useFactory to be executed", () => {
            const symbol = Symbol('bar');
            const tornado = Tornado.register<any>([Bar, {
                token: symbol,
                useFactory: (bar: Bar) => {
                    return bar.method1();
                },
                inject: [Bar]
            }]);

            expect(tornado.resolve<any>(symbol)).toBe('method1 was called from Bar');
        });

        test("multiple raw providers by giving classes", () => {
            const tornado = Tornado.register<any>([Foo, Bar]);

            expect(tornado.resolve<Foo>(Foo) instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>(Foo).method1()).toBe('method1 was called from Foo');

            expect(tornado.resolve<Bar>(Bar) instanceof Bar).toBe(true);
            expect(tornado.resolve<Bar>(Bar).method1()).toBe('method1 was called from Bar');
        });

        test("multiple raw providers by giving object with token and type", () => {
            const tornado = Tornado.register<any>([{
                token: 'foo',
                metatype: Foo
            }, {
                token: 'bar',
                metatype: Bar
            }]);

            expect(tornado.resolve<Foo>('foo') instanceof Foo).toBe(true);
            expect(tornado.resolve<Foo>('foo').method1()).toBe('method1 was called from Foo');

            expect(tornado.resolve<Bar>('bar') instanceof Bar).toBe(true);
            expect(tornado.resolve<Bar>('bar').method1()).toBe('method1 was called from Bar');
        });
    });

    it('should return the container size', () => {
        expect(Tornado.getContainerSize()).toBe(6);
    });

    it('should be able to specify a scoped container to work with', () => {
        expect(Tornado.getContainerSize()).toBe(6);
        expect(Tornado.getContainerSize('scoped')).toBe(0);

        Tornado.register<any>([Foo, Bar], 'scoped');
        expect(Tornado.getContainerSize()).toBe(6);
        expect(Tornado.getContainerSize('scoped')).toBe(2);

        Tornado.clear();
        expect(Tornado.getContainerSize()).toBe(0);
        expect(Tornado.getContainerSize('scoped')).toBe(2);
    })
});