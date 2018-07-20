import { LoggerZoneOptions } from './interfaces/logger-zone-options.interface';
export declare class Logger {
    private $$context;
    private winstonLogger;
    constructor($$context: {
        className: string;
    });
    zone(originalMethodArgs: any[], callback: () => any, options: LoggerZoneOptions): any;
    private getFormattedElapsedTime;
}
