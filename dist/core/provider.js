"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const metadata_constant_1 = require("../constants/metadata.constant");
class Provider {
    constructor(rawProvider, options) {
        this.token = typeof rawProvider === 'function' ? rawProvider.name : rawProvider.token;
        this.metatype = typeof rawProvider === 'function' ? rawProvider : rawProvider.metatype;
        this.instance = null;
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
        const { token, metatype: Metatype } = this;
        if (this.$$resolved && this.isSingleton)
            return providerContainer.get(token);
        const params = Reflect.getMetadata(metadata_constant_1.PARAMTYPES_METADATA, Metatype) || [];
        const injectedParams = Reflect.getMetadata(metadata_constant_1.SELF_PARAMTYPES, Metatype) || [];
        if (!params.length) {
            this.instance = new Metatype();
        }
        else {
            injectedParams.map((p) => (params[p.index] = p.token));
            const resolvedParams = params.map((param) => {
                const provider = providerContainer.get(Provider.getToken(param));
                return provider.$$resolved && provider.isSingleton
                    ? provider.instance
                    : provider.resolve(providerContainer).instance;
            });
            this.instance = new Metatype(...resolvedParams);
        }
        this.$$resolved = true;
        providerContainer.updateProvider(this);
        return this;
    }
}
exports.Provider = Provider;
//# sourceMappingURL=provider.js.map