import { Provider } from './provider';
import { TokenTypeProvider } from './interfaces/token-type-provider.interface';

export class ProviderContainer {
	private container: Map<string, Provider<any>> = new Map();

	get size(): number {
		return this.container.size;
	}

	public register<T>(
		rawProviders: (TokenTypeProvider<T> | (new (...args: any[]) => T))[],
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

	public resolve<T>(tokenOrType: string | (new (...args: any[]) => T)): Provider<T> {
		const token = Provider.getToken(tokenOrType);
		return this.container.get(token).resolve(this);
	}

	public get(token: string): Provider<any> {
		return this.container.get(token);
	}

	public clear(): void {
		this.container.clear();
	}
}
