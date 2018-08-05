export declare class Logger {
    private $$context;
    private winstonLogger;
    constructor($$context: {
        className: string;
    });
    catchError(callback: () => any): any;
}
