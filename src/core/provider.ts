import 'reflect-metadata';
import { PARAMTYPES_METADATA, SELF_PARAMTYPES } from '../constants/metadata.constant';
import { ProviderContainer } from './provider-container';
import { TokenMetatypeRawProvider } from './interfaces/token-metatype-raw-provider.interface';

export class Provider<T> {
	public token: string;
	public metatype: new (...args: any[]) => T;
	public instance: T;
	public isSingleton: boolean;
	private $$resolved: boolean;

	constructor(
		rawProvider: TokenMetatypeRawProvider<T> | (new (...args: any[]) => T),
		options?: { isSingleton: boolean }
	) {
		this.token = typeof rawProvider === 'function' ? rawProvider.name : rawProvider.token;
		this.metatype = typeof rawProvider === 'function' ? rawProvider : rawProvider.metatype;
		this.instance = null;
		this.$$resolved = false;
		this.isSingleton = options ? options.isSingleton : false;
	}

	get isResolved(): boolean {
		return this.$$resolved;
	}

	static getToken(tokenOrMetatype: string | (new (...args: any[]) => any)): string {
		return (<any>tokenOrMetatype).name || tokenOrMetatype;
	}

	public resolve(providerContainer: ProviderContainer): Provider<T> {
		const { token, metatype: Metatype } = this;
		if (this.$$resolved && this.isSingleton) return providerContainer.get(token);

		const params = Reflect.getMetadata(PARAMTYPES_METADATA, Metatype) || [];
		const injectedParams = Reflect.getMetadata(SELF_PARAMTYPES, Metatype) || [];
		if (!params.length) {
			this.instance = new Metatype();
		} else {
			injectedParams.map(
				(p: { index: number; token: string | (new (...args: any[]) => any) }) =>
					(params[p.index] = p.token)
			);
			const resolvedParams = params.map((param: string | (new (...args: any[]) => any)) => {
				const provider = providerContainer.get(Provider.getToken(param));
				return provider.$$resolved && provider.isSingleton
					? provider.instance
					: provider.resolve(providerContainer).instance;
			});
			this.instance = new Metatype(...resolvedParams);
		}

		this.$$resolved = true;
		providerContainer.updateProvider(this);
		return this;
	}
}
