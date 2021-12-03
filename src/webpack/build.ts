import webpack from 'webpack';
import chalk from 'chalk';
import getConfig, { EnumEnvironment } from './config/webpack.config';
const MODE = EnumEnvironment.PRODUCTION;
const config = getConfig(MODE);
config.mode = MODE;

const build = () => {
  const compilation = webpack(config as any);
  compilation.run((err: any, stats: any) => {
    if(err) throw err;

    const assets = Object.keys(stats.compilation.assets)
      .map((file: string) => {
        return {
          name: file,
          size: stats.compilation.assets[file]._size
        };
      });

    assets.forEach(item => {
      console.log(`${item.name}    ${chalk.yellow(item.size + ' Bytes')}`);
    });
    console.log('buidld successfully!!');
    console.log(chalk.yellow('building process costs ' + (stats.endTime - stats.startTime) + 'ms'));
  });
};

export default build;
