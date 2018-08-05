import { Logger } from '../core/logger';

export const CatchError = () => {
	return (target: any, key: string | Symbol, descriptor: PropertyDescriptor) => {
		const original = descriptor.value;
		const logger = new Logger({ className: target.constructor.name });

		descriptor.value = function(...args: any[]) {
			return logger.catchError(() => original.apply(this, args));
		};

		return descriptor;
	};
};
