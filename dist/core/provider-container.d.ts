import { Provider } from './provider';
import { TokenMetatypeRawProvider } from './interfaces/token-metatype-raw-provider.interface';
export declare class ProviderContainer {
    private container;
    readonly size: number;
    register<T>(rawProviders: (TokenMetatypeRawProvider<T> | (new (...args: any[]) => T))[], options?: {
        isSingleton: boolean;
    }): {
        count: number;
    };
    updateProvider<T>(provider: Provider<T>): void;
    resolve<T>(tokenOrMetatype: string | (new (...args: any[]) => T)): Provider<T>;
    get(token: string): Provider<any>;
    clear(): void;
}
