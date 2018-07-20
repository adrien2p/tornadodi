import { TokenTypeProvider } from "./token-type-provider.interface";

export interface ILiteDI {
    register<T>(
        rawProviders: TokenTypeProvider<T> | (new (...args) => T) | (TokenTypeProvider<T> | (new (...args) => T))[]
    ): this;
    resolve<T>(tokenOrType: string | (new (...args) => T)): T;
    clear(): this;
    getContainerSize(): number;
}