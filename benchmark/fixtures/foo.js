const Bar = require('bar');
const Injectable = require('../../dist').Injectable;
const Dependencies = require('../../dist').Dependencies;

@Injectable()
@Dependencies(Bar)
class Foo {
    constructor(bar) {
        this.bar = bar;
    }

    method(msg) {
        this.bar.method(msg);
    }
}