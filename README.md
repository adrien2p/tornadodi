<p align="center">
  <img atl="TornadoDI" src="https://raw.githubusercontent.com/adrien2p/tornadodi/master/docs/assets/tornadoDI.png"/>
</p>

# TornadoDI :tornado:

> TornadoDI provide a modern lite way to deal with dependency injection into your Typescript or javascript project

[![Build Status](https://travis-ci.org/adrien2p/tornadodi.svg?branch=master)](https://travis-ci.org/adrien2p/tornadodi)
[![Coverage Status](https://coveralls.io/repos/github/adrien2p/tornadodi/badge.svg?branch=master)](https://coveralls.io/github/adrien2p/tornadodi?branch=master)
[![GitHub license](https://img.shields.io/github/license/adrien2p/tornadodi.svg)](https://github.com/adrien2p/tornadodi/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/tornadodi.svg)](https://badge.fury.io/js/tornadodi)

<p align="center">
  <img atl="TornadoDI-graph" src="https://raw.githubusercontent.com/adrien2p/tornadodi/master/docs/assets/tornadodi-graph.png"/>
</p>

## Table of Contents 

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Features](#features)
  - [Decorators](#decorators)
    - [@Injectable()](#injectable)
    - [@Inject()](#inject)
    - [@Dependencies()](#dependencies)
  - [Registering and resolving](#registering-and-resolving)
    - [registerAsSingleton](#registerassingleton)
    - [register](#register)
    - [Resolve a class](#resolve-a-class)
  - [Clear the container](#clear-the-container)
  - [Scoped container](#scoped-container)
- [Team](#team)
- [License](#license)

## Prerequisites

If you are working on a javascript project, you have to install few `babel` plugins

```text
npm i --save-dev @babel/cli @babel/core @babel/plugin-proposal-decorators @babel/preset-env
```

and configure your `.babelrc` as the following

```text
{
  "presets": ["@babel/env"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
}
```

## Installation

To use `TornadoDI` you have to install the library first.

```text
npm i tornadodi
```

## Features
  
### Decorators

To free the power of `TornadoDI` some decorators are provided in order to rich the purpose of the dependency injection.

#### @Injectable()

The `@Injectable()` decorator is the more important one, it is through this decorator than `TornadoDI` will
be able to know about what as to be injected in the class to resolve.

```typescript
// Typescript
import { Injectable } from 'tornadodi';

@Injectable()
export class Foo { } 
```
```javascript
// Javascript
const Injectable = require('tornadodi').Injectable;

@Injectable()
class Foo { }

module.exports = Foo;
```

#### @Inject()

The `@Inject()` decorator will allow you to specify a token or a class to be inject for a specific constructor decorator.
To specify a token during the registration, refer you to the following section [Register a class](#register-a-class)

```typescript
// Typescript
import { Injectable, Inject } from 'tornadodi';

@Injectable()
export class Foo { 
    constructor(
        private bar: Bar, 
        @Inject(Symbol('InjectByCustomToken')) private soo: Soo,
        @Inject('InjectByCustomToken2') private fii: Fii) { }
} 
```

###### Take as parameter

Only one parameter.

| Parameter type | Example |
|:---:|:---:|
| `any` | `Symbol('fooToken') Or 'fooToken' or a class etc.` |

#### @Dependencies()

In javascript you will not be able to emit `design:paramtypes` metadata from a class. In order to be able to specify the injection
you can use the `@Dependencies()` decorator which will be able to populate this specific metadata and allow `TornadoDI`
to deal with the injection.

```javascript
// Javascript
const Injectable = require('tornadodi').Injectable;
const Dependencies = require('tornadodi').Dependencies;

@Injectable()
@Dependencies('barToken')
export class Foo { 
    constructor(bar)
} 

module.exports = Foo;
```

###### Take as parameter

Any number of parameter.

| Parameter type | Example |
|:---:|:---:|
| `any` | `Symbol('fooToken') Or 'fooToken' or a class etc.` |

### Registering and resolving

During the time you are using `TornadoDI` you will be able to register any classes at any time and resolve them
when you want. The resolution is made only when it is asked for and never during the registration for performance
purpose.

#### Register a class

After that you have created your class and used the appropriate decorator (see below), you will be able to register all of them.
Registering a class does not mean that she's resolved as the same time (We will see how the resolution work in the [Resolve dependencies](#resolve-dependencies) section).

To register a new class or multiple classes you have two possibilities.

##### registerAsSingleton

The `registerAsSingleton` method will provide you a way to explicitly register a class that can be instantiated only once in the 
whole container. The singleton will be used as well to instantiate other classes with always the same instance if they inject this singleton.

To use this methods see the following example.

```typescript
// Typescript
import Bar from './bar.service';
import Foo from './foo.service';
import { Tornado } from 'tornadodi';

const bootstrap = () => {
    // Register a class
    Tornado.registerAsSingleton<Foo>(Foo);
    // Register multiple class
    Tornado.registerAsSingleton([Foo, Bar]);
    // Register multiple class and use custom token with metatype
    Tornado.registerAsSingleton([Foo, { token: Bar, metatype: Bar}]);
    // Register multiple class and use custom token with static value through useValue
    Tornado.registerAsSingleton([Foo, { token: Symbol('t2'), useValue: 42 }]);
    // Register multiple class and use custom token with factory
    Tornado.registerAsSingleton([Foo, { token: 't3', useFactory: (foo) => foo.method(), inject: [Foo] }]);
};
bootstrap();
```
```javascript

// Javascript
const Bar = require('./bar.service');
const Foo = require('./foo.service');
const Tornado = require('tornadodi').Tornado;

const bootstrap = () => {
    // Register a class
    Tornado.registerAsSingleton(Foo);
    // Register multiple class
    Tornado.registerAsSingleton([Foo, Bar]);
    // Register multiple class and use custom token with metatype
    Tornado.registerAsSingleton([Foo, { token: Bar, metatype: Bar}]);
    // Register multiple class and use custom token with static value through useValue
    Tornado.registerAsSingleton([Foo, { token: Symbol('t2'), useValue: 42 }]);
    // Register multiple class and use custom token with factory
    Tornado.registerAsSingleton([Foo, { token: 't3', useFactory: (foo) => foo.method(), inject: [Foo] }]);
};
bootstrap();
```

###### Take as parameter

Only one parameter.

| Parameter type | Example |
|:---:|:---:|
| `{ token: any; metatype: Metatype<T> }` | `{ token: Foo, metatype: Foo }` |
| `{ token: any; useValue: any }` | `{ token: Symbol('MyToken'), useValue: 42 }` |
| `{ token: any; useFactory: (...args: any[]) => any, inject?: any[] }` | `{ token: 'MyToken', useFactory: () => 'value' }` |
| `Metatype<T>` | `Foo` |
| `Array</* Previous types */>` | `[{ token: Foo, metatype: Foo }, Bar]` |

##### register 

Otherwise, the `register` method will provide you the possibility to register a class as a non singleton one. In order words,
each time you will ask to resolve it, you will get a new instance of it and, each time the class is injected, a new instance
will be used.

To use this methods see the following example.

```typescript
// Typescript
import Bar from './bar.service';
import Foo from './foo.service';
import { Tornado } from 'tornadodi';

const bootstrap = () => {
    // Register a class
    Tornado.register<Foo>(Foo);
    // Register multiple class
    Tornado.register([Foo, Bar]);
    // Register multiple class and use custom token with metatype
    Tornado.register([Foo, { token: Bar, metatype: Bar}]);
    // Register multiple class and use custom token with static value through useValue
    Tornado.register([Foo, { token: Symbol('t2'), useValue: 42 }]);
    // Register multiple class and use custom token with factory
    Tornado.register([Foo, { token: 't3', useFactory: (foo) => foo.method(), inject: [Foo] }]);
};
bootstrap();
```
```javascript
// Javascript
const Bar = require('./bar.service');
const Foo = require('./foo.service');
const Tornado = require('tornadodi').Tornado;

const bootstrap = () => {
    // Register a class
    Tornado.register(Foo);
    // Register multiple class
    Tornado.register([Foo, Bar]);
    // Register multiple class and use custom token with metatype
    Tornado.register([Foo, { token: Bar, metatype: Bar}]);
    // Register multiple class and use custom token with static value through useValue
    Tornado.register([Foo, { token: Symbol('t2'), useValue: 42 }]);
    // Register multiple class and use custom token with factory
    Tornado.register([Foo, { token: 't3', useFactory: (foo) => foo.method(), inject: [Foo] }]);
};
bootstrap();
```

###### Take as parameter

Only one parameter.

| Parameter type | Example |
|:---:|:---:|
| `{ token: any; metatype: Metatype<T> }` | `{ token: Foo, metatype: Foo }` |
| `{ token: any; useValue: any }` | `{ token: Symbol('MyToken'), useValue: 42 }` |
| `{ token: any; useFactory: (...args: any[]) => any, inject?: any[] }` | `{ token: 'MyToken', useFactory: () => 'value' }` |
| `Metatype<T>` | `Foo` |
| `Array</* Previous types */>` | `[{ token: Foo, metatype: Foo }, Bar]` |

#### Resolve a class

After have been registering the different classes, you will be able to resolve them. The resolution of any classes is made
when you call the `resolve` method. That means than the dependency resolution is lazy and apply when it requested.

The resolution will resolve the class and it's dependencies, if they are register as singleton the next resolve will return the 
same instance as the previous one. See the following example.

```typescript
// Typescript
import Bar from './bar.service';
import Foo from './foo.service';
import { Tornado } from 'tornadodi';

const bootstrap = () => {
    Tornado.register([Foo, Bar]);
    // Resolve dependency by giving a class to resolve
    const foo = Tornado.resolve<Foo>(Foo);
    // Resolve dependency by giving a Symbol to resolve
    const bar = Tornado.resolve<Bar>(Symbol('barToken'));
    // Resolve dependency by giving a string to resolve
    const anotherBar = Tornado.resolve<Bar>('barToken');
};
bootstrap();
```
```javascript
// Javascript
const Bar = require('./bar.service');
const Foo = require('./foo.service');
const Tornado = require('tornadodi').Tornado;

const bootstrap = () => {
    Tornado.register([Foo, Bar]);
    // Resolve dependency by giving a class to resolve
    const foo = Tornado.resolve(Foo);
    // Resolve dependency by giving a class to resolve
    const bar = Tornado.resolve(Symbol('barToken'));
    // Resolve dependency by giving a string to resolve
    const anotherBar = Tornado.resolve<Bar>('barToken');
};
bootstrap();
```

###### Take as parameter

Only one parameter.

| Parameter type | Example |
|:---:|:---:|
| `any` | `Symbol('fooToken') Or 'fooToken' or a class etc.` |

### Clear the container

`TornadoDI` as it's own container, which is not accessible to the user natively. If you want at any time
clear all the dependencies registered into the container, you can call the `clear` method as the following example.

```typescript
// Typescript
import Bar from './bar.service';
import Foo from './foo.service';
import { Tornado } from 'tornadodi';

const bootstrap = () => {
    Tornado.register([{ token: 'foo', metatype: Foo }, Bar]);
    const foo = Tornado.resolve<Foo>('foo');
    const bar = Tornado.resolve<Bar>(Bar);
    console.log(Tornado.getContainerSize()); // result: 2;
    
    // Reset container
    Tornado.clear();
    console.log(Tornado.getContainerSize()); // result: 0;
};
bootstrap();
```
```javascript
// Javascript
const Bar = require('./bar.service');
const Foo = require('./foo.service');
const Tornado = require('tornadodi').Tornado

const bootstrap = () => {
    Tornado.register([{ token: 'foo', metatype: Foo }, Bar]);
    const foo = Tornado.resolve('foo');
    const bar = Tornado.resolve(Bar);
    console.log(Tornado.getContainerSize()); // result: 2;
    
    // Reset container
    Tornado.clear();
    console.log(Tornado.getContainerSize()); // result: 0;
};
bootstrap();
```

### Scoped container

In `TornadoDI` you are able to switch container at any time to work with.
in every features that we have seen previously in [Features](#registering-and-resolving) from `registering and resolving` section.
You are able to specify as a second argument, the `scope` that you want to target. It will switch automatically on this
scoped container to process the action. If there is no specified scope, the default container will be used.
See the following example.

```typescript
// Typescript
Tornado.registerAsSingleton([{ token: Foo, metatype: Foo }, Bar], 'scoped');
Tornado.register([{ token: Foo, metatype: Foo }, Bar], 'scoped');
Tornado.resolve<Bar>(Bar, 'scoped')
```
```javascript
// Javascript
Tornado.registerAsSingleton([{ token: Foo, metatype: Foo }, Bar], 'scoped');
Tornado.register([{ token: Foo, metatype: Foo }, Bar], 'scoped');
Tornado.resolve(Bar, 'scoped')
```

## Team
- Adrien de Peretti

## License
This project is licensed under the MIT License - see the LICENSE.md file for details