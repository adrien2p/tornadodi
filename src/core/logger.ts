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
						})
					),
				}),
			],
		});
	}

	catchError(callback: () => any): any {
		try {
			return callback();
		} catch (e) {
			this.winstonLogger.error(`${e.message}\n${e.stack}`);
			throw new Error(e);
		}
	}
}
