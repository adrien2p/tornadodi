export interface TokenMetatypeRawProvider<T> {
    token: string;
    metatype: new (...args: any[]) => T;
}
