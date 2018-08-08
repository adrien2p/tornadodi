import 'reflect-metadata';
import { Metatype } from '../core/types/metatype.type';
import { PARAMTYPES_METADATA } from '../constants/metadata.constant';

export const Dependencies = (...tokens: any[]): ClassDecorator => {
	return (target: Object) => {
		const args: any[] = [];
        tokens.map(token => args.push(token));
		Reflect.defineMetadata(PARAMTYPES_METADATA, args, target);
	};
};
