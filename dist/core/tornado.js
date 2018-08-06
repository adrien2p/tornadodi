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
var _a;
const provider_container_1 = require("./provider-container");
const catch_error_decorator_1 = require("../decorators/catch-error.decorator");
class TornadoStatic {
    constructor() {
        this.containers = new Map();
        const defaultContainer = new provider_container_1.ProviderContainer();
        this.containers.set('default', defaultContainer);
    }
    registerAsSingleton(rawProviders, scope) {
        if (!rawProviders || (Array.isArray(rawProviders) && !rawProviders.length)) {
            throw new Error('Missing rawProviders parameter.');
        }
        rawProviders = !Array.isArray(rawProviders) ? [rawProviders] : rawProviders;
        this.getScopedContainer(scope).register(rawProviders, { isSingleton: true });
        return this;
    }
    register(rawProviders, scope) {
        if (!rawProviders || (Array.isArray(rawProviders) && !rawProviders.length)) {
            throw new Error('Missing rawProviders parameter.');
        }
        rawProviders = !Array.isArray(rawProviders) ? [rawProviders] : rawProviders;
        this.getScopedContainer(scope).register(rawProviders);
        return this;
    }
    resolve(tokenOrMetatype, scope) {
        if (!tokenOrMetatype)
            throw new Error('Missing tokenOrMetatype parameter.');
        const provider = this.getScopedContainer(scope).resolve(tokenOrMetatype);
        return provider.instance;
    }
    clear(scope) {
        this.getScopedContainer(scope).clear();
        return this;
    }
    getContainerSize(scope) {
        return this.getScopedContainer(scope).size;
    }
    getScopedContainer(scope) {
        scope = scope || 'default';
        return (this.containers.get(scope) || this.containers.set(scope, new provider_container_1.ProviderContainer()).get(scope));
    }
}
__decorate([
    catch_error_decorator_1.CatchError(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Object)
], TornadoStatic.prototype, "registerAsSingleton", null);
__decorate([
    catch_error_decorator_1.CatchError(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Object)
], TornadoStatic.prototype, "register", null);
__decorate([
    catch_error_decorator_1.CatchError(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", typeof (_a = typeof T !== "undefined" && T) === "function" && _a || Object)
], TornadoStatic.prototype, "resolve", null);
exports.Tornado = new TornadoStatic();
//# sourceMappingURL=tornado.js.map