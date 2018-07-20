import 'reflect-metadata';
import { Injectable } from "../injectable.decorator";
import { PARAMTYPES_METADATA } from "../../constants/metadata.constant";

describe("Using Injectable", () => {
    @Injectable()
    class InjectableClass {
        constructor(private param: string) {}
    }

    test("should be able to get constructor param types", () => {
        expect(Array.isArray(Reflect.getMetadata(PARAMTYPES_METADATA, InjectableClass))).toBe(true);
        expect(Reflect.getMetadata(PARAMTYPES_METADATA, InjectableClass).length === 1).toBe(true);
        expect(Reflect.getMetadata(PARAMTYPES_METADATA, InjectableClass)[0].name).toBe('String');
    });
});