import 'reflect-metadata';
import { ProviderContainer } from './provider-container';
import { TokenTypeProvider } from './interfaces/token-type-provider.interface';
export declare class Provider<T> {
    token: string;
    type: new (...args: any[]) => T;
    instance: T;
    isSingleton: boolean;
    private $$resolved;
    constructor(provider: TokenTypeProvider<T> | (new (...args: any[]) => T), options?: {
        isSingleton: boolean;
    });
    readonly isResolved: boolean;
    static getToken(tokenOrType: string | (new (...args: any[]) => any)): string;
    resolve(providerContainer: ProviderContainer): Provider<T>;
}
