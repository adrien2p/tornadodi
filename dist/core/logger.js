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
    catchError(callback) {
        try {
            return callback();
        }
        catch (e) {
            this.winstonLogger.error(`${e.message}\n${e.stack}`);
            throw new Error(e);
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map