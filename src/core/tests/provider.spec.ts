import 'reflect-metadata';
import { Inject } from "../../decorators";
import { Injectable } from "../../decorators/injectable.decorator";
import { Provider } from "../provider";
import { ProviderContainer } from "../provider-container";

describe("Provider", () => {
    @Injectable()
    class Bar {
        public method1(): string {
            return 'method1 was called from Foo';
        }
    }

    @Injectable()
    class Foo {
        constructor(@Inject(Bar) private bar: Bar) { }

        public method1(): string {
            return 'method1 was called from Foo';
        }
    }

   test('should allow to create a new provider as non singleton', () => {
       const provider = new Provider({ token: 'Foo', metatype: Foo });

       expect(provider.isSingleton).toBe(false);
       expect(provider.token).toBe('Foo');
       expect(provider.instance).toBe(undefined);
       expect(provider.useValue).toBe(undefined);
       expect(provider.useFactory).toBe(undefined);
       expect(provider.inject).toEqual([]);
       expect(provider.isResolved).toBe(false);
       expect(provider.metatype).toBe(Foo);
   });

    test('should allow to create a new provider as singleton', () => {
        const provider = new Provider({ token: 'Foo', metatype: Foo }, { isSingleton: true });

        expect(provider.isSingleton).toBe(true);
        expect(provider.token).toBe('Foo');
        expect(provider.instance).toBe(undefined);
        expect(provider.useValue).toBe(undefined);
        expect(provider.useFactory).toBe(undefined);
        expect(provider.inject).toEqual([]);
        expect(provider.isResolved).toBe(false);
        expect(provider.metatype).toBe(Foo);
    });

    test('should allow to resolve a provider from metatype', () => {
        const container = new ProviderContainer();
        container.register<any>([Foo, Bar]);
        const provider = new Provider(Foo);
        provider.resolve(container);

        expect(provider.instance).toEqual(new Foo(new Bar()));
        expect(provider.isResolved).toBe(true);
    });

    test('should allow to resolve a provider from useValue', () => {
        const container = new ProviderContainer();
        container.register<any>([{ token: 'useValue', useValue: 42 }]);
        const provider = new Provider({ token: 'useValue', useValue: 42 });
        provider.resolve(container);

        expect(provider.instance).toBe(42);
        expect(provider.isResolved).toBe(true);
    });
});