# ICE

## INTRODUCE

this is a package to help developers to run a react project
lint script, prettier, dev and build scripts are integrated

## script

### BEFORE SCRIPTS

you need to create a config file on root directory just like creating `webpack.config.js`
you can export a function or an object by using javascript(it does not support typescript up to now, but you can use typescript in your source code)
Give a simple example:
before creating a config file, you need to create a template html file

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

### ice dev

### ice build

### ice lint <directory> [options]
