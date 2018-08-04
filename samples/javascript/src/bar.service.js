const Injectable = require('tornadojs').Injectable;

@Injectable()
class BarService {
    constructor() {}

    method() {
        console.log('Called method in Bar.');
    }
}

module.exports = BarService;