import 'reflect-metadata';
import { Injectable } from "../../decorators/injectable.decorator";
import { Provider } from "../provider";
import { ProviderContainer } from "../provider-container";

describe("ProviderContainer", () => {
    @Injectable()
    class Foo {
        public method1(): string {
            return 'method1 was called from Foo';
        }
    }

    let container: ProviderContainer;
    beforeAll(() => container = new ProviderContainer());

    test('should allow to register a new raw provider', () => {
        const { count } = container.register([Foo]);

        expect(count).toBe(1);
    });

    test('should allow to resolve a provider through the container', () => {
        let provider = new Provider({ token: 'Foo', metatype: Foo });
        container.register([{ token: 'Foo', metatype: Foo }]);
        container.resolve(provider.token);
        provider = container.get(provider.token);

        expect(provider.instance).toEqual(new Foo());
        expect(provider.isResolved).toBe(true);
    });

    test('should allow to update a provider', () => {
        let provider = new Provider({ token: 'Foo', metatype: Foo });

        expect(provider.instance).toBe(undefined);
        expect(provider.isResolved).toBe(false);

        provider.resolve(container);
        container.updateProvider(provider);
        provider = container.get(provider.token);

        expect(provider.instance).toEqual(new Foo());
        expect(provider.isResolved).toBe(true);
    });

    test('should allow to get a provider', () => {
        const provider = container.get('Foo');

        expect(provider).toBeDefined();
        expect(provider.token).toBe('Foo');
        expect(provider.metatype).toBe(Foo);
    });

    test('should allow to be cleared', () => {
        container.clear();

        expect(container.size).toBe(0);
    });
});