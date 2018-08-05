import { ProviderContainer } from './provider-container';
import { TokenMetatypeRawProvider } from './interfaces/token-metatype-raw-provider.interface';
import { CatchError } from '../decorators/catch-error.decorator';

class TornadoStatic {
	private providerContainer: ProviderContainer = new ProviderContainer();

	@CatchError()
	public registerAsSingleton<T>(
		rawProviders:
			| TokenMetatypeRawProvider<T>
			| (new (...args: any[]) => T)
			| (TokenMetatypeRawProvider<T> | (new (...args: any[]) => T))[]
	): this {
		if (!rawProviders || (Array.isArray(rawProviders) && !rawProviders.length)) {
			throw new Error('Missing rawProviders parameter.');
		}
		rawProviders = !Array.isArray(rawProviders) ? [rawProviders] : rawProviders;
		this.providerContainer.register<T>(rawProviders, { isSingleton: true });
		return this;
	}

	@CatchError()
	public register<T>(
		rawProviders:
			| TokenMetatypeRawProvider<T>
			| (new (...args: any[]) => T)
			| (TokenMetatypeRawProvider<T> | (new (...args: any[]) => T))[]
	): this {
		if (!rawProviders || (Array.isArray(rawProviders) && !rawProviders.length)) {
			throw new Error('Missing rawProviders parameter.');
		}
		rawProviders = !Array.isArray(rawProviders) ? [rawProviders] : rawProviders;
		this.providerContainer.register<T>(rawProviders);
		return this;
	}

	@CatchError()
	public resolve<T>(tokenOrMetatype: string | (new (...args: any[]) => T)): T {
		if (!tokenOrMetatype) throw new Error('Missing tokenOrMetatype parameter.');
		const provider = this.providerContainer.resolve(tokenOrMetatype);
		return provider.instance;
	}

	public clear(): this {
		this.providerContainer.clear();
		return this;
	}

	public getContainerSize(): number {
		return this.providerContainer.size;
	}
}

export const Tornado = new TornadoStatic();
