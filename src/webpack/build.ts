import webpack from 'webpack';
import chalk from 'chalk';
import config from './config/webpack.config'
config.mode = 'production';

const build = () => {
  const compilation = webpack(config as any);
  compilation.run((err: any, stats: any) => {
    if(err) throw err;


    const assets = Object.keys(stats.compilation.assets)
      .map((file: string) => {
        return {
          name: file,
          size: stats.compilation.assets[file]._size
        }
      })

    assets.forEach(item => {
      console.log(`${item.name}    ${chalk.yellow(item.size + 'Byte')}`);
    })
    console.log('buidld successfully!!')
    console.log(chalk.yellow('building process costs ' + (stats.endTime - stats.startTime) + 'ms'))
  });
}

export default build;
