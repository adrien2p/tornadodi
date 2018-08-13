import { Provider } from "./provider";
import { ProviderOptions } from "./interfaces/provider-options.interface";
import { Resolver } from "./resolver";

export class Container {
    private $$container: Map<any, Provider<any>> = new Map<any, Provider<any>>();
    private $$isBuilt: boolean = false;
    private $$Resolver: Resolver = new Resolver();
    private $$token: any;

    get token(): any { return this.$$token; }

    constructor(token: any) {
        this.$$token = token;
    }

    /**
     * @desc [INTERNAL PURPOSE] Allow you to get the provider instance instead of the resolved value of the provider.
     *
     * @param token
     * @return {Provider<any>}
     */
    public $$getProvider(token: any): Provider<any> {
        const provider = this.$$container.get(token);
        if (!provider) throw new Error(`Unable to find the provider with the token "${token}"`);
        return provider;
    }

    /**
     * @desc Find and return the value of the provider link to the given token.
     *
     * @param token
     * @return {any}
     */
    public get<T>(token: any): T {
        return this.$$getProvider(token).resolvedValue;
    }

    /**
     * @desc Allow to register a new provider by giving a class that will be resolved.
     *
     * @param {{new(...args: any[]): T}} useClass
     * @param {any} token
     * @param {boolean} asSingleton
     * @return {Container}
     */
    public registerAsClass<T>({ useClass, token, asSingleton }: { useClass: (new (...args: any[]) => T), token?: any, asSingleton?: boolean }): Container {
        return this.register({ useClass, token: token || useClass, asSingleton } as ProviderOptions<T>);
    }

    /**
     * @desc Allow to register a new provider by giving a factory that will be resolved.
     *
     * @param {(...args: any[]) => T} useFactory
     * @param {any} token
     * @param {any[]} inject
     * @param {boolean} asSingleton
     * @return {Container}
     */
    public registerAsFactory<T>({ useFactory, token, inject, asSingleton }: { useFactory: (...args: any[]) => T, token: any, inject?: any[], asSingleton?: boolean }): Container {
        return this.register({ useFactory, token, inject, asSingleton } as ProviderOptions<T>);
    }

    /**
     * @desc Allow to register a new provider by giving a static value that will be resolved.
     *
     * @param {T} useValue
     * @param {any} token
     * @param {boolean} asSingleton
     * @return {Container}
     */
    public registerAsValue<T>({ useValue, token, asSingleton }: { useValue: T, token: any, asSingleton?: boolean }): Container {
        return this.register({ useValue, token, asSingleton } as ProviderOptions<T>);
    }

    /**
     * @desc Allow to resolve the whole container dependencies.
     *
     * @param {boolean} force
     * @return {Container}
     */
    public async build(force?: boolean): Promise<Container> {
        if (this.$$isBuilt && !force) return this;

        const providers = this.$$container.values();
        for (const provider of providers) {
            await this.$$Resolver.resolveProvider(provider, this);
        }
        this.$$isBuilt = true;
        return this;
    }

    /**
     * @desc Register a new provider into the container.
     *
     * @param {ProviderOptions<T>} providerOptions
     * @return {Container}
     */
    private register<T>(providerOptions: ProviderOptions<T>): Container {
        const provider = new Provider(providerOptions);
        this.$$container.set(provider.token, provider);
        return this;
    }
}