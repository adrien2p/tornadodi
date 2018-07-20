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
describe("Provider", () => {
    let Foo = class Foo {
        method1() {
            return 'method1 was called from Foo';
        }
    };
    Foo = __decorate([
        injectable_decorator_1.Injectable()
    ], Foo);
    test('should allow to get string token from token of type', () => {
        const token = provider_1.Provider.getToken(Foo);
        expect(token).toBe('Foo');
    });
    test('should allow to create a new provider as non singleton', () => {
        const provider = new provider_1.Provider({ token: 'Foo', type: Foo });
        expect(provider.isSingleton).toBe(false);
        expect(provider.token).toBe('Foo');
        expect(provider.instance).toBe(null);
        expect(provider.isResolved).toBe(false);
        expect(provider.type).toBe(Foo);
    });
    test('should allow to create a new provider as singleton', () => {
        const provider = new provider_1.Provider({ token: 'Foo', type: Foo }, { isSingleton: true });
        expect(provider.isSingleton).toBe(true);
        expect(provider.token).toBe('Foo');
        expect(provider.instance).toBe(null);
        expect(provider.isResolved).toBe(false);
        expect(provider.type).toBe(Foo);
    });
    test('should allow to resolve a provider', () => {
        const container = new provider_container_1.ProviderContainer();
        const provider = new provider_1.Provider({ token: 'Foo', type: Foo });
        provider.resolve(container);
        expect(provider.instance).toEqual(new Foo());
        expect(provider.isResolved).toBe(true);
    });
});
//# sourceMappingURL=provider.spec.js.map