import 'reflect-metadata';
import { SELF_PARAMTYPES } from '../constants/metadata.constant';

export const Inject = (
	tokenOrMetatype: string | (new (...args: any[]) => any)
): ParameterDecorator => {
	return (target: Object, key: string | symbol, index: number) => {
		const args = Reflect.getMetadata(SELF_PARAMTYPES, target) || [];
		args.push({ index, token: (<any>tokenOrMetatype).name || tokenOrMetatype });
		Reflect.defineMetadata(SELF_PARAMTYPES, args, target);
	};
};
