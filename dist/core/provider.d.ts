import 'reflect-metadata';
import { ProviderContainer } from './provider-container';
import { TokenMetatypeRawProvider } from './interfaces/token-metatype-raw-provider.interface';
export declare class Provider<T> {
    token: string;
    metatype: new (...args: any[]) => T;
    instance: T;
    isSingleton: boolean;
    private $$resolved;
    constructor(rawProvider: TokenMetatypeRawProvider<T> | (new (...args: any[]) => T), options?: {
        isSingleton: boolean;
    });
    readonly isResolved: boolean;
    static getToken(tokenOrMetatype: string | (new (...args: any[]) => any)): string;
    resolve(providerContainer: ProviderContainer): Provider<T>;
}
