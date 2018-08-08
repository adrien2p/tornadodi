export interface TokenUseFactory {
	token: any;
	useFactory: (...args: any[]) => any;
	inject: any[]
}
