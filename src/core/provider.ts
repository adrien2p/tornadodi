import { ProviderOptions } from "./interfaces/provider-options.interface";

export class Provider<T> {
    public isResolved: boolean = false;
    public resolvedValue: any = null;

    private $$asSingleton: boolean;
    private $$inject: any[];
    private $$token: any;
    private $$useClass?: (new (...args: any[]) => T);
    private $$useFactory?: (...args: any[]) => any;
    private $$useValue?: any ;

    get asSingleton(): boolean { return this.$$asSingleton; }
    get inject(): any { return this.$$inject; }
    get token(): any { return this.$$token; }
    get useClass(): (new (...args: any[]) => T) { return this.$$useClass; }
    get useFactory(): any { return this.$$useFactory; }
    get useValue(): any { return this.$$useValue; }

    constructor(options: ProviderOptions<T>) {
        this.$$useValue = options.useValue;
        this.$$useClass = options.useClass || null;
        this.$$useFactory = options.useFactory || null;
        this.$$asSingleton = options.asSingleton || false;
        this.$$token = options.token;
        this.$$inject = options.inject || [];

        this.resolvedValue = options.useValue || null;
        this.isResolved = !!options.useValue;
    }
}