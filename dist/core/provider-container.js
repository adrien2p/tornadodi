"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const provider_1 = require("./provider");
class ProviderContainer {
    constructor() {
        this.container = new Map();
    }
    get size() {
        return this.container.size;
    }
    register(rawProviders, options) {
        for (const rawProvider of rawProviders) {
            const provider = new provider_1.Provider(rawProvider, options);
            this.container.set(provider.token, provider);
        }
        return { count: rawProviders.length };
    }
    updateProvider(provider) {
        this.container.set(provider.token, provider);
    }
    resolve(tokenOrType) {
        const token = provider_1.Provider.getToken(tokenOrType);
        return this.container.get(token).resolve(this);
    }
    get(token) {
        return this.container.get(token);
    }
    clear() {
        this.container.clear();
    }
}
exports.ProviderContainer = ProviderContainer;
//# sourceMappingURL=provider-container.js.map