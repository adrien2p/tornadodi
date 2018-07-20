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
const log_decorator_1 = require("../decorators/log.decorator");
const provider_1 = require("./provider");
class TornadoStatic {
    constructor() {
        this.providerContainer = new provider_container_1.ProviderContainer();
    }
    registerAsSingleton(rawProviders) {
        rawProviders = !Array.isArray(rawProviders) ? [rawProviders] : rawProviders;
        this.providerContainer.register(rawProviders, { isSingleton: true });
        return this;
    }
    register(rawProviders) {
        rawProviders = !Array.isArray(rawProviders) ? [rawProviders] : rawProviders;
        this.providerContainer.register(rawProviders);
        return this;
    }
    resolve(tokenOrType) {
        const provider = this.providerContainer.resolve(tokenOrType);
        return provider.instance;
    }
    clear() {
        this.providerContainer.clear();
        return this;
    }
    getContainerSize() {
        return this.providerContainer.size;
    }
}
__decorate([
    log_decorator_1.Log({
        level: 'info',
        message: injectedParameters => {
            const rawProviders = !Array.isArray(injectedParameters[0])
                ? [injectedParameters[0]]
                : injectedParameters[0];
            return `${rawProviders.length} providers have been registered as singleton`;
        },
        injectOriginalMethodArgs: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], TornadoStatic.prototype, "registerAsSingleton", null);
__decorate([
    log_decorator_1.Log({
        level: 'info',
        message: injectedParameters => {
            const rawProviders = !Array.isArray(injectedParameters[0])
                ? [injectedParameters[0]]
                : injectedParameters[0];
            return `${rawProviders.length} providers have been registered`;
        },
        injectOriginalMethodArgs: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], TornadoStatic.prototype, "register", null);
__decorate([
    log_decorator_1.Log({
        level: 'info',
        message: injectedParameters => {
            const token = provider_1.Provider.getToken(injectedParameters[0]);
            return `[${token}] provider have been resolved`;
        },
        injectOriginalMethodArgs: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_a = typeof T !== "undefined" && T) === "function" && _a || Object)
], TornadoStatic.prototype, "resolve", null);
exports.Tornado = new TornadoStatic();
//# sourceMappingURL=tornado.js.map