import { LoggerZoneOptions } from '../core/interfaces/logger-zone-options.interface';
export declare const Log: (options: LoggerZoneOptions) => (target: any, key: string | Symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;
