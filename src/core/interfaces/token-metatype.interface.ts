import { Metatype } from "../types/metatype.type";

export interface TokenMetatype<T> {
	token: any;
	metatype: Metatype<T>;
}
