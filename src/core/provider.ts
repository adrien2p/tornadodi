import 'reflect-metadata';
import { PARAMTYPES_METADATA, SELF_PARAMTYPES } from '../constants/metadata.constant';
import { ProviderContainer } from './provider-container';
import { TokenTypeProvider } from './interfaces/token-type-provider.interface';

export class Provider<T> {
	public token: string;
	public type: new (...args: any[]) => T;
	public instance: T;
	public isSingleton: boolean;
	private $$resolved: boolean;

	constructor(
		provider: TokenTypeProvider<T> | (new (...args: any[]) => T),
		options?: { isSingleton: boolean },
	) {
		this.token = typeof provider === 'function' ? provider.name : provider.token;
		this.type = typeof provider === 'function' ? provider : provider.type;
		this.instance = null;
		this.$$resolved = false;
		this.isSingleton = options ? options.isSingleton : false;
	}

	get isResolved(): boolean {
		return this.$$resolved;
	}

	static getToken(tokenOrType: string | (new (...args: any[]) => any)): string {
		if (typeof tokenOrType === 'function') return tokenOrType.name;
		return tokenOrType;
	}

	public resolve(providerContainer: ProviderContainer): Provider<T> {
		const { token, type: ClassProvider } = this;
		if (this.$$resolved && this.isSingleton) return providerContainer.get(token);

		const params = Reflect.getMetadata(PARAMTYPES_METADATA, ClassProvider) || [];
		const injectedParams = Reflect.getMetadata(SELF_PARAMTYPES, ClassProvider) || [];
		if (!params.length) {
			this.instance = new ClassProvider();
		} else {
			injectedParams.map(
				(p: { index: number; tokenOrType: string | Function }) => (params[p.index] = p.tokenOrType),
			);
			const resolvedParams = params.map((param: string | Function) => {
				const provider = providerContainer.get(typeof param === 'string' ? param : param.name);
				return provider.$$resolved && provider.isSingleton
					? provider.instance
					: provider.resolve(providerContainer).instance;
			});
			this.instance = new ClassProvider(...resolvedParams);
		}

		this.$$resolved = true;
		providerContainer.updateProvider(this);
		return this;
	}
}
