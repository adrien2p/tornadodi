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
require("reflect-metadata");
const catch_error_decorator_1 = require("../decorators/catch-error.decorator");
const metadata_constant_1 = require("../constants/metadata.constant");
const provider_container_1 = require("./provider-container");
class Provider {
    constructor(rawProvider, options) {
        this.token =
            typeof rawProvider === 'function' ? rawProvider.name : rawProvider.token;
        this.metatype = typeof rawProvider === 'function' ? rawProvider : rawProvider.metatype;
        this.useValue = rawProvider.useValue;
        this.useFactory = rawProvider.useFactory;
        this.inject = rawProvider.inject || [];
        this.instance = undefined;
        this.$$resolved = false;
        this.isSingleton = options ? options.isSingleton : false;
    }
    get isResolved() {
        return this.$$resolved;
    }
    static getToken(tokenOrMetatype) {
        return tokenOrMetatype.name || tokenOrMetatype;
    }
    resolve(providerContainer) {
        if (this.$$resolved && this.isSingleton)
            return providerContainer.get(this.token);
        if (this.metatype) {
            const params = Reflect.getMetadata(metadata_constant_1.PARAMTYPES_METADATA, this.metatype) || [];
            const injectedParams = Reflect.getMetadata(metadata_constant_1.SELF_PARAMTYPES, this.metatype) || [];
            if (!params.length) {
                this.instance = new this.metatype();
            }
            else {
                /* Override params with injected params at the specific index. */
                injectedParams.map((p) => (params[p.index] = p.token));
                const resolvedArgs = this.resolveArgs(params, providerContainer);
                this.instance = new this.metatype(...resolvedArgs);
            }
        }
        else if (this.useValue) {
            this.instance = this.useValue;
        }
        else if (this.useFactory) {
            const resolvedArgs = this.resolveArgs(this.inject, providerContainer);
            this.instance = this.useFactory(...resolvedArgs);
        }
        else {
            throw new Error(`Unable to resolve the provider with token "${this.token}"`);
        }
        this.$$resolved = true;
        providerContainer.updateProvider(this);
        return this;
    }
    resolveArgs(args, providerContainer) {
        return args.map((param) => {
            const provider = providerContainer.get(Provider.getToken(param));
            return provider.$$resolved && provider.isSingleton
                ? provider.instance
                : provider.resolve(providerContainer).instance;
        });
    }
}
__decorate([
    catch_error_decorator_1.CatchError(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provider_container_1.ProviderContainer]),
    __metadata("design:returntype", Provider)
], Provider.prototype, "resolve", null);
exports.Provider = Provider;
//# sourceMappingURL=provider.js.map