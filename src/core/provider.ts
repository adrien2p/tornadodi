import 'reflect-metadata';
import { CatchError } from '../decorators/catch-error.decorator';
import { Metatype } from './types/metatype.type';
import { PARAMTYPES_METADATA, SELF_PARAMTYPES } from '../constants/metadata.constant';
import { ProviderContainer } from './provider-container';
import { TokenMetatype } from './interfaces/token-metatype.interface';
import { TokenUseFactory } from './interfaces/token-useFactory.interface';
import { TokenUseValue } from './interfaces/token-useValue.interface';

export class Provider<T> {
	public token: string;
	public metatype: new (...args: any[]) => T;
	public instance: T;
	public isSingleton: boolean;
	public useValue: any;
	public useFactory: (...args: any[]) => any;
	public inject: any[];
	private $$resolved: boolean;

	constructor(
		rawProvider: TokenMetatype<T> | TokenUseValue | TokenUseFactory | Metatype<T>,
		options?: { isSingleton: boolean }
	) {
		this.token = typeof rawProvider === 'object' ? (<any>rawProvider).token : rawProvider;
		this.metatype = typeof rawProvider === 'function' ? rawProvider : (<any>rawProvider).metatype;
		this.useValue = (<any>rawProvider).useValue;
		this.useFactory = (<any>rawProvider).useFactory;
		this.inject = (<any>rawProvider).inject || [];

		this.instance = undefined;
		this.$$resolved = false;
		this.isSingleton = options ? options.isSingleton : false;
	}

	get isResolved(): boolean {
		return this.$$resolved;
	}

	@CatchError()
	public resolve(providerContainer: ProviderContainer): Provider<T> {
		if (this.$$resolved && this.isSingleton) return providerContainer.get(this.token);

		if (this.metatype) {
			const params = Reflect.getMetadata(PARAMTYPES_METADATA, this.metatype) || [];
			const injectedParams = Reflect.getMetadata(SELF_PARAMTYPES, this.metatype) || [];
			if (!params.length) {
				this.instance = new this.metatype();
			} else {
				/* Override params with injected params at the specific index. */
				injectedParams.map(
					(p: { index: number; token: string | Metatype<any> }) => (params[p.index] = p.token)
				);
				const resolvedArgs = this.resolveArgs(params, providerContainer);
				this.instance = new this.metatype(...resolvedArgs);
			}
		} else if (this.useValue) {
			this.instance = this.useValue;
		} else if (this.useFactory) {
			const resolvedArgs = this.resolveArgs(this.inject, providerContainer);
			this.instance = this.useFactory(...resolvedArgs);
		} else {
			throw new Error(`Unable to resolve the provider with token "${this.token}"`);
		}

		this.$$resolved = true;
		providerContainer.updateProvider(this);
		return this;
	}

	private resolveArgs(args: any[], providerContainer: ProviderContainer): any[] {
		return args.map((token: any) => {
			const provider = providerContainer.get(token);
			return provider.$$resolved && provider.isSingleton
				? provider.instance
				: provider.resolve(providerContainer).instance;
		});
	}
}
