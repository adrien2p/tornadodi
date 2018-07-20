"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../core/logger");
exports.Log = (options) => {
    return (target, key, descriptor) => {
        const original = descriptor.value;
        const logger = new logger_1.Logger({ className: target.constructor.name });
        descriptor.value = function (...args) {
            return logger.zone(args, () => original.apply(this, args), options);
        };
        return descriptor;
    };
};
//# sourceMappingURL=log.decorator.js.map