import { ProviderContainer } from './provider-container';
import { TokenMetatypeRawProvider } from './interfaces/token-metatype-raw-provider.interface';
import { CatchError } from '../decorators/catch-error.decorator';

class TornadoStatic {
	private containers: Map<string, ProviderContainer> = new Map<string, ProviderContainer>();

	constructor() {
		const defaultContainer = new ProviderContainer();
		this.containers.set('default', defaultContainer);
	}

	@CatchError()
	public registerAsSingleton<T>(
		rawProviders:
			| TokenMetatypeRawProvider<T>
			| (new (...args: any[]) => T)
			| (TokenMetatypeRawProvider<T> | (new (...args: any[]) => T))[],
		scope?: string
	): this {
		if (!rawProviders || (Array.isArray(rawProviders) && !rawProviders.length)) {
			throw new Error('Missing rawProviders parameter.');
		}
		rawProviders = !Array.isArray(rawProviders) ? [rawProviders] : rawProviders;
		this.getScopedContainer(scope).register<T>(rawProviders, { isSingleton: true });
		return this;
	}

	@CatchError()
	public register<T>(
		rawProviders:
			| TokenMetatypeRawProvider<T>
			| (new (...args: any[]) => T)
			| (TokenMetatypeRawProvider<T> | (new (...args: any[]) => T))[],
		scope?: string
	): this {
		if (!rawProviders || (Array.isArray(rawProviders) && !rawProviders.length)) {
			throw new Error('Missing rawProviders parameter.');
		}
		rawProviders = !Array.isArray(rawProviders) ? [rawProviders] : rawProviders;
		this.getScopedContainer(scope).register<T>(rawProviders);
		return this;
	}

	@CatchError()
	public resolve<T>(tokenOrMetatype: string | (new (...args: any[]) => T), scope?: string): T {
		if (!tokenOrMetatype) throw new Error('Missing tokenOrMetatype parameter.');
		const provider = this.getScopedContainer(scope).resolve(tokenOrMetatype);
		return provider.instance;
	}

	public clear(scope?: string): this {
		this.getScopedContainer(scope).clear();
		return this;
	}

	public getContainerSize(scope?: string): number {
		return this.getScopedContainer(scope).size;
	}

	private getScopedContainer(scope?: string): ProviderContainer {
		scope = scope || 'default';
		return (
			this.containers.get(scope) || this.containers.set(scope, new ProviderContainer()).get(scope)
		);
	}
}

export const Tornado = new TornadoStatic();
