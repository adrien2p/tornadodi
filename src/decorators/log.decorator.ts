import { Logger } from '../core/logger';
import { LoggerZoneOptions } from '../core/interfaces/logger-zone-options.interface';

export const Log = (options: LoggerZoneOptions) => {
	return (target: any, key: string | Symbol, descriptor: PropertyDescriptor) => {
		const original = descriptor.value;
		const logger = new Logger({ className: target.constructor.name });

		descriptor.value = function(...args: any[]) {
			return logger.zone(args, () => original.apply(this, args), options);
		};

		return descriptor;
	};
};
