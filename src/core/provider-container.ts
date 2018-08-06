import { Provider } from './provider';
import { TokenMetatypeRawProvider } from './interfaces/token-metatype-raw-provider.interface';

export class ProviderContainer {
	private container: Map<string, Provider<any>> = new Map<string, Provider<any>>();

	get size(): number {
		return this.container.size;
	}

	public register<T>(
		rawProviders: (TokenMetatypeRawProvider<T> | (new (...args: any[]) => T))[],
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

	public resolve<T>(tokenOrMetatype: string | (new (...args: any[]) => T)): Provider<T> {
		const token = Provider.getToken(tokenOrMetatype);
		return this.container.get(token).resolve(this);
	}

	public get(token: string): Provider<any> {
		return this.container.get(token);
	}

	public clear(): void {
		this.container.clear();
	}
}
