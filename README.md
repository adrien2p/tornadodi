<p align="center">
  <img atl="TornadoDI" src="https://raw.githubusercontent.com/adrien2p/tornadodi/master/docs/assets/tornadoDI.png"/>
</p>

# TornadoDI :tornado:

> TornadoDI provide a modern lite way to work with dependency injection into your Typescript or javascript project with or without 
framework

[![Build Status](https://travis-ci.org/adrien2p/tornadodi.svg?branch=master)](https://travis-ci.org/adrien2p/tornadodi)
[![Coverage Status](https://coveralls.io/repos/github/adrien2p/tornadodi/badge.svg?branch=master)](https://coveralls.io/github/adrien2p/tornadodi?branch=master)
[![GitHub license](https://img.shields.io/github/license/adrien2p/tornadodi.svg)](https://github.com/adrien2p/tornadodi/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/tornadodi.svg)](https://badge.fury.io/js/tornadodi)

## Table of Contents 

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API](#api)
  - [ContainerManager](#containermanager)
    - [Create](#create)
    - [Get](#get)
    - [set](#set)
  - [Container](#container)
    - [registerAsClass](#registerAsClass)
    - [registerAsValue](#registerAsValue)
    - [registerAsFactory](#registerAsFactory)
    - [Build](#build)
    - [Get](#get)
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

## API

There is 2 main object into `TornadoDI` which are the `ContainerManager` and the `Container`.

### ContainerManager

The `ContainerManager` is there to keep a reference on all the container and allow you to manage them as you want.
The `ContainerManager` contains a default container which can be use and is accessible by `ContainerManager.get()`.

#### create

This method will allow you to create a new container identifiable by the token passed in parameter
and will return the new container as result.

```typescript
const myNewContainer = ContainerManager.create(Symbol('myToken'));
```

#### get

This method allow you to get the container by giving is token. If no token have been provided, the default container
will be return as result.

```typescript
const myNewContainer = ContainerManager.get(Symbol('myToken'));
const myDefaultContainer = ContainerManager.get();
```

#### set

This method will allow you to bind a container create outside the container manager to the container manager
and then keep a reference on it.

```typescript
const newContainer = new Container('newContainer');
ContainerManager.set(newContainer);
```


### Container

The ability to create a container for a specific context or separate them as scope is allowed by the access
to the `Container` object. That mean's that you are not dependent on the `ContainerManager` if that what you need.

#### registerAsClass

This method allow you to register a new class into the container which will be resolved during the build process.
To register this class, you are able to give the class, a token and a property that let you scoped this provider as a singleton
or not. The result will be the container itself to be able to chain the registering.

```typescript
myContainer.registerAsClass({ useClass: UserController, token: symbol('userController'), asSingleton: true });
```

#### registerAsFactory

This method allow you to register a new factory into the container which will be resolved during the build process.
To register this factory, you are able to give the factory, a token and a property that let you scoped this provider as a singleton
or not. The result will be the container itself to be able to chain the registering.

If the factory need to use some dependencies, you can pass them through the inject property by giving an array of tokens.

```typescript
myContainer.registerAsFactory({ 
    useFactory: async (userService) => {
        const users = await userService.getAll();
        return users;
    }, 
    inject: [symbol('users')], 
    token: symbol('myFactory'), 
    asSingleton: true 
});
```

#### registerAsValue

This method allow you to register a new static value into the container which will be resolved during the build process.
To register this static value, you are able to give the value, a token and a property that let you scoped this provider as a singleton
or not. The result will be the container itself to be able to chain the registering.

```typescript
myContainer.registerAsValue({ useValue: 42, token: symbol('myValue') });
```

#### build

When all the providers have been registered, you can build the container to resolve all the dependencies.
You have the possibility to pass a parameter that allow you to force the build process, that can be usefull
if the build has already been applied or if you add some providers after have been builded the container.
The result will be the container itself.

```typescript
await myContainer.build();
```

#### get

This method allow you to get the resolved value of a specific provider by giving is token. You are
able to strong types the result by giving the type as template `get<Type>(...)`.

```typescript
const resolvedValue = myContainer.get<UserController>('userController');
```

## Team
- Adrien de Peretti

## License
This project is licensed under the MIT License - see the LICENSE.md file for details