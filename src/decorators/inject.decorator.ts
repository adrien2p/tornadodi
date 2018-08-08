import 'reflect-metadata';
import { Metatype } from '../core/types/metatype.type';
import { SELF_PARAMTYPES } from '../constants/metadata.constant';

export const Inject = (token: any): ParameterDecorator => {
	return (target: Object, key: string | symbol, index: number) => {
		const args = Reflect.getMetadata(SELF_PARAMTYPES, target) || [];
		args.push({ index, token });
		Reflect.defineMetadata(SELF_PARAMTYPES, args, target);
	};
};
