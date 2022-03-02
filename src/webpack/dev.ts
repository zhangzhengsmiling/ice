import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import chalk from 'chalk';

import getConfig, { EnumEnvironment } from './config/webpack.config';
const MODE = EnumEnvironment.DEVELOPMENT;

const dev = async () => {
  const config = await getConfig(MODE);
  config.mode = MODE;
  const compilation = webpack(config, (err) => {
    if (err) {
      console.log(chalk.red('---------编译失败--------'));
      console.log(chalk.red(err))
      console.log(chalk.red('------------------------'));
    }
  });
  const devServer = new WebpackDevServer(config.devServer, compilation);
  devServer.start();
};

export default dev;