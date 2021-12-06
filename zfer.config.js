const path = require('path');

const configuration = (webpackConfig) => {

  return {
    ...webpackConfig,
    entry: {
      app: path.resolve(process.cwd(), 'src/index.tsx'),
    }
  };
};

module.exports = configuration;
