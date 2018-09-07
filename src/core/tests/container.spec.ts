import { Container } from "../";
import { Injectable } from "../../decorators";

describe('Container', () => {
    let container: Container;

    @Injectable()
    class Foo {
        getNumber(): number {
            return 42;
        }
    }

    it("should be initialize with it's token", () => {
        container = new Container('newContainer1');

        expect(container).toBeTruthy();
        expect(container.token).toBe('newContainer1');
    });
    it("should be able to register a class", () => {
        container.registerAsClass<Foo>({ useClass: Foo });

        expect(container.get<Foo>(Foo)).toBe(null);
    });
    it("should be able to register a value", () => {
        container.registerAsValue<number>({ token: '42', useValue: 42 });

        expect(container.get<number>('42')).toBe(42);
    });
    it("should be able to register a factory", () => {
        container.registerAsFactory({
            inject: [Foo],
            token: '42factory',
            useFactory: (foo: Foo) => foo.getNumber()
        });

        expect(container.get<number>('42factory')).toBe(null);
    });
    it("should not be able to return a value from an unknown provider", () => {
        let error = null;

        try {
            container.get('unknown');
        } catch (e) {
            error = e;
        }

        expect(error).toBeTruthy();
        expect(error.message).toBe('Unable to find the provider with the token "unknown"');
    });
    it('should be able to build the whole dependencies', async () => {
        await container.build();
        const foo = container.get<Foo>(Foo);
        const factory = container.get<number>('42factory');

        expect(foo).toBeTruthy();
        expect(foo instanceof Foo).toBe(true);
        expect(factory).toBe(42);
    });
});