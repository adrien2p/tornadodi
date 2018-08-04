"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const metadata_constant_1 = require("../constants/metadata.constant");
exports.Dependencies = (...tokensOrTypes) => {
    return (target) => {
        const args = [];
        tokensOrTypes.map(tokenOrType => args.push(tokenOrType));
        Reflect.defineMetadata(metadata_constant_1.PARAMTYPES_METADATA, args, target);
    };
};
//# sourceMappingURL=dependencies.decorator.js.map