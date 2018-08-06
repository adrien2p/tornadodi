const Injectable = require('tornadodi').Injectable;

@Injectable()
class BarService {
    constructor() {}

    method() {
        console.log('Called method in Bar.');
    }
}

module.exports = BarService;