import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import getConfig, { EnumEnvironment } from './config/webpack.config';
const MODE = EnumEnvironment.DEVELOPMENT;

const dev = async () => {
  const config = await getConfig(MODE);
  config.mode = MODE;
  const compilation = webpack(config);
  const devServer = new WebpackDevServer(config.devServer, compilation);
  devServer.start();
};

export default dev;
