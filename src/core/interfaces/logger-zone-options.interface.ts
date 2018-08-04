export interface LoggerZoneOptions {
	showElapsedTime?: boolean;
	message: string | ((injectedOriginalMethodArgs?: any[]) => string);
	injectOriginalMethodArgs?: boolean;
}
