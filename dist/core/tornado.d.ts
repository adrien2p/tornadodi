import { Metatype } from './types/metatype.type';
import { TokenMetatype } from './interfaces/token-metatype.interface';
import { TokenUseFactory } from './interfaces/token-useFactory.interface';
import { TokenUseValue } from './interfaces/token-useValue.interface';
declare class TornadoStatic {
    private containers;
    constructor();
    registerAsSingleton<T>(rawProviders: TokenMetatype<T> | TokenUseValue | TokenUseFactory | Metatype<T> | (TokenMetatype<T> | TokenUseValue | TokenUseFactory | Metatype<T>)[], scope?: string): this;
    register<T>(rawProviders: TokenMetatype<T> | TokenUseValue | TokenUseFactory | Metatype<T> | (TokenMetatype<T> | TokenUseValue | TokenUseFactory | Metatype<T>)[], scope?: string): this;
    resolve<T>(token: any, scope?: string): T;
    clear(scope?: string): this;
    getContainerSize(scope?: string): number;
    private getScopedContainer;
}
export declare const Tornado: TornadoStatic;
export {};
