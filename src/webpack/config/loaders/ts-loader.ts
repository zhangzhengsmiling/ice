import path from 'path';
import Rule from './Rule';
const cwd = process.cwd();

export const LOADER_TS = Rule.of()
  .test(/\.(ts|tsx)$/)
  .include(path.resolve(cwd, 'src'))
  .use({ loader: 'cache-loader' })
  .use({
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    }
  })
  .getOptions();
