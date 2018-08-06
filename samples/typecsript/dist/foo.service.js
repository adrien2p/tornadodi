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
const bar_service_1 = require("./bar.service");
const tornadodi_1 = require("tornadodi");
let FooService = class FooService {
    constructor(bar) {
        this.bar = bar;
    }
    method() {
        return this.bar.method();
    }
};
FooService = __decorate([
    tornadodi_1.Injectable(),
    tornadodi_1.Dependencies(bar_service_1.BarService),
    __metadata("design:paramtypes", [bar_service_1.BarService])
], FooService);
exports.FooService = FooService;
//# sourceMappingURL=foo.service.js.map