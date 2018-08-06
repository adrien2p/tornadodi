import { TokenMetatypeRawProvider } from './interfaces/token-metatype-raw-provider.interface';
declare class TornadoStatic {
    private containers;
    constructor();
    registerAsSingleton<T>(rawProviders: TokenMetatypeRawProvider<T> | (new (...args: any[]) => T) | (TokenMetatypeRawProvider<T> | (new (...args: any[]) => T))[], scope?: string): this;
    register<T>(rawProviders: TokenMetatypeRawProvider<T> | (new (...args: any[]) => T) | (TokenMetatypeRawProvider<T> | (new (...args: any[]) => T))[], scope?: string): this;
    resolve<T>(tokenOrMetatype: string | (new (...args: any[]) => T), scope?: string): T;
    clear(scope?: string): this;
    getContainerSize(scope?: string): number;
    private getScopedContainer;
}
export declare const Tornado: TornadoStatic;
export {};
