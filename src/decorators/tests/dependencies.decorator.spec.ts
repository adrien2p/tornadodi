import 'reflect-metadata';
import { Dependencies } from "../dependencies.decorator";
import { Injectable } from "../injectable.decorator";
import { PARAMTYPES_METADATA } from "../../constants/metadata.constant";

describe("[Only fo JS purpose] Using Dependencies", () => {
    @Injectable()
    @Dependencies('token')
    class InjectableClass {
        constructor(private param: string) {}
    }

    test("should register the token or the class into PARAMTYPES_METADATA", () => {
        expect(Array.isArray(Reflect.getMetadata(PARAMTYPES_METADATA, InjectableClass))).toBe(true);
        expect(Reflect.getMetadata(PARAMTYPES_METADATA, InjectableClass).length === 1).toBe(true);
        expect(Reflect.getMetadata(PARAMTYPES_METADATA, InjectableClass)[0]).toEqual('token');
    });
});