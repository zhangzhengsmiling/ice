
import path from 'path';
import { loader } from '../plugins/plugin-mini-css-extract';
const cwd = process.cwd();
import Rule from './Rule';

export const LOADER_CSS_MODULE = Rule.of()
  .test(/\.module\.css$/)
  .include(path.resolve(cwd, 'src'))
  .use({
    loader: 'css-loader',
    options: {
      module: true,
    },
  })
  .use({ loader });

export const LOADER_CSS = Rule.of()
  .test(/(?<!\.module)\.css/)
  .include(path.resolve(cwd, 'src'))
  .use({ loader: 'css-loader' })
  .use({ loader });
