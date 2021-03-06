import webpack from 'webpack';
import chalk from 'chalk';
import getConfig, { EnumEnvironment } from './config/webpack.config';
const MODE = EnumEnvironment.PRODUCTION;

const build = async () => {
  const config = await getConfig(MODE);
  config.mode = MODE;
  const compilation = webpack(config as webpack.Configuration);
  compilation.run((err?: Error | null, stats?: webpack.Stats) => {
    if(err) throw err;
    if (!stats) return;
    if(stats.compilation.errors.length > 0)
      throw stats.compilation.errors[0];
    const assets = Object.keys(stats.compilation.assets)
      .map((file: string) => {
        return {
          name: file,
          size: stats.compilation.assets[file].size(),
        };
      });

    assets.forEach(item => {
      console.log(`${item.name}    ${chalk.yellow(item.size + ' Bytes')}`);
    });
    console.log('build successfully!!');
    console.log(chalk.yellow('building process costs ' + (stats.endTime - stats.startTime) + 'ms'));
  });
};

export default build;
