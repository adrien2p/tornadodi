const BarService = require('./bar.service');
const Dependencies = require('tornadodi').Dependencies;
const Injectable = require('tornadodi').Injectable;

@Injectable()
@Dependencies(BarService)
class FooService {
    constructor(bar) {
        this.bar = bar;
    }

    method() {
        return this.bar.method();
    }
}

module.exports = FooService;