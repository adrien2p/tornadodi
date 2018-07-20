import * as winston from 'winston';
import { LoggerZoneOptions } from './interfaces/logger-zone-options.interface';

export class Logger {
	private winstonLogger: winston.Logger;

	constructor(private $$context: { className: string }) {
		this.winstonLogger = winston.createLogger({
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.colorize({ all: true }),
						winston.format.timestamp(),
						winston.format.align(),
						winston.format.printf(info => {
							return `${info.timestamp} [${this.$$context.className}] ${info.level} ${
								info.message
							}`;
						}),
					),
				}),
			],
		});
	}

	zone(originalMethodArgs: any[], callback: () => any, options: LoggerZoneOptions): any {
		options = {
			level: 'info',
			showElapsedTime: true,
			injectOriginalMethodArgs: false,
			...options,
		};

		let startAt: Date = new Date();
		const callbackResult = callback();

		if (!options.showElapsedTime) return '';
		const formattedElapsedTime = this.getFormattedElapsedTime(startAt, new Date());

		let message = options.message;
		message =
			typeof message === 'function'
				? message(options.injectOriginalMethodArgs ? originalMethodArgs : null)
				: message;
		message += formattedElapsedTime;

		if (options.level === 'info') {
			this.winstonLogger.info(message);
		} else if (options.level === 'error') {
			this.winstonLogger.error(message);
		} else if (options.level === 'warning') {
			this.winstonLogger.warning(message);
		}

		return callbackResult;
	}

	private getFormattedElapsedTime(start: Date, end: Date): string {
		return ` +${Math.abs(end.getTime() - start.getTime())}ms`;
	}
}
