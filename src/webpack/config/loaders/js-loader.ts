import path from 'path';
import Rule from './Rule';
const cwd = process.cwd();

export const LOADER_JS = Rule.of()
  .test(/\.(js|jsx)$/)
  .include(path.resolve(cwd, 'src'))
  .use({
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }
  })
  .getOptions();
  