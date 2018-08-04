import { Injectable } from "tornadodi";

@Injectable()
export class BarService {
    constructor() {}

    method() {
        console.log('Called method in Bar.');
    }
}
