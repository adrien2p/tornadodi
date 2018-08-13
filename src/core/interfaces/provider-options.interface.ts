export interface ProviderOptions<T> {
    useValue?: T;
    useClass?: (new (...args: any[]) => T);
    useFactory?: (...args: any[]) => T;
    asSingleton: boolean;
    token: any;
    inject?: any[];
}