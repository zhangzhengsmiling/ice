import path from 'path';
import { loader } from '../plugins/plugin-mini-css-extract';
import Rule from './Rule';
const cwd = process.cwd();

export const LOADER_LESS = Rule.of()
  .test(/(?<!\.module)\.less/)
  .include(path.resolve(cwd, 'src'))
  .use({ loader: 'less-loader' })
  .use({ loader: 'css-loader' })
  .use({ loader })
  .getOptions();

export const LOADER_LESS_MODULE = Rule.of()
  .test(/\.module\.less$/)
  .include(path.resolve(cwd, 'src'))
  .use({ loader: 'less-loader' })
  .use({
    loader: 'css-loader',
    options: {
      modules: true,
    },
  })
  .use({ loader })
  .getOptions();
