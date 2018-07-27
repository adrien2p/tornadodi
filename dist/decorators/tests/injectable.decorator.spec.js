"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const injectable_decorator_1 = require("../injectable.decorator");
const metadata_constant_1 = require("../../constants/metadata.constant");
describe("Using Injectable", () => {
    let InjectableClass = class InjectableClass {
        constructor(param) {
            this.param = param;
        }
    };
    InjectableClass = __decorate([
        injectable_decorator_1.Injectable(),
        __metadata("design:paramtypes", [String])
    ], InjectableClass);
    test("should be able to get constructor param types", () => {
        expect(Array.isArray(Reflect.getMetadata(metadata_constant_1.PARAMTYPES_METADATA, InjectableClass))).toBe(true);
        expect(Reflect.getMetadata(metadata_constant_1.PARAMTYPES_METADATA, InjectableClass).length === 1).toBe(true);
        expect(Reflect.getMetadata(metadata_constant_1.PARAMTYPES_METADATA, InjectableClass)[0].name).toBe('String');
    });
});
//# sourceMappingURL=injectable.decorator.spec.js.map