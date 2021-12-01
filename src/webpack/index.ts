import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from './config/webpack.config'
config.mode = 'development';


const start = () => {
  const compilation = webpack(config as any)

  const devServer = new WebpackDevServer((config.devServer as any), (compilation as any));

  devServer.start()

  const timer = 5000
  devServer.startCallback(() => {
    console.log('Successfully started server on http://localhost:8000');
    console.log(`${timer}ms later, dev server will stop...`)
  })

  setTimeout(() => {
    devServer.stop();
  }, timer)

  devServer.stopCallback(() => {
    console.log('server stopped....')
  })
}

export default start;
