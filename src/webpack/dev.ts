import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import getConfig, { EnumEnvironment } from './config/webpack.config';
const MODE = EnumEnvironment.DEVELOPMENT;

const dev = async () => {
  const config = await getConfig(MODE);
  config.mode = MODE;
  const compiler = webpack(config);
  const devServer = new WebpackDevServer(config.devServer, compiler);
  devServer.start();
};

export default dev;