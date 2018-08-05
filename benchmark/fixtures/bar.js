const Injectable = require('../../dist').Injectable;

@Injectable()
class Bar {
    method(msg) {
        console.log(msg);
    }
}