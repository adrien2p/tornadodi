import 'reflect-metadata';
import { Injectable } from "../injectable.decorator";
import { SELF_PARAMTYPES } from "../../constants/metadata.constant";
import { Inject } from "../inject.decorator";

describe("Using Inject", () => {
    @Injectable()
    class InjectableClass {
        constructor(@Inject('token') private param: string) {}
    }

    test("should register the index and the token into SELF_PARAMTYPES", () => {
        expect(Array.isArray(Reflect.getMetadata(SELF_PARAMTYPES, InjectableClass))).toBe(true);
        expect(Reflect.getMetadata(SELF_PARAMTYPES, InjectableClass).length === 1).toBe(true);
        expect(Reflect.getMetadata(SELF_PARAMTYPES, InjectableClass)[0]).toEqual({ index: 0, tokenOrType: 'token' });
    });
});