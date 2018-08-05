import { TokenMetatypeRawProvider } from './interfaces/token-metatype-raw-provider.interface';
declare class TornadoStatic {
    private providerContainer;
    registerAsSingleton<T>(rawProviders: TokenMetatypeRawProvider<T> | (new (...args: any[]) => T) | (TokenMetatypeRawProvider<T> | (new (...args: any[]) => T))[]): this;
    register<T>(rawProviders: TokenMetatypeRawProvider<T> | (new (...args: any[]) => T) | (TokenMetatypeRawProvider<T> | (new (...args: any[]) => T))[]): this;
    resolve<T>(tokenOrMetatype: string | (new (...args: any[]) => T)): T;
    clear(): this;
    getContainerSize(): number;
}
export declare const Tornado: TornadoStatic;
export {};
