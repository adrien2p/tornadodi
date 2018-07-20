import { Provider } from './provider';
import { TokenTypeProvider } from './interfaces/token-type-provider.interface';
export declare class ProviderContainer {
    private container;
    readonly size: number;
    register<T>(rawProviders: (TokenTypeProvider<T> | (new (...args: any[]) => T))[], options?: {
        isSingleton: boolean;
    }): {
        count: number;
    };
    updateProvider<T>(provider: Provider<T>): void;
    resolve<T>(tokenOrType: string | (new (...args: any[]) => T)): Provider<T>;
    get(token: string): Provider<any>;
    clear(): void;
}
