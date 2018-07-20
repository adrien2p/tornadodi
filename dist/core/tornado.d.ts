import { TokenTypeProvider } from './interfaces/token-type-provider.interface';
declare class TornadoStatic {
    private providerContainer;
    registerAsSingleton<T>(rawProviders: TokenTypeProvider<T> | (new (...args: any[]) => T) | (TokenTypeProvider<T> | (new (...args: any[]) => T))[]): this;
    register<T>(rawProviders: TokenTypeProvider<T> | (new (...args: any[]) => T) | (TokenTypeProvider<T> | (new (...args: any[]) => T))[]): this;
    resolve<T>(tokenOrType: string | (new (...args: any[]) => T)): T;
    clear(): this;
    getContainerSize(): number;
}
export declare const Tornado: TornadoStatic;
export {};
