import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from './config/webpack.config'
config.mode = 'development';


const dev = () => {
  const compilation = webpack(config as any)

  const devServer = new WebpackDevServer((config.devServer as any), (compilation as any));

  devServer.start()

  devServer.startCallback(() => {
    console.log('Successfully started server on http://localhost:8000');
  })
}

export default dev;
