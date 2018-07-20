export interface TokenTypeProvider<T> {
    token: string;
    type: new (...args: any[]) => T;
}
