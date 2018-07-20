"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const metadata_constant_1 = require("../constants/metadata.constant");
class Provider {
    constructor(provider, options) {
        this.token = typeof provider === 'function' ? provider.name : provider.token;
        this.type = typeof provider === 'function' ? provider : provider.type;
        this.instance = null;
        this.isResolved = false;
        this.isSingleton = options ? options.isSingleton : false;
    }
    get isResolved() {
        return this.$$resolved;
    }
    set isResolved(value) {
        this.$$resolved = value;
    }
    static getToken(tokenOrType) {
        if (typeof tokenOrType === 'function')
            return tokenOrType.name;
        return tokenOrType;
    }
    resolve(providerContainer) {
        const { token, type: ClassProvider } = this;
        if (this.isResolved && this.isSingleton)
            return providerContainer.get(token);
        const params = Reflect.getMetadata(metadata_constant_1.PARAMTYPES_METADATA, ClassProvider) || [];
        const injectedParams = Reflect.getMetadata(metadata_constant_1.SELF_PARAMTYPES, ClassProvider) || [];
        if (!params.length) {
            this.instance = new ClassProvider();
        }
        else {
            injectedParams.map((p) => (params[p.index] = p.tokenOrType));
            const resolvedParams = params.map((param) => {
                const provider = providerContainer.get(typeof param === 'string' ? param : param.name);
                return provider.isResolved && provider.isSingleton
                    ? provider.instance
                    : provider.resolve(providerContainer).instance;
            });
            this.instance = new ClassProvider(...resolvedParams);
        }
        this.isResolved = true;
        providerContainer.updateProvider(this);
        return this;
    }
}
exports.Provider = Provider;
//# sourceMappingURL=provider.js.map