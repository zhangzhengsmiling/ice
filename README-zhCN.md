# ICE

<a href="https://www.npmjs.com/package/@ice-age/ice"><img alt="NPM Status" src="https://img.shields.io/npm/v/@ice-age/ice.svg?style=flat"></a>

[ENGLISH](./README.md) | 简体中文

## 简介

### 基本介绍

`ice`是对于webpack进行的一个二次封装，用于帮助开发者快速运行react项目。ice会暴露出`ice.config.js`文件，在里面可以暴露一个函数或者对象，对于预设的webpack配置进行覆盖。

`注意点`: 这个库很多地方都并不是特别完善，所以千万不要用于生产环境或者实际项目中。当然，如果您在使用的过程中存在一些BUG，也欢迎给我提issue或者建议，帮助我一点一点完善。

### 为什么我要写这个？

我在平常写demo的时候可能用不到create-react-app中的很多功能，所以需要配置自己的项目。很多时候就需要从创建`webpack.config.js`开始，这是一个不断重复的过程。所以，对于我来说，就想把webpack的一些配置封装起来，用于构建项目。另一方面就是加强自己对于webpack配置的一个理解吧。

## 如何启动项目

1. 你可以在全局或者项目目录中安装`ice`

   ```shell
   yarn global add @ice-age/ice
   or
   yarn add @ice-age/ice -D
   ```

2. 确保你的项目结构与下面目录结构一致

   ```shell
   $ tree .
   .
   ├── ice.config.js
   ├── package.json
   ├── public
   │   └── index.html
   ├── src
   │   └── index.tsx
   └── yarn.lock
   ```

   ，当然不一致的话，也可以重写`ice.config.js`文件去适配项目。(在当前版本下`ice.config.js`是必须的，不然会报错，这个BUG后面再做优化)。

3. 当你的目录结构ok以后，就可以尝试运行`yarn ice dev`或者`ice dev`，来启动项目。

4. 下面是一些文件示例：

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

下面是一些可运行的脚本

### ice init
初始化项目，下载模板工程，模板工程已经集成ice。详细可查看模板库：[https://github.com/zhangzhengsmiling/react-template](https://github.com/zhangzhengsmiling/react-template)
### ice dev

启动webpack dev server。类似于`webpack serve`, 内部用的是babel-loader编译ts代码，因此可能不会进行类型检查报错，你可以尝试通过`tsc --watch`进行类型检查。

### ice build

项目构建脚本

### ice lint <directory> [options]

与eslint类似，对于一些eslint的配置进行封装
你可以尝试运行`ice lint src --ext .tsx,.ts`进行lint校验
