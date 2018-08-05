"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../core/logger");
exports.CatchError = () => {
    return (target, key, descriptor) => {
        const original = descriptor.value;
        const logger = new logger_1.Logger({ className: target.constructor.name });
        descriptor.value = function (...args) {
            return logger.catchError(() => original.apply(this, args));
        };
        return descriptor;
    };
};
//# sourceMappingURL=catch-error.decorator.js.map