const BarService = require('./bar.service');
const Dependencies = require('tornadojs').Dependencies;
const Injectable = require('tornadojs').Injectable;

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