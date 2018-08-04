import { ProviderContainer } from './provider-container';
import { TokenTypeProvider } from './interfaces/token-type-provider.interface';
import { Log } from '../decorators/log.decorator';
import { Provider } from './provider';

class TornadoStatic {
	private providerContainer: ProviderContainer = new ProviderContainer();

	@Log({
		message: injectedParameters => {
			const rawProviders = !Array.isArray(injectedParameters[0])
				? [injectedParameters[0]]
				: injectedParameters[0];
			return `${rawProviders.length} providers have been registered as singleton`;
		},
		injectOriginalMethodArgs: true,
	})
	public registerAsSingleton<T>(
		rawProviders:
			| TokenTypeProvider<T>
			| (new (...args: any[]) => T)
			| (TokenTypeProvider<T> | (new (...args: any[]) => T))[]
	): this {
		rawProviders = !Array.isArray(rawProviders) ? [rawProviders] : rawProviders;
		this.providerContainer.register<T>(rawProviders, { isSingleton: true });
		return this;
	}

	@Log({
		message: injectedParameters => {
			const rawProviders = !Array.isArray(injectedParameters[0])
				? [injectedParameters[0]]
				: injectedParameters[0];
			return `${rawProviders.length} providers have been registered`;
		},
		injectOriginalMethodArgs: true,
	})
	public register<T>(
		rawProviders:
			| TokenTypeProvider<T>
			| (new (...args: any[]) => T)
			| (TokenTypeProvider<T> | (new (...args: any[]) => T))[]
	): this {
		rawProviders = !Array.isArray(rawProviders) ? [rawProviders] : rawProviders;
		this.providerContainer.register<T>(rawProviders);
		return this;
	}

	@Log({
		message: injectedParameters => {
			const token = Provider.getToken(injectedParameters[0]);
			return `[${token}] provider have been resolved`;
		},
		injectOriginalMethodArgs: true,
	})
	public resolve<T>(tokenOrType: string | (new (...args: any[]) => T)): T {
		const provider = this.providerContainer.resolve(tokenOrType);
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
