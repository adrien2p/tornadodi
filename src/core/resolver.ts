import { Container } from "./container";
import { PARAMTYPES_METADATA, SELF_PARAMTYPES } from "../constants/metadata.constant";
import { Provider } from "./provider";

export class Resolver {
    /**
     * @desc Resolve a provider and it's args and return a provider that should be updated into the container.
     *
     * @param {Provider<any>} provider
     * @param {Container} container
     * @return {Provider<any>}
     */
    public async resolveProvider(provider: Provider<any>, container: Container): Promise<Provider<any>> {
        if (provider.isResolved && provider.asSingleton) return provider;

        if (provider.useClass) {
            const params = Reflect.getMetadata(PARAMTYPES_METADATA, provider.useClass) || [];
            const injectedParams = Reflect.getMetadata(SELF_PARAMTYPES, provider.useClass) || [];
            if (!params.length) {
                provider.resolvedValue = new provider.useClass();
            } else {
                /* Override params with injected params at the specific index. */
                injectedParams.map(
                    (p: { index: number; token: any }) => (params[p.index] = p.token)
                );
                const resolvedArgs = await this.resolveArgs(params, container);
                provider.resolvedValue = new provider.useClass(...resolvedArgs);
            }
        } else if (provider.useValue) {
            return provider;
        } else if (provider.useFactory) {
            const resolvedArgs = await this.resolveArgs(provider.inject, container);
            provider.resolvedValue = await provider.useFactory(...resolvedArgs);
        } else {
            throw new Error(`Unable to resolve the provider with token "${provider.token}".`);
        }

        provider.isResolved = true;
        return provider;
    }

    /**
     * @desc Resolve the arguments of a provider.
     *
     * @param {any[]} args
     * @param {Container} container
     * @return {Promise<any[]>}
     */
    private async resolveArgs(args: any[], container: Container): Promise<any[]> {
        const results: any[] = [];
        for (const arg of args) {
            const provider = container.$$getProvider(arg);
            const resolvedValue = provider.isResolved && provider.asSingleton
                ? provider.resolvedValue
                : (await this.resolveProvider(provider, container)).resolvedValue;
            results.push(resolvedValue);
        }
        return results;
    }
}