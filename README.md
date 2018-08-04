<p align="center">
  <img atl="tornadojs" src="./docs/assets/logo-text-medium.png"/>
</p>

# TornadoJS

> TornadoJS provide a modern lite way to deal with dependency injection into your Typescript or javascript project

[![Build Status](https://travis-ci.org/adrien2p/tornadojs.svg?branch=master)](https://travis-ci.org/adrien2p/tornadojs)
[![Coverage Status](https://coveralls.io/repos/github/adrien2p/tornadojs/badge.svg?branch=master)](https://coveralls.io/github/adrien2p/tornadojs?branch=master)
[![GitHub license](https://img.shields.io/github/license/adrien2p/tornadojs.svg)](https://github.com/adrien2p/tornadojs/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/adrien2p/tornadojs.svg)](https://GitHub.com/adrien2p/tornadojs/releases/)

## Table of Contents 

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Features](#features)
  - [Decorators](#decorators)
    - [@Injectable()](#@injectable())
    - [@Inject()](#@inject())
    - [@Dependencies()](#@dependencies())
  - [Registering and resolving](#registering-and-resolving)
    - [registerAsSingleton](#registerAsSingleton)
    - [register](#register)
  - [Resolve a class](#resolve-a-class)
  - [Clear the container](#clear-the-container)
- [Team](#team)
- [License](#license)

## Prerequisites

In order to be able to use `TornadoJS` into your project, you will have to install two libraries.

```text
npm i reflect-metadata @types/reflect-metadata
```

If you are working on a javascript project, you have to install few `babel` plugins

```text
npm i --save-dev @babel/cli @babel/core @babel/plugin-proposal-decorators @babel/preset-env
```

and configure your `.babelrs` as the following

```text
{
  "presets": ["@babel/env"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
}
```

## Installation

To use `TornadoJS` you have to install the library first.

```text
npm i tornadojs
```

## Features
  
### Decorators

To free the power of `TornadoJS` some decorators are provided in order to rich the purpose of the dependency injection.

#### @Injectable()

The `@Injectable()` decorator is the more important one, it is through this decorator than `TornadoJS` will
be able to know about what as to be injected in the class to resolve.

```typescript
import { Injectable } from 'tornadojs';

@Injetable()
export class Foo { } 
```
```javascript
const Injectable = require('tornadojs').Injectable;

@Injetable()
class Foo { }

module.exports = Foo;
```

#### @Inject()

The `@Inject()` decorator will allow you to specify a token or a class to be inject for a specific constructor decorator.
To specify a token during the registration, refer you to the following section [Register a class](#register-a-class)

```typescript
import { Injectable, Inject } from 'tornadojs';

@Injetable()
export class Foo { 
    constructor(@Inject('barToken') private bar: Bar)
} 
```
```javascript
const Injectable = require('tornadojs').Injectable;
const Dependencies = require('tornadojs').Dependencies;

@Injetable()
@Dependencies('barToken')
export class Foo { 
    constructor(bar)
} 

module.exports = Foo;
```

> Take as parameter a `string` corresponding to a token or `(new (...args: any[]) => any)` corresponding to a class

#### @Dependencies()

In javascript you will not be able to emit `design:paramtypes` metadata from a class. In order to be able to specify the injection
you can use the `@Dependencies()` decorator which will be able to populate this specific metadata and allow `TornadoJS`
to deal with the injection.

```javascript
const Injectable = require('tornadojs').Injectable;
const Dependencies = require('tornadojs').Dependencies;

@Injetable()
@Dependencies('barToken')
export class Foo { 
    constructor(bar)
} 

module.exports = Foo;
```

> Take as parameter a `string` corresponding to a token or `(new (...args: any[]) => any)` corresponding to a class

### Registering and resolving

During the time you are using `TornadoJS` you will be able to register any class at any time and resolve them
when you want. The resolution is made only when it is asked for and never during the registration for performance
purpose.

#### Register a class

After that you have created your class and used the appropriate decorator (see below), you will be able to register all of them.
Registering a class does not mean that she's resolved as the same time (We will see how the resolution work in the [Resolve dependencies](#resolve-dependencies) section).

To register a new class or multiple class you have two possibilities.

##### registerAsSingleton

The `registerAsSingleton` method will provide you a way to explicitly register a class that can be instantiated only once in the 
whole container. The singleton will be used as well to instantiate other class with always the same instance if they inject this singleton.

To use this methods see the following example.

```typescript
// Typescript
import Bar from './bar.service';
import Foo from './foo.service';
import { tornado } from 'tornadojs';

const bootstrap = () => {
    // Registering the two class.
    tornado.registerAsSingleton([Foo, Bar]);
};
bootstrap();
```
```javascript

// Javascript
const Bar = require('./bar.service');
const Foo = require('./foo.service');
const tornado = require('tornadojs').tornado;

const bootstrap = () => {
    // Registering the two class.
    tornado.registerAsSingleton([Foo, Bar]);
};
bootstrap();
```

> Take as parameter an `object` as `{ token: 'MyToken', type: Foo }` or `(new (...args: any[]) => any)` corresponding to a class or
a mixed array of the previous specified types

##### register 

Otherwise, the `register` method will provide you the possibility to register a class as a non singleton one. In order words,
each time you will ask to resolve it, you will get a new instance of it and, each time the class is injected, a new instance
will be used.

To use this methods see the following example.

```typescript
// Typescript
import Bar from './bar.service';
import Foo from './foo.service';
import { tornado } from 'tornadojs';

const bootstrap = () => {
    // Registering the two class.
    tornado.register([Foo, Bar]);
};
bootstrap();
```
```javascript
// Javascript
const Bar = require('./bar.service');
const Foo = require('./foo.service');
const tornado = require('tornadojs').tornado;

const bootstrap = () => {
    // Registering the two class.
    tornado.register([Foo, Bar]);
};
bootstrap();
```

> Take as parameter an `object` as `{ token: 'MyToken', type: Foo }` or `(new (...args: any[]) => any)` corresponding to a class or
a mixed array of the previous specified types

#### Resolve a class

After have been registering the different class, you will be able to resolve them. The resolution of any class is made
when you call the `resolve` method. That means than the dependency resolution is lazy and apply when it requested.

The resolution will resolve the class and it's dependencies, if they are register as singleton the next resolve will return the 
same instance as the previous one. See the following example.

```typescript
// Typescript
import Bar from './bar.service';
import Foo from './foo.service';
import { tornado } from 'tornadojs';

const bootstrap = () => {
    tornado.register([Foo, Bar]);
    // Resolving a dependency.
    const foo = tornado.resolve<Foo>(Foo);
    const bar = tornado.resolve<Bar>(Bar);
};
bootstrap();
```
```javascript
// Javascript
const Bar = require('./bar.service');
const Foo = require('./foo.service');
const tornado = require('tornadojs').tornado;

const bootstrap = () => {
    tornado.register([Foo, Bar]);
    // Resolving a dependency.
    const foo = tornado.resolve(Foo);
    const bar = tornado.resolve(Bar);
};
bootstrap();
```

> Take as parameter an `string` as `MyToken` or `(new (...args: any[]) => any)` corresponding to a class

```typescript
// Typescript
import Bar from './bar.service';
import Foo from './foo.service';
import { tornado } from 'tornadojs';

const bootstrap = () => {
    tornado.register([{ token: 'foo', type: Foo }, Bar]);
    // Resolving a dependency.
    const foo = tornado.resolve<Foo>('foo');
    const bar = tornado.resolve<Bar>(Bar);
};
bootstrap();
```
```javascript
// Javascript
const Bar = require('./bar.service');
const Foo = require('./foo.service');
const tornado = require('tornadojs').tornado;

const bootstrap = () => {
    tornado.register([{ token: 'foo', type: Foo }, Bar]);
    // Resolving a dependency.
    const foo = tornado.resolve('foo');
    const bar = tornado.resolve(Bar);
};
bootstrap();
```

### Clear the container

`TornadoJS` as it's own container, which is not accessible to the user natively. If you want at any time
clear all the dependencies registered into the container, you can call the `clear` method as the following example.

```typescript
// Typescript
import Bar from './bar.service';
import Foo from './foo.service';
import { tornado } from 'tornadojs';

const bootstrap = () => {
    tornado.register([{ token: 'foo', type: Foo }, Bar]);
    const foo = tornado.resolve<Foo>('foo');
    const bar = tornado.resolve<Bar>(Bar);
    console.log(tornado.getContainerSize()); // result: 2;
    
    // Reset container
    tornado.clear();
    console.log(tornado.getContainerSize()); // result: 0;
};
bootstrap();
```
```javascript
// Javascript
const Bar = require('./bar.service');
const Foo = require('./foo.service');
const tornado = require('tornadojs').tornado;

const bootstrap = () => {
    tornado.register([{ token: 'foo', type: Foo }, Bar]);
    const foo = tornado.resolve('foo');
    const bar = tornado.resolve(Bar);
    console.log(tornado.getContainerSize()); // result: 2;
    
    // Reset container
    tornado.clear();
    console.log(tornado.getContainerSize()); // result: 0;
};
bootstrap();
```

## Team
- Adrien de Peretti

## License
This project is licensed under the MIT License - see the LICENSE.md file for details