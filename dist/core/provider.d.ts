import 'reflect-metadata';
import { Metatype } from './types/metatype.type';
import { ProviderContainer } from './provider-container';
import { TokenMetatype } from './interfaces/token-metatype.interface';
import { TokenUseFactory } from './interfaces/token-useFactory.interface';
import { TokenUseValue } from './interfaces/token-useValue.interface';
export declare class Provider<T> {
    token: string;
    metatype: new (...args: any[]) => T;
    instance: T;
    isSingleton: boolean;
    useValue: any;
    useFactory: (...args: any[]) => any;
    inject: any[];
    private $$resolved;
    constructor(rawProvider: TokenMetatype<T> | TokenUseValue | TokenUseFactory | Metatype<T>, options?: {
        isSingleton: boolean;
    });
    readonly isResolved: boolean;
    resolve(providerContainer: ProviderContainer): Provider<T>;
    private resolveArgs;
}
