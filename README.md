# ICE

<a href="https://www.npmjs.com/package/@ice-age/ice"><img alt="NPM Status" src="https://img.shields.io/npm/v/@ice-age/ice.svg?style=flat"></a>

ENGLISH | [简体中文](./README-zhCN.md)

## INTRODUCTION

### BASE

This is a package to help developers to run a react project.It is an encapsulation of webpack, so you can do anything that webpack can do by rewriting `ice.config.js`

`ATTENTION`: However, there are lots of things to be improved, so you'd better not to apply this package to production. You can use this package just for fun. Of course, welcome to try this package, and give some tips to me for improving!

### WHY DO I WRITE THIS PACKAGE?

It is useful when you are going to create a demo project.I do not want to create `webpack.config.js` and install dependencies again and again. So, I just write this package to encapsulate some base packages to `ice`, just used for building project.

## HOW TO START

1. You can install `ice` globally or locally

   Maybe there are some problems in global installing, you could try install locally

   ```shell
   yarn global add @ice-age/ice or yarn add @ice-age/ice -D
   ```

2. ensure your directory structure, here is a base structure to make sure you can run by `ice`.

   ```shell
   $ tree .
   .
   ├── ice.config.js
   ├── package.json
   ├── public
   │   └── index.html
   ├── src
   │   └── index.tsx
   └── yarn.lock
   ```

   Of Course, you can rewrite `ice.config.js` to customize to fit your project.(You may receive a mistake if you forget `ice.config.js` in current version)

3. Now you can run with `ice dev` or `yarn ice dev` to run your application

4. Here are some files for example:

   ```html
   <!-- publis/index.html -->
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <meta http-equiv="X-UA-Compatible" content="ie=edge" />
       <title><%= htmlWebpackPlugin.options.title %></title>
       <script src="<%= htmlWebpackPlugin.options.configPath %>"></script>
     </head>
     <body>
       <div id="root"></div>
     </body>
   </html>
   ```

   ```javascript
   // ice.config.js
   /* eslint-disable @typescript-eslint/no-var-requires */
   /*eslint-env node*/
   const path = require('path')
   const { merge } = require('webpack-merge')
   
   module.exports = (config) => {
     console.log(config)
     const _config = {
       entry: path.resolve(__dirname, './src/app.tsx'),
       output: {
         path: path.resolve(__dirname, 'dist'),
         filename: 'bundle.[chunkhash:8].js',
       },
     }
   
     return merge(config, _config)
   }
   ```

## SCRIPTS

Here are some scripts that has been integrated to `ice`. You can use the following scripts when you have installed `ice`. Here are some scripts listed briefly(Of course, you can run script `ice --help` to get detailed information.):

### ice init

You can download template project by running this script which is integrated with ice tools. More reference: [https://github.com/zhangzhengsmiling/react-template](https://github.com/zhangzhengsmiling/react-template)

### ice dev

Start project just like `create-react-app`.It will start webpack dev server.It equals to running script ` webpack serve`. You can also run `tsc --watch` to start type checking.

### ice build

A script to build you project. You can write your own config files in `ice.config.js` to customize your own process of building.

### ice lint <directory> [options]

Lint script, it can be used just like `eslint`, and it encapsulates some eslint config.

You can run eslint by script, `ice lint src --ext .tsx,.ts`.Besides you can get more details by running `ice lint --help`.

### ice ci [options]

`ci` script provides toolkit for front end engineering. 

#### SUPPORT LIST:

- --husky

- --commitizen

- --commitlint

- --standard-version

Here are some options you can pass to the command (also you can get more information by `ice ci -h`):

#### 1. ice ci --husky

- First, it will chekout whether there is 'husky' fileld in your package.json.If so, it will skip whithout installing dependencies or writing 'commit-msg'
- If you have nerver installed `husky`, it will install `husky@4.3.6` by yarn.
- Then, it will writing `commit-msg` hook to your package.json, and please make sure you have installed commitment by `ice ci --commitilint` or manually.

*NOTES:* The version of husky is 4.3.6, and it maybe cause errors by upgrade to 5.0. If you want to use husky of higher version, maybe you can turn to official document for help.

#### 2. ice ci --commitizen

- First, it will checkout whether there is 'config' filed in your package.json.If so, it will skip too.
- If not, it will instlall `commitizen` and `cz-conventional-changelog` and writing config of `commitizen` to your package.json.
- Then you can run `git cz` for testing.

#### 3. ice ci --commitlint

- It will install packages directly, `@commitlint/config-conventional` and `@commitlint/cli`.
- And Then it will create '.commitlinttc.js' file on your word directory.

#### 4. ice ci --standard-version

- First, it will install packages, `standard-version`
- And add script 'release: yarn standard-version' to the field 'scripts' of your packages.json.
- If 'release' field has already been used, you can add manually.

#### NOTES：

Scripts of all may cause the fields of package.json sorting again. Because, it may convert json string into object, and then  it will parse object into json string.
