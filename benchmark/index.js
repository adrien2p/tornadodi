const Benchmark = require('benchmark');
const Tornado = require('../dist').Tornado;

const suite = new Benchmark.Suite;
suite.add('Tornadodi#register', function () {
    Tornado.register([Foo, Bar]);
}).on('cycle', function(event) {
    console.log(String(event.target));
}).on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
}).run();