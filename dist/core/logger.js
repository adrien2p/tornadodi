"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston = __importStar(require("winston"));
class Logger {
    constructor($$context) {
        this.$$context = $$context;
        this.winstonLogger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.colorize({ all: true }), winston.format.timestamp(), winston.format.align(), winston.format.printf(info => {
                        return `${info.timestamp} [${this.$$context.className}] ${info.level} ${info.message}`;
                    })),
                }),
            ],
        });
    }
    zone(originalMethodArgs, callback, options) {
        options = Object.assign({ level: 'info', showElapsedTime: true, injectOriginalMethodArgs: false }, options);
        let startAt = new Date();
        const callbackResult = callback();
        if (!options.showElapsedTime)
            return '';
        const formattedElapsedTime = this.getFormattedElapsedTime(startAt, new Date());
        let message = options.message;
        message =
            typeof message === 'function'
                ? message(options.injectOriginalMethodArgs ? originalMethodArgs : null)
                : message;
        message += formattedElapsedTime;
        if (options.level === 'info') {
            this.winstonLogger.info(message);
        }
        else if (options.level === 'error') {
            this.winstonLogger.error(message);
        }
        else if (options.level === 'warning') {
            this.winstonLogger.warning(message);
        }
        return callbackResult;
    }
    getFormattedElapsedTime(start, end) {
        return ` +${Math.abs(end.getTime() - start.getTime())}ms`;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map