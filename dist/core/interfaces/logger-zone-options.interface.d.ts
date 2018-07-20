export interface LoggerZoneOptions {
    showElapsedTime?: boolean;
    level?: 'info' | 'warning' | 'error';
    message: string | ((injectedOriginalMethodArgs?: any[]) => string);
    injectOriginalMethodArgs?: boolean;
}
