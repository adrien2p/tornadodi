import 'reflect-metadata';
import { Metatype } from '../core/types/metatype.type';
import { PARAMTYPES_METADATA } from '../constants/metadata.constant';

export const Dependencies = (...tokensOrTypes: (string | Metatype<any>)[]): ClassDecorator => {
	return (target: Object) => {
		const args: any[] = [];
		tokensOrTypes.map(tokenOrType => args.push(tokenOrType));
		Reflect.defineMetadata(PARAMTYPES_METADATA, args, target);
	};
};
