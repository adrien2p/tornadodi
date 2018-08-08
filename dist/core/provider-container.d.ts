import { Metatype } from './types/metatype.type';
import { Provider } from './provider';
import { TokenMetatype } from './interfaces/token-metatype.interface';
import { TokenUseFactory } from './interfaces/token-useFactory.interface';
import { TokenUseValue } from './interfaces/token-useValue.interface';
export declare class ProviderContainer {
    private container;
    readonly size: number;
    register<T>(rawProviders: (TokenMetatype<T> | TokenUseValue | TokenUseFactory | Metatype<T>)[], options?: {
        isSingleton: boolean;
    }): {
        count: number;
    };
    updateProvider<T>(provider: Provider<T>): void;
    resolve<T>(tokenOrMetatype: string | Metatype<T>): Provider<T>;
    get(token: string): Provider<any>;
    clear(): void;
}
