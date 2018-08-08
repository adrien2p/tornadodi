import { Metatype } from "../types/metatype.type";
export interface TokenMetatype<T> {
    token: string;
    metatype: Metatype<T>;
}
