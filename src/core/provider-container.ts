import { Metatype } from './types/metatype.type';
import { Provider } from './provider';
import { TokenMetatype } from './interfaces/token-metatype.interface';
import { TokenUseFactory } from './interfaces/token-useFactory.interface';
import { TokenUseValue } from './interfaces/token-useValue.interface';

export class ProviderContainer {
	private container: Map<any, Provider<any>> = new Map<any, Provider<any>>();

	get size(): number {
		return this.container.size;
	}

	public register<T>(
		rawProviders: (TokenMetatype<T> | TokenUseValue | TokenUseFactory | Metatype<T>)[],
		options?: { isSingleton: boolean }
	): { count: number } {
		for (const rawProvider of rawProviders) {
			const provider = new Provider<T>(rawProvider, options);
			this.container.set(provider.token, provider);
		}
		return { count: rawProviders.length };
	}

	public updateProvider<T>(provider: Provider<T>): void {
		this.container.set(provider.token, provider);
	}

	public resolve<T>(token: any): Provider<T> {
		return this.container.get(token).resolve(this);
	}

	public get(token: string): Provider<any> {
		return this.container.get(token);
	}

	public clear(): void {
		this.container.clear();
	}
}
