import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import getConfig, { EnumEnvironment } from './config/webpack.config';
// config.mode = 'development';
const MODE = EnumEnvironment.DEVELOPMENT;
const config = getConfig(MODE);
config.mode = MODE;

const dev = () => {
  const compilation = webpack(config as any);

  const devServer = new WebpackDevServer((config.devServer as any), (compilation as any));

  devServer.start();
};

export default dev;
