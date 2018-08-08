export interface TokenUseFactory {
	token: string;
	useFactory: (...args: any[]) => any;
	inject: any[]
}
