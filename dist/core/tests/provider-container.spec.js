"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const injectable_decorator_1 = require("../../decorators/injectable.decorator");
const provider_1 = require("../provider");
const provider_container_1 = require("../provider-container");
describe("ProviderContainer", () => {
    let Foo = class Foo {
        method1() {
            return 'method1 was called from Foo';
        }
    };
    Foo = __decorate([
        injectable_decorator_1.Injectable()
    ], Foo);
    let container;
    beforeAll(() => container = new provider_container_1.ProviderContainer());
    test('should allow to register a new raw provider', () => {
        const { count } = container.register([Foo]);
        expect(count).toBe(1);
    });
    test('should allow to resolve a provider through the container', () => {
        let provider = new provider_1.Provider({ token: 'Foo', type: Foo });
        container.resolve(provider.token);
        provider = container.get(provider.token);
        expect(provider.instance).toEqual(new Foo());
        expect(provider.isResolved).toBe(true);
    });
    test('should allow to update a provider', () => {
        let provider = new provider_1.Provider({ token: 'Foo', type: Foo });
        expect(provider.instance).toBe(null);
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
        expect(provider.type).toBe(Foo);
    });
    test('should allow to be cleared', () => {
        container.clear();
        expect(container.size).toBe(0);
    });
});
//# sourceMappingURL=provider-container.spec.js.map