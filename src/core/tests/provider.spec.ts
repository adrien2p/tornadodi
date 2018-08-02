import 'reflect-metadata';
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
        constructor(private bar: Bar) { }

        public method1(): string {
            return 'method1 was called from Foo';
        }
    }

    test('should allow to get string token from token of type', () => {
        const fooToken = Provider.getToken(Foo);
        const barToken = Provider.getToken(Bar);

        expect(fooToken).toBe('Foo');
        expect(barToken).toBe('Bar');
    });

   test('should allow to create a new provider as non singleton', () => {
       const provider = new Provider({ token: 'Foo', type: Foo });

       expect(provider.isSingleton).toBe(false);
       expect(provider.token).toBe('Foo');
       expect(provider.instance).toBe(null);
       expect(provider.isResolved).toBe(false);
       expect(provider.type).toBe(Foo);
   });

    test('should allow to create a new provider as singleton', () => {
        const provider = new Provider({ token: 'Foo', type: Foo }, { isSingleton: true });

        expect(provider.isSingleton).toBe(true);
        expect(provider.token).toBe('Foo');
        expect(provider.instance).toBe(null);
        expect(provider.isResolved).toBe(false);
        expect(provider.type).toBe(Foo);
    });

    test('should allow to resolve a provider', () => {
        const container = new ProviderContainer();
        container.register([Foo, Bar]);
        const provider = new Provider({ token: 'Foo', type: Foo });
        provider.resolve(container);

        expect(provider.instance).toEqual(new Foo(new Bar()));
        expect(provider.isResolved).toBe(true);
    });
});