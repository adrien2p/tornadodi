import 'reflect-metadata';
import { PARAMTYPES_METADATA } from '../constants/metadata.constant';

export const Dependencies = (
	...tokensOrTypes: (string | (new (...args: any[]) => any))[]
): ClassDecorator => {
	return (target: Object) => {
		const args: any[] = [];
		tokensOrTypes.map(tokenOrType => args.push(tokenOrType));
		Reflect.defineMetadata(PARAMTYPES_METADATA, args, target);
	};
};
