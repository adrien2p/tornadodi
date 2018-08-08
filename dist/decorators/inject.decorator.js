"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const metadata_constant_1 = require("../constants/metadata.constant");
exports.Inject = (token) => {
    return (target, key, index) => {
        const args = Reflect.getMetadata(metadata_constant_1.SELF_PARAMTYPES, target) || [];
        args.push({ index, token });
        Reflect.defineMetadata(metadata_constant_1.SELF_PARAMTYPES, args, target);
    };
};
//# sourceMappingURL=inject.decorator.js.map