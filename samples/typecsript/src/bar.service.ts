import { Injectable } from "tornadojs";

@Injectable()
export class BarService {
    constructor() {}

    method() {
        console.log('Called method in Bar.');
    }
}
