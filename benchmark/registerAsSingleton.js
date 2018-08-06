const BarService = require('../samples/javascript/dist/bar.service');
const Benchmark = require('benchmark');
const FooService = require('../samples/javascript/dist/foo.service');
const Tornado = require('../dist').Tornado;

const suite = new Benchmark.Suite;
suite.add('TornadoDI#registerAsSingleton', function () {
    Tornado.registerAsSingleton([FooService, BarService]);
}).on('cycle', function (event) {
    console.log(String(event.target));
}).on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
}).run();
