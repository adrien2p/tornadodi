import { BarService } from './bar.service';
import { Dependencies, Injectable } from "tornadodi";

@Injectable()
@Dependencies(BarService)
export class FooService {
    constructor(private bar: BarService) {}

    method() {
        return this.bar.method();
    }
}
